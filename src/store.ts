// src/store/store.ts
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import {
  mainCategoryReducer,
  subCategoryReducer,
} from "./slices/categorySlice";
import productReducer from "./slices/productSlice";
import bannersReducer from "./slices/bannerSlice";
import couponsReducer from "./slices/couponSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    categories: mainCategoryReducer,
    subCategories: subCategoryReducer,
    products: productReducer,
    banners: bannersReducer,
    coupons: couponsReducer,
  },
});

// Define RootState type based on the store's state
export type RootState = ReturnType<typeof store.getState>;

// Define AppDispatch type based on the store's dispatch function
export type AppDispatch = typeof store.dispatch;
