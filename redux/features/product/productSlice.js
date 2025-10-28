// slices/savedProductsSlice.js
import { createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const savedProductsSlice = createSlice({
  name: 'savedProducts',
  initialState: [],
  reducers: {
    setSavedProducts: (state, action) => {
      return action.payload;
    },
    addProduct: (state, action) => {
        const productExists = state.some(p => p.id === action.payload.id);
        if (!productExists) {
          state.push(action.payload);
        }
      },
    removeProduct: (state, action) => {
      return state.filter(product => product.id !== action.payload.id);
    },
    clearSavedProducts: (state) => {
      return []; 
    },
  },
});

export const { setSavedProducts, addProduct, removeProduct, clearSavedProducts } = savedProductsSlice.actions;

export const loadSavedProducts = () => async dispatch => {
  try {
    const saved = await AsyncStorage.getItem('savedProducts');
    if (saved) {
      dispatch(setSavedProducts(JSON.parse(saved)));
    }
  } catch (error) {
    console.error('Error loading saved products:', error);
  }
};

export const saveProductToStorage = (products) => async () => {
  try {
    await AsyncStorage.setItem('savedProducts', JSON.stringify(products));
  } catch (error) {
    console.error('Error saving products to local storage:', error);
  }
};

export const clearProductsFromStorage = () => async dispatch => {
  try {
    await AsyncStorage.removeItem('savedProducts'); // Clear from AsyncStorage
    dispatch(clearSavedProducts()); // Clear from Redux
  } catch (error) {
    console.error('Error clearing saved products:', error);
  }
};

export default savedProductsSlice.reducer;
