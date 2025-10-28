// 

import { View, Text } from 'react-native'
import React from 'react'
import HomeScreen from '../screens/authorized/Home/HomeScreen'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import ROUTES from './routes'
import WishListScreen from '../screens/authorized/WishList/WishListScreen'
import ProductDetails from '../screens/authorized/Product/ProductDetails'


const Stack = createNativeStackNavigator()

const WishListNavigation = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false, gestureEnabled: false }} initialRouteName={ROUTES.WISH_LIST_SCREEN}>
            <Stack.Screen name={ROUTES.WISH_LIST_SCREEN} component={WishListScreen} />
            <Stack.Screen name={ROUTES.PRODUCT_DETAILS} component={ProductDetails} />
        </Stack.Navigator>
    )
}

export default WishListNavigation