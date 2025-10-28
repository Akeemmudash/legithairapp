import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import SignupScreen from '../screens/unauthorized/SignupScreen';
import WelcomeScreen from '../screens/unauthorized/WelcomeScreen';
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
import UpdateProfileScreen from '../screens/authorized/Profile/UpdateProfileScreen';
import SupportScreen from '../screens/authorized/Profile/SupportScreen';
import MainTabNavigator from './MainTabNavigator';
import ROUTES from './routes';
import AuthNavigation from './AuthNavigation';

const {Navigator} = createNativeStackNavigator();

const AppNavigator = () => {
    const token = useSelector(state => state.userAuth.token);
    console.log(token)

    return (
      <Navigator>
           {token ? <MainTabNavigator /> : <AuthNavigation />}
      </Navigator>
    );
};

export default AppNavigator;
