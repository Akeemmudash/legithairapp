import { View, Text } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import React from 'react'
import ROUTES from './routes';
import ProfileScreen from '../screens/authorized/Profile/ProfileScreen';
import MyOrders from '../screens/authorized/Profile/MyOrders';
import NotificationScreen from '../screens/authorized/Profile/NotificationScreen';
import SecurityScreen from '../screens/authorized/Profile/SecurityScreen';
import UpdateScreen from '../screens/authorized/Profile/UpdateScreen';
import UpdateProfileScreen from '../screens/authorized/Profile/UpdateProfileScreen';
import ShareScreen from '../screens/authorized/Profile/ShareScreen';
import SupportScreen from '../screens/authorized/Profile/SupportScreen';
import SignupScreen from '../screens/unauthorized/SignupScreen';
import OrderTracker from '../screens/authorized/Cart/OrderTracker';

const Stack = createNativeStackNavigator()

const ProfileNavigation = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false, gestureEnabled: false }} initialRouteName={ROUTES.WELCOMING}>
            <Stack.Screen name={ROUTES.PROFILE_SCREEN} component={ProfileScreen} />
            <Stack.Screen name={ROUTES.MY_ORDERS} component={MyOrders} />
            <Stack.Screen name={ROUTES.NOTIFICATION_SCREEN} component={NotificationScreen} />
            <Stack.Screen name={ROUTES.SECURITY_SCREEN} component={SecurityScreen} />
            <Stack.Screen name={ROUTES.UPDATE_SCREEN} component={UpdateScreen} />
            <Stack.Screen name={ROUTES.UNPADTE_PROFILE_SCREEN} component={UpdateProfileScreen} />
            <Stack.Screen name={ROUTES.SHARE_SCREEN} component={ShareScreen} />
            <Stack.Screen name={ROUTES.SUPPORT_SCREEN} component={SupportScreen} />
            <Stack.Screen name={ROUTES.TRACK_ORDER} component={OrderTracker} />
            <Stack.Screen name={ROUTES.SIGN_UP_SCREEN} component={SignupScreen} />
        </Stack.Navigator>
    )
}

export default ProfileNavigation