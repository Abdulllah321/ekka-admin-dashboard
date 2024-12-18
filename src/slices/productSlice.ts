import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

// Define Product Type
export interface Product {
  id?: string;
  name: string;
  description: string;
  shortDesc?: string;
  price: number;
  discountPrice?: number;
  stockQuantity: number;
  sizes: string[];
  colors: string[];
  imageUrls: string[];
  status: string;
  createdAt?: string;
  updatedAt?: string;
  stockStatus?: "inStock" | "outOfStock" | "limitedStock";
  mainCategoryId: string;
  subCategoryId: string;
  thumbnail: string;
  slug: string;
  weight?: string;
  dimensions?: string;
  productTags?: string[];
}

// Define Slice State
interface ProductState {
  products: Product[];
  productDetails: Product | null;
  loading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  products: [],
  productDetails: null,
  loading: false,
  error: null,
};

// Async Thunks for CRUD Operations

// Fetch All Products
export const fetchProducts = createAsyncThunk<
  Product[],
  void,
  { rejectValue: string }
>("products/fetchProducts", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get("/products");
    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to fetch products"
    );
  }
});

// Fetch Product by ID
export const fetchProductById = createAsyncThunk<
  Product,
  string,
  { rejectValue: string }
>("products/fetchProductById", async (productId, { rejectWithValue }) => {
  try {
    const response = await axios.get(`/products/${productId}`);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to fetch product details"
    );
  }
});

// Create a New Product
export const createProduct = createAsyncThunk<
  Product,
  Product,
  { rejectValue: string }
>("products/createProduct", async (newProduct, { rejectWithValue }) => {
  try {
    const response = await axios.post("/products", newProduct);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to create product"
    );
  }
});

// Update an Existing Product
export const updateProduct = createAsyncThunk<
  Product,
  Product,
  { rejectValue: string }
>("products/updateProduct", async (updatedProduct, { rejectWithValue }) => {
  try {
    const response = await axios.put(
      `/products/${updatedProduct.id}`,
      updatedProduct
    );
    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to update product"
    );
  }
});

// Delete a Product
export const deleteProduct = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("products/deleteProduct", async (productId, { rejectWithValue }) => {
  try {
    await axios.delete(`/products/${productId}`);
    return productId;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to delete product"
    );
  }
});

// Product Slice
const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {}, // Add synchronous reducers here if needed
  extraReducers: (builder) => {
    builder
      // Fetch Products
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchProducts.fulfilled,
        (state, action: PayloadAction<Product[]>) => {
          state.loading = false;
          state.products = action.payload;
        }
      )
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch products";
      })

      // Fetch Product by ID
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchProductById.fulfilled,
        (state, action: PayloadAction<Product>) => {
          state.loading = false;
          state.productDetails = action.payload;
        }
      )
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch product details";
      })

      // Create Product
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        createProduct.fulfilled,
        (state, action: PayloadAction<Product>) => {
          state.loading = false;
          state.products.push(action.payload);
        }
      )
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to create product";
      })

      // Update Product
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        updateProduct.fulfilled,
        (state, action: PayloadAction<Product>) => {
          state.loading = false;
          state.products = state.products.map((product) =>
            product.id === action.payload.id ? action.payload : product
          );
        }
      )
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to update product";
      })

      // Delete Product
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        deleteProduct.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.loading = false;
          state.products = state.products.filter(
            (product) => product.id !== action.payload
          );
        }
      )
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to delete product";
      });
  },
});

// Export the reducer
export default productSlice.reducer;
