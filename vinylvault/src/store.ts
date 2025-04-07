import { configureStore } from '@reduxjs/toolkit';
import { devtools } from 'globals'; // Ensure this import is correct

const store = configureStore({
  reducer: {}, // Add your reducers here
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(), 
  devTools: true, // Make sure devTools are enabled for development
});

export default store;
