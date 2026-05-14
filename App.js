
import React, { useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { NavigationContainer } from '@react-navigation/native';
import { Provider, useDispatch } from 'react-redux';
import { persistor, store } from './redux/store';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useCachedResources from './utilities/useCachedResources';
import { updateUser } from './redux/features/auth/authSlice';
import { PersistGate } from 'redux-persist/integration/react';
import RootNavigation, { navigationRef } from './Navigation/RootNavigation';
import linking from './Navigation/linking';
import { startAuthListener } from './utilities/authListener';

SplashScreen.preventAutoHideAsync();

const AppContent = () => {
  const dispatch = useDispatch();
  const isLoadingComplete = useCachedResources();

  useEffect(() => {
    const checkToken = async () => {
      try {
        const tokenFromStorage = await AsyncStorage.getItem('token');
        if (tokenFromStorage) {
          dispatch(updateUser({ token: tokenFromStorage }));
        }
      } catch (error) {
        console.error("Error fetching token from AsyncStorage", error);
      }
    };

    checkToken();
  }, [dispatch]);

  useEffect(() => {
    const unsubscribe = startAuthListener();
    return unsubscribe;
  }, []);

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
    <NavigationContainer ref={navigationRef} linking={linking}>
      <RootNavigation />
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
