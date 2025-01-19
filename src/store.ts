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
import orderReducer from "./slices/orderSlice";
import reviewReducer from "./slices/reviewSlice";
import storeReducer from "./slices/storeSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    categories: mainCategoryReducer,
    subCategories: subCategoryReducer,
    products: productReducer,
    banners: bannersReducer,
    coupons: couponsReducer,
    orders: orderReducer,
    reviews: reviewReducer,
    store: storeReducer,
  },
});

// Define RootState type based on the store's state
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Custom hooks for useSelector and useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch: () => AppDispatch = useDispatch;