
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, Keyboard } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSelector } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors } from '../utilities/colors';
import HomeNavigation from './HomeNavigation';
import ProductNavigation from './ProductNavigation';
import CartNavigation from './CartNavigation';
import WishListNavigation from './WishListNavigation';
import ProfileNavigation from './ProfileNavigation';

const MainTabNavigator = () => {
  const Tab = createBottomTabNavigator();
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  // Get the total number of items in the cart from the Redux store
  const cartItemCount = useSelector((state) =>
    state.cart.reduce((total, item) => total + item.quantity, 0)
  );

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => setKeyboardVisible(true)
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => setKeyboardVisible(false)
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let badgeCount = 0;

            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Product') {
              iconName = focused ? 'grid' : 'grid-outline';
            } else if (route.name === 'Cart') {
              iconName = focused ? 'cart' : 'cart-outline';
              badgeCount = cartItemCount; 
            } else if (route.name === 'Wishlist') {
              iconName = focused ? 'heart' : 'heart-outline';
            } else if (route.name === 'Profile') {
              iconName = focused ? 'person' : 'person-outline';
            }

            return (
              <View>
                <Ionicons name={iconName} size={size} color={color} />
                {badgeCount > 0 && (
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>{badgeCount}</Text>
                  </View>
                )}
              </View>
            );
          },
          tabBarActiveTintColor: Colors.Orange,
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: [styles.tabBar, { display: isKeyboardVisible ? 'none' : 'flex' }],
          tabBarLabelStyle: {
            fontFamily: 'Poppins',
            fontSize: 12,
          },
        })}
      >
        <Tab.Screen name="Home" component={ProductNavigation} options={{ headerShown: false }} />
        <Tab.Screen name="Cart" component={CartNavigation} options={{ headerShown: false }} />
        <Tab.Screen name="Wishlist" component={WishListNavigation} options={{ headerShown: false }} />
        <Tab.Screen name="Profile" component={ProfileNavigation} options={{ headerShown: false }} />
      </Tab.Navigator>
    </KeyboardAvoidingView>
  );
};

export default MainTabNavigator;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  // tabBar: {
  //   position: 'absolute',
  //   bottom: 10,
  //   left: 10,
  //   right: 10,
  //   elevation: 5,
  //   backgroundColor: 'white',
  //   borderRadius: 50,
  //   height: 80,
  //   shadowColor: '#000',
  //   shadowOpacity: 0.1,
  //   shadowOffset: { width: 0, height: 2 },
  //   shadowRadius: 4,
  // },
  tabBar: {
  position: 'absolute',
  bottom: 10,
  left: 10,
  right: 10,
  elevation: 5,
  backgroundColor: 'white',
  borderRadius: 40,
  height: 55, 
  paddingBottom: 4, 
  paddingTop: 4,
  shadowColor: '#000',
  shadowOpacity: 0.1,
  shadowOffset: { width: 0, height: 2 },
  shadowRadius: 4,
},

  badge: {
    position: 'absolute',
    right: -10,
    top: -2,
    backgroundColor: Colors.Orange,
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
    fontFamily: "Poppins"
  },
});





