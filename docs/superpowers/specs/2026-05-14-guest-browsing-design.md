# Guest Browsing — Apple Guideline 5.1.1(v) Compliance

**Status:** Design approved, awaiting implementation plan
**Date:** 2026-05-14
**Driver:** Apple App Store rejection citing Guideline 5.1.1(v) — non-account-based features (product browsing) must not require registration.

## Goal

Let unauthenticated users open the app, browse the full product catalog, view product details, and use search/filter — without ever seeing a login wall first. Only true account-based features (cart, checkout, wishlist, profile, orders, notifications) require sign-in, and only at the moment the user tries to use them.

## Non-Goals

- Local-only guest cart/wishlist persistence (deferred — strict gating chosen).
- Onboarding redesign. `WelcomeScreen` stays as-is, just relocated.
- Backend changes. No new endpoints required for this work.

## Current State

`Navigation/RootNavigation.js` gates the entire app on `token`:

- `token` truthy → `MainTabNavigator` (Home, Cart, Wishlist, Profile).
- `token` falsy → `AuthNavigation` (Welcome → Login/Signup/etc.).

A guest cannot reach `HomeScreen`, `ProductDetails`, or any product surface. This is the violation.

`Navigation/UnauthorizedNavigation.js` exists but is unused dead code.

## Design

### 1. Root navigator restructure

Replace the conditional in [Navigation/RootNavigation.js](../../../Navigation/RootNavigation.js) with a single stack that always mounts `MainTabNavigator` and exposes `AuthStack` as a modal-presented sibling.

```
RootStack (Native Stack)
├── MAIN          → MainTabNavigator      (initial, always rendered)
└── AUTH_STACK    → AuthNavigation        (presentation: "modal", on-demand)
```

`AuthNavigation` is reused unchanged. Its `initialRouteName` stays `WELCOMING`, so opening the auth modal lands on `WelcomeScreen` — preserving existing branded UI and its Login/Signup buttons.

Authenticated users see no difference: `MainTabNavigator` is the same component they already use. The token check moves from "what navigator to render" to "what content inside the navigator to render."

### 2. Auth gate primitive

New file: `utilities/hooks/useRequireAuth.js`

```js
const requireAuth = useRequireAuth();

// In a handler:
const onAddToCart = () => requireAuth(() => dispatch(addToCart(product)));
```

Behavior:

- If `state.userAuth.token` is present → run the callback immediately.
- Otherwise → store the callback in a `pendingAction` ref-map (see §4) and navigate to `AUTH_STACK`.

### 3. AuthGate for tab screens

New component: `components/AuthGate.js`

```jsx
<AuthGate feature="cart">
  <CartScreen />
</AuthGate>
```

Renders the wrapped children when `token` is present. For guests, renders a centered empty-state ("Sign in to use your cart") with **Log in** and **Create account** buttons that open `AUTH_STACK`. Tabs remain visible — Apple permits this; the gate appears only after a guest enters a gated tab.

Applied to:

