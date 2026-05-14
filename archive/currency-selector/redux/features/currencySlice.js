

import { createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
    rates: {},
    selectedCurrency: 'NGN',
    conversionRates: {},
};

const currencySlice = createSlice({
    name: 'currency',
    initialState,
    reducers: {
        setRates: (state, action) => {
            state.rates = action.payload;
        },
        setSelectedCurrency: (state, action) => {
            state.selectedCurrency = action.payload;
            AsyncStorage.setItem('selectedCurrency', action.payload);
        },
        setConversionRates: (state, action) => {
            state.conversionRates = action.payload;
        },
        loadSelectedCurrency: (state, action) => {
            state.selectedCurrency = action.payload;
        },
    },
});

export const { setRates, setSelectedCurrency, setConversionRates, loadSelectedCurrency } = currencySlice.actions;
export default currencySlice.reducer;
