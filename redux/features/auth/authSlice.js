
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: null,
  phone: null,
  email: null,
  full_name: null,
  id: null,
};

export const authSlice = createSlice({
  name: 'userAuth',
  initialState,
  reducers: {
    updateUser: (state, { payload }) => {
      Object.assign(state, payload);
    },
    clearUser: state => {
      state.token = null;
      state.phone = null;
      state.email = null;
      state.full_name = null;
      state.id = null;
    },
  },
});

export const { clearUser, updateUser } = authSlice.actions;

export default authSlice.reducer;
