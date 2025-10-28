

import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import { NavigationContainer } from '@react-navigation/native';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { persistor, store } from './redux/store';
import MainTabNavigator from './Navigation/MainTabNavigator';
import AuthNavigation from './Navigation/AuthNavigation';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useCachedResources from './utilities/useCachedResources';
import { updateUser } from './redux/features/auth/authSlice';
import { PersistGate } from 'redux-persist/integration/react';
import useFetchConversionRates from './utilities/hooks/useFetchConversionRates';

SplashScreen.preventAutoHideAsync();

const AppContent = () => {
  const dispatch = useDispatch();
  const [initialRoute, setInitialRoute] = useState(null);

  const { token } = useSelector((state) => state.userAuth);
  const isLoadingComplete = useCachedResources();
  useFetchConversionRates();

  useEffect(() => {
    const checkToken = async () => {
      try {
        const tokenFromStorage = await AsyncStorage.getItem('token');
        if (tokenFromStorage) {
          dispatch(updateUser({ token: tokenFromStorage }));
          // setInitialRoute('Main');
        } else {
          // setInitialRoute('Auth');
        }
      } catch (error) {
        console.error("Error fetching token from AsyncStorage", error);
        setInitialRoute('Auth');
      } finally {
        // setIsLoading(false);
      }
    };

    checkToken();
  }, [dispatch]);

  useEffect(() => {
    if (isLoadingComplete) {
      SplashScreen.hideAsync();
    }
  }, [isLoadingComplete]);

  if (!isLoadingComplete) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {token ? <MainTabNavigator /> : <AuthNavigation />}
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppContent />
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

