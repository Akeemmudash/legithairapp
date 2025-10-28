import { View, Text } from 'react-native'
import React from 'react'
import HomeScreen from '../screens/authorized/Home/HomeScreen'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import ROUTES from './routes'
import ProductDetails from '../screens/authorized/Product/ProductDetails'
import ProductScreen from '../screens/authorized/Product/ProductScreen'
import ProfileScreen from '../screens/authorized/Profile/ProfileScreen'


const Stack = createNativeStackNavigator()

const HomeNavigation = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false, gestureEnabled: false }} initialRouteName={ROUTES.HOME_SCREEN}>
            <Stack.Screen name={ROUTES.HOME_SCREEN} component={HomeScreen} />
            {/* <Stack.Screen name={ROUTES.PRODUCT_SCREEN} component={ProductScreen} /> */}
            <Stack.Screen name={ROUTES.PRODUCT_DETAILS} component={ProductDetails} />
            {/* <Stack.Screen name={ROUTES.PRODUCT_SCREEN} component={ProfileScreen} /> */}
        </Stack.Navigator>
    )
}

export default HomeNavigation