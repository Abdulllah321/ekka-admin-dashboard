import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Order, Product, Store } from "../utils/types";

interface StoreState {
  stores: Store[];
  storeDetails: Store | null;
  userStore: Store|null;
  products: Product[];
  orders: Order[];
  loading: boolean;
  error: string | null;
}

const initialState: StoreState = {
  stores: [],
  storeDetails: null,
  userStore: null,
  products: [],
  orders: [],
  loading: false,
  error: null,
};

// Async thunks
export const fetchAllStores = createAsyncThunk(
  "stores/fetchAll",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("/stores");
      return response.data.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch stores"
      );
    }
  }
);

export const fetchStoreById = createAsyncThunk(
  "stores/fetchById",
  async (id: string, thunkAPI) => {
    try {
      const response = await axios.get(`/stores/${id}`);
      return response.data.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch store"
      );
    }
  }
);

export const fetchUserStores = createAsyncThunk(
  "stores/fetchUserStores",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("/stores/user");
      return response.data.data[0];
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch user stores"
      );
    }
  }
);

export const createNewStore = createAsyncThunk(
  "stores/create",
  async (storeData: any, thunkAPI) => {
    try {
      const response = await axios.post("/stores", storeData);
      return response.data.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to create store"
      );
    }
  }
);

export const updateStore = createAsyncThunk(
  "stores/update",
  async ({ id, storeData }: { id: string; storeData: any }, thunkAPI) => {
    try {
      const response = await axios.put(`/stores/${id}`, storeData);
      return response.data.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to update store"
      );
    }
  }
);

export const deleteStore = createAsyncThunk(
  "stores/delete",
  async (id: string, thunkAPI) => {
    try {
      await axios.delete(`/stores/${id}`);
      return id;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to delete store"
      );
    }
  }
);

export const fetchStoreProducts = createAsyncThunk(
  "stores/fetchProducts",
  async (id: string, thunkAPI) => {
    try {
      const response = await axios.get(`/stores/${id}/products`);
      return response.data.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch store products"
      );
    }
  }
);

export const fetchStoreOrders = createAsyncThunk(
  "stores/fetchOrders",
  async (id: string, thunkAPI) => {
    try {
      const response = await axios.get(`/stores/${id}/orders`);
      return response.data.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch store orders"
      );
    }
  }
);

// Slice
const storeSlice = createSlice({
  name: "stores",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch all stores
      .addCase(fetchAllStores.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllStores.fulfilled, (state, action) => {
        state.loading = false;
        state.stores = action.payload;
      })
      .addCase(fetchAllStores.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Fetch store by ID
      .addCase(fetchStoreById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStoreById.fulfilled, (state, action) => {
        state.loading = false;
        state.storeDetails = action.payload;
      })
      .addCase(fetchStoreById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Fetch user stores
      .addCase(fetchUserStores.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserStores.fulfilled, (state, action) => {
        state.loading = false;
        state.userStore = action.payload;
      })
      .addCase(fetchUserStores.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Create a new store
      .addCase(createNewStore.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createNewStore.fulfilled, (state, action) => {
        state.loading = false;
        state.stores.push(action.payload);
      })
      .addCase(createNewStore.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Update store
      .addCase(updateStore.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateStore.fulfilled, (state, action) => {
        state.loading = false;
        state.stores = state.stores.map((store) =>
          store.id === action.payload.id ? action.payload : store
        );
      })
      .addCase(updateStore.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Delete store
      .addCase(deleteStore.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteStore.fulfilled, (state, action) => {
        state.loading = false;
        state.stores = state.stores.filter(
          (store) => store.id !== action.payload
        );
      })
      .addCase(deleteStore.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Fetch store products
      .addCase(fetchStoreProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStoreProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchStoreProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Fetch store orders
      .addCase(fetchStoreOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStoreOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchStoreOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default storeSlice.reducer;
