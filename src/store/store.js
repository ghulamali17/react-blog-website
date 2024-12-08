// store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice'; // Import the authReducer from authSlice.js

const store = configureStore({
  reducer: {
    auth: authReducer, // Add authReducer here
  },
});

export default store;
