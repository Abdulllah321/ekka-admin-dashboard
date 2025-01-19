import { createSlice,  createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Product } from "../utils/types";

// Enum for Discount Type
export enum DiscountType {
  Percentage = "percentage",
  FixedAmount = "fixedAmount",
}

// TypeScript Type for Coupon
export interface Coupon {
  id: string;
  code: string;
  description?: string;
  discountAmount: number;
  discountType: DiscountType;
  startDate: Date;
  endDate: Date;
  status: "active" | "inactive" | "expired";
  createdAt: Date;
  updatedAt: Date;

  // Relations
  products?: Product[];
}

interface CouponState {
  coupons: Coupon[];
  loading: boolean;
  error: string | null;
}

const initialState: CouponState = {
  coupons: [],
  loading: false,
  error: null,
};

// Fetch all coupons
export const fetchCoupons = createAsyncThunk<
  Coupon[],
  void,
  { rejectValue: string }
>("coupons/fetchCoupons", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get("/coupons");
    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to fetch coupons"
    );
  }
});

// Fetch a single coupon by ID
export const fetchCouponById = createAsyncThunk<
  Coupon,
  string,
  { rejectValue: string }
>("coupons/fetchCouponById", async (id, { rejectWithValue }) => {
  try {
    const response = await axios.get(`/coupons/${id}`);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to fetch the coupon"
    );
  }
});

// Create a new coupon
export const createCoupon = createAsyncThunk<
  Coupon,
  Coupon,
  { rejectValue: string }
>("coupons/createCoupon", async (coupon, { rejectWithValue }) => {
  try {
    const response = await axios.post("/coupons", coupon);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to create coupon"
    );
  }
});

// Update an existing coupon
export const updateCoupon = createAsyncThunk<
  Coupon,
  { id: string; data: Partial<Coupon> },
  { rejectValue: string }
>("coupons/updateCoupon", async ({ id, data }, { rejectWithValue }) => {
  try {
    const response = await axios.put(`/coupons/${id}`, data);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to update coupon"
    );
  }
});

// Delete a coupon
export const deleteCoupon = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("coupons/deleteCoupon", async (id, { rejectWithValue }) => {
  try {
    await axios.delete(`/coupons/${id}`);
    return id;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to delete coupon"
    );
  }
});

const couponSlice = createSlice({
  name: "coupons",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch all coupons
      .addCase(fetchCoupons.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCoupons.fulfilled, (state, action) => {
        state.coupons = action.payload;
        state.loading = false;
      })
      .addCase(fetchCoupons.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch coupons";
      })

      // Fetch coupon by ID
      .addCase(fetchCouponById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCouponById.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.coupons.findIndex(
          (coupon) => coupon.id === action.payload.id
        );
        if (index !== -1) {
          state.coupons[index] = action.payload;
        } else {
          state.coupons.push(action.payload);
        }
      })
      .addCase(fetchCouponById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch the coupon";
      })

      // Create coupon
      .addCase(createCoupon.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCoupon.fulfilled, (state, action) => {
        state.loading = false;
        state.coupons.push(action.payload);
      })
      .addCase(createCoupon.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to create coupon";
      })

      // Update coupon
      .addCase(updateCoupon.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCoupon.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.coupons.findIndex(
          (coupon) => coupon.id === action.payload.id
        );
        if (index !== -1) {
          state.coupons[index] = action.payload;
        }
      })
      .addCase(updateCoupon.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to update coupon";
      })

      // Delete coupon
      .addCase(deleteCoupon.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCoupon.fulfilled, (state, action) => {
        state.loading = false;
        state.coupons = state.coupons.filter(
          (coupon) => coupon.id !== action.payload
        );
      })
      .addCase(deleteCoupon.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to delete coupon";
      });
  },
});

export default couponSlice.reducer;
