import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createNavigationContainerRef } from '@react-navigation/native';
import AuthNavigation from './AuthNavigation';
import MainTabNavigator from './MainTabNavigator';
import ROUTES from './routes';

export const navigationRef = createNavigationContainerRef();

const Stack = createNativeStackNavigator();

const RootNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, gestureEnabled: false }}
      initialRouteName={ROUTES.MAIN}
    >
      <Stack.Screen name={ROUTES.MAIN} component={MainTabNavigator} />
      <Stack.Screen
        name={ROUTES.AUTH_STACK}
        component={AuthNavigation}
        options={{ presentation: 'modal', gestureEnabled: true }}
      />
    </Stack.Navigator>
  );
};

export default RootNavigation;
