import { View, Text } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import React, { useEffect, useState } from 'react'
import SignupScreen from '../screens/unauthorized/SignupScreen';
import WelcomeScreen from '../screens/unauthorized/WelcomeScreen';
import ROUTES from './routes';
import LoginScreen from '../screens/unauthorized/LoginScreen';
import ResetPassword from '../screens/unauthorized/ResetPassword';
import Verification from '../screens/unauthorized/Verification';
import ForgotPasswordScreen from '../screens/unauthorized/ForgotPasswordScreen';
import ProfileScreen from '../screens/authorized/Profile/ProfileScreen';
import NotificationScreen from '../screens/authorized/Profile/NotificationScreen';
import SecurityScreen from '../screens/authorized/Profile/SecurityScreen';
import UpdateScreen from '../screens/authorized/Profile/UpdateScreen';
import MyOrders from '../screens/authorized/Profile/MyOrders';
import HomeScreen from '../screens/authorized/Home/HomeScreen';
import ProductScreen from '../screens/authorized/Product/ProductScreen';
import ProductDetails from '../screens/authorized/Product/ProductDetails';
import PreviewOrderScreen from '../screens/authorized/Product/PreviewOrderScreen';
import CheckOutScreen from '../screens/authorized/Product/CheckOutScreen';
import WishListScreen from '../screens/authorized/WishList/WishListScreen';
import NotificationMainScreen from '../screens/authorized/Notification/NotificationScreen';
import OrderTracker from '../screens/authorized/Cart/OrderTracker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MainTabNavigator from './MainTabNavigator';
import UpdateProfileScreen from '../screens/authorized/Profile/UpdateProfileScreen';
import SupportScreen from '../screens/authorized/Profile/SupportScreen';

const Stack = createNativeStackNavigator()

const UnauthorizedNavigation = () => {



    return (
        <Stack.Navigator screenOptions={{ headerShown: false, gestureEnabled: false }} initialRouteName={ROUTES.WELCOMING}>
            <Stack.Screen name={ROUTES.WELCOMING} component={WelcomeScreen} />
            <Stack.Screen name={ROUTES.MAIN} component={MainTabNavigator} />
            <Stack.Screen name={ROUTES.SIGN_UP_SCREEN} component={SignupScreen} />
            <Stack.Screen name={ROUTES.LOGIN_SCREEN} component={LoginScreen} />
            <Stack.Screen name={ROUTES.RESET_PASSWORD} component={ResetPassword} />
            <Stack.Screen name={ROUTES.VERIFICATION} component={Verification} />
            <Stack.Screen name={ROUTES.FORGOT_PASSWORD} component={ForgotPasswordScreen} />
            <Stack.Screen name={ROUTES.PROFILE_SCREEN} component={ProfileScreen} />
            <Stack.Screen name={ROUTES.NOTIFICATION_SCREEN} component={NotificationScreen} />
            <Stack.Screen name={ROUTES.SECURITY_SCREEN} component={SecurityScreen} />
            <Stack.Screen name={ROUTES.MY_ORDERS} component={MyOrders} />
            <Stack.Screen name={ROUTES.UPDATE_SCREEN} component={UpdateScreen} />
            <Stack.Screen name={ROUTES.HOME_SCREEN} component={HomeScreen} />
            <Stack.Screen name={ROUTES.PRODUCT_SCREEN} component={ProductScreen} />
            <Stack.Screen name={ROUTES.PRODUCT_DETAILS} component={ProductDetails} />
            <Stack.Screen name={ROUTES.PREVIEW_ORDER_SCREEN} component={PreviewOrderScreen} />
            <Stack.Screen name={ROUTES.CHECK_OUT_SCREEN} component={CheckOutScreen} />
            <Stack.Screen name={ROUTES.WISH_LIST_SCREEN} component={WishListScreen} />
            <Stack.Screen name={ROUTES.NOTIFICATION_MAIN_SCREEN} component={NotificationMainScreen} />
            <Stack.Screen name={ROUTES.TRACK_ORDER} component={OrderTracker} />
            <Stack.Screen name={ROUTES.UNPADTE_PROFILE_SCREEN} component={UpdateProfileScreen} />
            <Stack.Screen name={ROUTES.SUPPORT_SCREEN} component={SupportScreen} />

        </Stack.Navigator>
    )
}

// WISH_LIST_SCREEN: "WishListScreen",
//     NOTIFICATION_MAIN_SCREEN: "NotificationMainScreen"

export default UnauthorizedNavigation