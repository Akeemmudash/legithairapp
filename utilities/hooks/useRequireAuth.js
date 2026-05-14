import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { navigationRef } from '../../Navigation/RootNavigation';
import ROUTES from '../../Navigation/routes';

let pendingAction = null;

export const consumePendingAction = () => {
  const action = pendingAction;
  pendingAction = null;
  return action;
};

export const clearPendingAction = () => {
  pendingAction = null;
};

const useRequireAuth = () => {
  const token = useSelector((state) => state.userAuth.token);

  return useCallback(
    (action, options = {}) => {
      if (token) {
        action?.();
        return;
      }
      pendingAction = action ?? null;
      if (navigationRef.isReady()) {
        const screen = options?.screen ?? ROUTES.LOGIN_SCREEN;
        navigationRef.navigate(ROUTES.AUTH_STACK, { screen });
      }
    },
    [token]
  );
};

export default useRequireAuth;
