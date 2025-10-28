
import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: [],
  reducers: {
    addItem: (state, action) => {
      const item = action.payload;
      const existingItem = state.find(cartItem => cartItem.id === item.id && cartItem.selectedSize === item.selectedSize);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.push({ ...item, quantity: 1 });
      }
    },
    removeItem: (state, action) => {
      const { id, selectedSize } = action.payload;
      return state.filter(cartItem => cartItem.id !== id || cartItem.selectedSize !== selectedSize);
    },
    clearCart: () => {
      return [];
    },
    incrementQuantity: (state, action) => {
      const { id, selectedSize } = action.payload;
      const existingItem = state.find(cartItem => cartItem.id === id && cartItem.selectedSize === selectedSize);
      if (existingItem) {
        existingItem.quantity += 1;
      }
    },
    decrementQuantity: (state, action) => {
      const { id, selectedSize } = action.payload;
      const existingItem = state.find(cartItem => cartItem.id === id && cartItem.selectedSize === selectedSize);
      if (existingItem && existingItem.quantity > 1) {
        existingItem.quantity -= 1;
      }
    },
  },
});

export const { addItem, removeItem, clearCart, incrementQuantity, decrementQuantity } = cartSlice.actions;

export default cartSlice.reducer;
