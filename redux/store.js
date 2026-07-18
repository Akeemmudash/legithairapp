// import { configureStore } from "@reduxjs/toolkit";
// import { authApi } from "./features/auth/authApi";
// import authReducer from '../redux/features/auth/authSlice';
// import { productApi } from "./features/product/productApi";
// import  savedProductsReducer  from "./features/product/productSlice";
// import { profileApi } from "./features/profile/profileApi";
// import { orderApi } from "./features/order/orderApi";
// import { setupListeners } from "@reduxjs/toolkit/query";
// import cartReducer from "../redux/features/cart/cartSlice";

// export const store = configureStore({
//     reducer: {
//         userAuth: authReducer,
//         cart: cartReducer,
//         savedProducts: savedProductsReducer,
//         [authApi.reducerPath]: authApi.reducer,
//         [productApi.reducerPath]: productApi.reducer,
//         [profileApi.reducerPath]: profileApi.reducer,
//         [orderApi.reducerPath]: orderApi.reducer,
//     },
//     middleware: getDefaultMiddleware =>
//     getDefaultMiddleware({
//         immutableCheck: false,
//         serializableCheck: false,
//     }).concat(
//         authApi.middleware,
//         productApi.middleware,
//         profileApi.middleware,
//         orderApi.middleware,
//     ),
// })


// setupListeners(store.dispatch);



import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import authReducer from "./features/auth/authSlice";
import savedProductsReducer from "./features/product/productSlice";
import cartReducer from "./features/cart/cartSlice";
import { authApi } from "./features/auth/authApi";
import { productApi } from "./features/product/productApi";
import { profileApi } from "./features/profile/profileApi";
import { orderApi } from "./features/order/orderApi";
import { setupListeners } from "@reduxjs/toolkit/query";
import languageReducer from "./features/languageSlice";


const rootReducer = combineReducers({
  userAuth: authReducer,
  cart: cartReducer,
  savedProducts: savedProductsReducer,
  language: languageReducer,
  [authApi.reducerPath]: authApi.reducer,
  [productApi.reducerPath]: productApi.reducer,
  [profileApi.reducerPath]: profileApi.reducer,
  [orderApi.reducerPath]: orderApi.reducer,
});

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["userAuth", "cart", "savedProducts"], 
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }).concat(
      authApi.middleware,
      productApi.middleware,
      profileApi.middleware,
      orderApi.middleware
    ),
});

export const persistor = persistStore(store);

setupListeners(store.dispatch);
