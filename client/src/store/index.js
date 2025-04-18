import { configureStore } from "@reduxjs/toolkit";
import userSlice from './slices/userSlice';
import categoryReducer from './slices/categorySlice';

export const store = configureStore({
    reducer: {
        user: userSlice,
        categories: categoryReducer
    }
})