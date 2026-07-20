import ROUTES from "../Navigation/routes";

/**
 * Gate an action behind authentication. If a token is present the user is
 * logged in and `onAuthed` runs; otherwise they are routed to the login modal.
 *
 * @param {string|null} token - auth token from state.userAuth.token
 * @param {object} navigation - React Navigation navigation prop
 * @param {Function} onAuthed - action to run when authenticated
 */
export const requireAuth = (token, navigation, onAuthed) => {
  if (token) {
    onAuthed();
    return;
  }
  navigation.navigate(ROUTES.AUTH_STACK, { screen: ROUTES.LOGIN_SCREEN });
};
