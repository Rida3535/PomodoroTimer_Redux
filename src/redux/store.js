// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import timerReducer from './timerSlice';
import themeReducer from './themeSlice';

const store = configureStore({
  reducer: {
    timer: timerReducer,
    theme: themeReducer,
  },
});

export default store;
