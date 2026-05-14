import * as Linking from 'expo-linking';
import ROUTES from './routes';

const linking = {
  prefixes: [Linking.createURL('/'), 'legithairng://'],
  config: {
    screens: {
      [ROUTES.AUTH_STACK]: {
        screens: {
          [ROUTES.WELCOMING]: 'welcome',
          [ROUTES.LOGIN_SCREEN]: 'login',
          [ROUTES.SIGN_UP_SCREEN]: 'signup',
          [ROUTES.RESET_PASSWORD]: 'reset-password',
          [ROUTES.VERIFICATION]: 'verification',
          [ROUTES.FORGOT_PASSWORD]: 'forgot-password',
        },
      },
      [ROUTES.MAIN]: {
        screens: {
          Home: {
            screens: {
              [ROUTES.PRODUCT_SCREEN]: 'products',
              [ROUTES.PRODUCT_DETAILS]: {
                path: 'products/:productId',
                parse: {
                  productId: (value) => value,
                },
              },
            },
          },
          Cart: {
            screens: {
              [ROUTES.CART_SCREEN]: 'cart',
            },
          },
          Wishlist: {
            screens: {
              [ROUTES.WISH_LIST_SCREEN]: 'wishlist',
            },
          },
          Profile: {
            screens: {
              [ROUTES.PROFILE_SCREEN]: 'profile',
              [ROUTES.MY_ORDERS]: 'profile/orders',
              [ROUTES.SECURITY_SCREEN]: 'profile/security',
              [ROUTES.UPDATE_SCREEN]: 'profile/update-password',
              [ROUTES.UNPADTE_PROFILE_SCREEN]: 'profile/edit',
              [ROUTES.SHARE_SCREEN]: 'profile/invite',
              [ROUTES.SUPPORT_SCREEN]: 'profile/support',
            },
          },
        },
      },
    },
  },
};

export default linking;
