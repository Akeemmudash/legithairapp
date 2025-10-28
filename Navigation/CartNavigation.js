
import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import ROUTES from './routes'
import CartScreen from '../screens/authorized/Cart/CartScreen'
import CheckOutScreen from '../screens/authorized/Product/CheckOutScreen'
import PreviewOrderScreen from '../screens/authorized/Product/PreviewOrderScreen'
import OrderTracker from '../screens/authorized/Cart/OrderTracker'


const Stack = createNativeStackNavigator()

const CartNavigation = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false, gestureEnabled: false }} initialRouteName={ROUTES.CART_SCREEN}>
            <Stack.Screen name={ROUTES.CART_SCREEN} component={CartScreen} />
            <Stack.Screen name={ROUTES.PREVIEW_ORDER_SCREEN} component={PreviewOrderScreen} />
            <Stack.Screen name={ROUTES.CHECK_OUT_SCREEN} component={CheckOutScreen} />
            <Stack.Screen name={ROUTES.TRACK_ORDER} component={OrderTracker} />
        </Stack.Navigator>
    )
}

export default CartNavigation