- Cart tab — wrap `CartScreen`.
- Wishlist tab — wrap `WishListScreen`.
- Profile tab — wrap the root `ProfileScreen` (and child screens inherit because they're only reachable from there).
- Notifications — wrap `NotificationMainScreen`.

### 4. Pending-action handoff (resume after login)

When a guest hits a gated action, the intended callback must run after they finish signing in.

Implementation: a **module-level ref store** in `utilities/hooks/useRequireAuth.js` keyed by a single slot (`pendingActionRef.current`). Avoids Redux serialization issues with function values.

```
useRequireAuth → opens AUTH_STACK + sets pendingActionRef
authSlice updateUser fulfilled → middleware/listener fires the ref + clears it
```

Cancelling the auth modal (back gesture / dismiss) clears `pendingActionRef`.

Trigger point for "auth success": subscribe in a small listener (`utilities/authListener.js`) that watches `state.userAuth.token` transitioning from null → present, and:

1. Closes the auth modal (`navigation.goBack()` on the root via existing `RootNavigation` ref).
2. Invokes and clears `pendingActionRef`.

`RootNavigation` ref is already needed for deep linking; reuse [Navigation/linking.js](../../../Navigation/linking.js) wiring or add a small `navigationRef` export from `App.js`.

### 5. Inline action gating

Action handlers on guest-accessible screens that perform account-based mutations call `requireAuth(...)`:

| Screen | Action | Gated |
|---|---|---|
| `ProductDetails` | Add to cart | yes |
| `ProductDetails` | Save to wishlist | yes |
| `ProductDetails` | Buy now / Checkout | yes |
| `HomeScreen` | Quick-add from `ProductCard` (if present) | yes |
| `OrderTracker` | Entry | gated via AuthGate at navigation time |

### 6. Header / nav entry from product screens

`HomeScreen` and `ProductDetails` header icons (cart badge, wishlist heart, profile) for guests should still be tappable — tapping them switches to the relevant tab, where `AuthGate` shows the sign-in empty state. No special handling needed.

### 7. Cleanup

- Delete `Navigation/UnauthorizedNavigation.js` (dead code).
- `Navigation/AppNavigator.js` is also broken dead code per prior notes — delete if confirmed unused.
- Token-presence check stays in `App.js` `useEffect` for rehydration from `AsyncStorage` — unchanged.

## Affected files

**Modified**
- `Navigation/RootNavigation.js` — remove conditional, add modal AuthStack screen.
- `Navigation/routes.js` — no change (routes already exist).
- `screens/authorized/Cart/CartScreen.js` — wrap with `<AuthGate>`.
- `screens/authorized/WishList/WishListScreen.js` — wrap with `<AuthGate>`.
- `screens/authorized/Profile/ProfileScreen.js` — wrap with `<AuthGate>`.
- `screens/authorized/Notification/NotificationScreen.js` — wrap with `<AuthGate>`.
- `screens/authorized/Product/ProductDetails.js` — `requireAuth` around add-to-cart, wishlist, checkout handlers.
- `components/ProductCard.js` — `requireAuth` around any quick-add handler if one exists.
- `App.js` — mount auth listener; possibly export `navigationRef`.

**New**
- `utilities/hooks/useRequireAuth.js`
- `utilities/authListener.js` (token-transition watcher)
- `components/AuthGate.js`

The auth prompt UI itself is `WelcomeScreen` inside the modal-presented `AuthStack` — no separate inline modal component is introduced.

**Deleted**
- `Navigation/UnauthorizedNavigation.js`
- `Navigation/AppNavigator.js` (pending confirmation it has no remaining references)

## Edge cases

- **App launched with stored token:** `App.js` rehydrates token before `RootNavigation` mounts content; users start signed-in. No flicker because `AuthGate` reads the same `userAuth.token`.
- **Token expires mid-session:** server 401 path should dispatch `logout`; tab screens will re-render via `AuthGate` and show sign-in empty state on next focus. (Out of scope for this spec but the design supports it.)
- **User cancels auth flow:** `pendingActionRef` is cleared on AuthStack dismiss. No stale callback fires later.
- **Deep links to ProductDetails:** already supported; works for guests because navigation is no longer auth-gated.
- **Deep links to gated screens (e.g., CartScreen):** navigation succeeds; `AuthGate` renders sign-in state.

## Testing

- Cold-launch as guest → land in `HomeScreen` directly, no auth screen.
- Guest taps Add to cart → AuthStack opens → log in → item added, modal closes.
- Guest taps Cart tab → see "Sign in to use your cart" with working buttons.
- Guest cancels auth modal → returned to prior screen, no pending side effects.
- Signed-in user sees no behavioral change anywhere.
- Verify with Expo Go on iOS and Android, plus EAS build target.

## Apple compliance check

- ✅ Browsing products requires no account.
- ✅ Search/filter requires no account.
- ✅ Cart/checkout/wishlist/profile remain account-gated (legitimate per 5.1.1).
- ✅ No forced sign-in wall on launch.
