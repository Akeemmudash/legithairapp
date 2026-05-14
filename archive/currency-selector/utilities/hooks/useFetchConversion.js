// src/hooks/useFetchConversion.js
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setConversionRates } from '../../redux/features/currencySlice';

const useFetchConversion = (amount) => {
  const dispatch = useDispatch();
  const selectedCurrency = useSelector((state) => state.currency.selectedCurrency);
  const baseCurrency = 'NGN'; // or your base currency
  const API_KEY = process.env.EXPO_PUBLIC_EXCHANGERATESAPI_ACCESS_KEY;

  useEffect(() => {
    const fetchConversion = async () => {
      try {
        const response = await axios.get('https://api.exchangeratesapi.io/v1/convert', {
          params: {
            access_key: API_KEY,
            from: baseCurrency,
            to: selectedCurrency,
            amount,
          },
        });
        const conversionRates = response.data;
        dispatch(setConversionRates(conversionRates));
      } catch (error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // // that falls out of the range of 2xx
          // console.error('Error data:', error.response.data);
          // console.error('Error status:', error.response.status);
          // console.error('Error headers:', error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // console.error('Error request:', error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          // console.error('Error message:', error.message);
        }
      }      
    };

    if (amount && selectedCurrency) {
      fetchConversion();
    }
  }, [dispatch, amount, selectedCurrency]);
};

export default useFetchConversion;
