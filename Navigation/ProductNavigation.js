import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import ProductScreen from '../screens/authorized/Product/ProductScreen'
import ProductDetails from '../screens/authorized/Product/ProductDetails'
import PreviewOrderScreen from '../screens/authorized/Product/PreviewOrderScreen'
import CheckOutScreen from '../screens/authorized/Product/CheckOutScreen'
import ROUTES from './routes'
import ProfileScreen from '../screens/authorized/Profile/ProfileScreen'

const Stack = createNativeStackNavigator()

const ProductNavigation = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false, gestureEnabled: false }} initialRouteName={ROUTES.PRODUCT_SCREEN}>
            <Stack.Screen name={ROUTES.PRODUCT_SCREEN} component={ProductScreen} />
            <Stack.Screen name={ROUTES.PRODUCT_DETAILS} component={ProductDetails} />
        </Stack.Navigator>
    )
}

export default ProductNavigation