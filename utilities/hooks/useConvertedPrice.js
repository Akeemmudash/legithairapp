
// import { useSelector } from 'react-redux';

// const useConvertedPrice = (priceInBaseCurrency) => {
//   const { selectedCurrency, rates } = useSelector((state) => state.currency);
//   const exchangeRate = rates[selectedCurrency] || 1; 
//   return (priceInBaseCurrency * exchangeRate).toFixed(2);
// };

// export default useConvertedPrice;


import React from 'react';
import { useSelector } from 'react-redux';

const useConvertedPrice = (price) => {
    const { rates, selectedCurrency } = useSelector((state) => state.currency);

    const conversionRate = rates[selectedCurrency] || 1;
    const convertedPrice = (price * conversionRate).toFixed(2);
    const currencySymbol = selectedCurrency === 'USD' ? '$' : selectedCurrency;

    return `${currencySymbol}${convertedPrice}`;
};

export default useConvertedPrice;
