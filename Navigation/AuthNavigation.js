import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import ROUTES from './routes'
import WelcomeScreen from '../screens/unauthorized/WelcomeScreen'
import SignupScreen from '../screens/unauthorized/SignupScreen'
import LoginScreen from '../screens/unauthorized/LoginScreen'
import ResetPassword from '../screens/unauthorized/ResetPassword'
import Verification from '../screens/unauthorized/Verification'
import ForgotPasswordScreen from '../screens/unauthorized/ForgotPasswordScreen'
import MainTabNavigator from './MainTabNavigator'

const Stack = createNativeStackNavigator()

const AuthNavigation = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false, gestureEnabled: false }} initialRouteName={ROUTES.WELCOMING}>
            <Stack.Screen name={ROUTES.WELCOMING} component={WelcomeScreen} />
            <Stack.Screen name={ROUTES.SIGN_UP_SCREEN} component={SignupScreen} />
            <Stack.Screen name={ROUTES.LOGIN_SCREEN} component={LoginScreen} />
            <Stack.Screen name={ROUTES.RESET_PASSWORD} component={ResetPassword} />
            <Stack.Screen name={ROUTES.VERIFICATION} component={Verification} />
            <Stack.Screen name={ROUTES.FORGOT_PASSWORD} component={ForgotPasswordScreen} />
            <Stack.Screen name={ROUTES.MAIN} component={MainTabNavigator} />
        </Stack.Navigator>
    )
}

export default AuthNavigation