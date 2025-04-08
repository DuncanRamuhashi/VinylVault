import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import { apiSlice } from './slices/apiSlice';
const store = configureStore({
  reducer: {
    auth: authReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  }, // Add your reducers here
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware), 
  devTools: true, // Make sure devTools are enabled for development
});

export default store;
