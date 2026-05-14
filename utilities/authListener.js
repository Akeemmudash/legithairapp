import { store } from '../redux/store';
import { navigationRef } from '../Navigation/RootNavigation';
import { consumePendingAction } from './hooks/useRequireAuth';

let previousToken = null;

export const startAuthListener = () => {
  previousToken = store.getState().userAuth?.token ?? null;

  return store.subscribe(() => {
    const nextToken = store.getState().userAuth?.token ?? null;

    if (!previousToken && nextToken) {
      if (navigationRef.isReady() && navigationRef.canGoBack()) {
        navigationRef.goBack();
      }
      const action = consumePendingAction();
      if (action) {
        setTimeout(() => action(), 0);
      }
    }

    previousToken = nextToken;
  });
};
