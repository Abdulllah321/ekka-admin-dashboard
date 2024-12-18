import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

// Define types for MainCategory and SubCategory
interface MainCategory {
  id?: string;
  name: string;
  slug?: string;
  shortDesc?: string;
  fullDesc?: string;
  imageUrl?: string | null;
  subCategories: SubCategory[];
  error?: string;
  _count?: { products: number };
  status: "active" | "inactive";
}

interface SubCategory {
  id?: string;
  name?: string;
  slug?: string;
  status?: "active" | "inactive";
  createdAt?: Date;
  updatedAt?: Date;
  mainCategoryId?: string;
  mainCategory: MainCategory;
  imageUrl?: string;
}

// Define types for the state
interface MainCategoryState {
  mainCategories: MainCategory[];
  loading: boolean;
  error: string | null;
}

interface SubCategoryState {
  subCategories: SubCategory[];
  loading: boolean;
  error: string | null;
}

// Async Thunks for MainCategory
export const fetchMainCategories = createAsyncThunk<
  MainCategory[],
  void,
  { rejectValue: string }
>("mainCategory/fetchAll", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_SERVER_URL}/categories`
    );
    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data || "Failed to fetch main categories"
    );
  }
});

export const createMainCategory = createAsyncThunk<
  MainCategory,
  MainCategory,
  { rejectValue: string }
>("mainCategory/create", async (mainCategoryData, { rejectWithValue }) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_SERVER_URL}/categories`,
      mainCategoryData
    );
    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data.error || "Failed to create main category"
    );
  }
});

// Update Main Category
export const updateMainCategory = createAsyncThunk<
  MainCategory,
  { id: string; updatedData: Partial<MainCategory> },
  { rejectValue: string }
>("mainCategory/update", async ({ id, updatedData }, { rejectWithValue }) => {
  try {
    const response = await axios.put(
      `${import.meta.env.VITE_SERVER_URL}/categories/${id}`,
      updatedData
    );
    console.log(id);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data.error || "Failed to update main category"
    );
  }
});

// Delete Main Category
export const deleteMainCategory = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("mainCategory/delete", async (id, { rejectWithValue }) => {
  try {
    await axios.delete(`${import.meta.env.VITE_SERVER_URL}/categories/${id}`);
    return id; // Return the ID of the deleted category
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data.error || "Failed to delete main category"
    );
  }
});

// Async Thunks for SubCategory
export const fetchSubCategories = createAsyncThunk<
  SubCategory[],
  void,
  { rejectValue: string }
>("subCategory/fetchAll", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get("/subcategories");
    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data || "Failed to fetch sub categories"
    );
  }
});

export const createSubCategory = createAsyncThunk<
  SubCategory,
  SubCategory,
  { rejectValue: string }
>("subCategory/create", async (subCategoryData, { rejectWithValue }) => {
  try {
    const response = await axios.post("/subcategories", subCategoryData);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data || "Failed to create sub category"
    );
  }
});

export const updateSubCategory = createAsyncThunk<
  SubCategory,
  SubCategory,
  { rejectValue: string }
>("subCategory/update", async (subCategoryData, { rejectWithValue }) => {
  try {
    const response = await axios.put(
      `/subcategories/${subCategoryData.id}`,
      subCategoryData
    );
    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data || "Failed to update sub category"
    );
  }
});

export const deleteSubCategory = createAsyncThunk<
  string, // Returning the ID of the deleted subcategory
  string, // Accepting the subcategory ID to delete
  { rejectValue: string }
>("subCategory/delete", async (subCategoryId, { rejectWithValue }) => {
  try {
    await axios.delete(`/subcategories/${subCategoryId}`);
    return subCategoryId; // Returning the ID of the deleted subcategory
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data || "Failed to delete sub category"
    );
  }
});

// MainCategory Slice
const mainCategorySlice = createSlice({
  name: "mainCategory",
  initialState: {
    mainCategories: [] as MainCategory[],
    loading: false,
    error: null as string | null,
  } as MainCategoryState,
  reducers: {},
  extraReducers: (builder) => {
    // Fetching main categories
    builder
      .addCase(fetchMainCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchMainCategories.fulfilled,
        (state, action: PayloadAction<MainCategory[]>) => {
          state.loading = false;
          state.mainCategories = action.payload;
        }
      )
      .addCase(fetchMainCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Creating a new main category
    builder
      .addCase(createMainCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        createMainCategory.fulfilled,
        (state, action: PayloadAction<MainCategory>) => {
          state.loading = false;
          state.mainCategories.push(action.payload);
        }
      )
      .addCase(createMainCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to create main category";
      });

    // Updating a main category
    builder
      .addCase(updateMainCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        updateMainCategory.fulfilled,
        (state, action: PayloadAction<MainCategory>) => {
          state.loading = false;
          const index = state.mainCategories.findIndex(
            (category) => category.id === action.payload.id
          );
          if (index !== -1) {
            state.mainCategories[index] = action.payload;
          }
        }
      )
      .addCase(updateMainCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to update main category";
      });

    // Deleting a main category
    builder
      .addCase(deleteMainCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        deleteMainCategory.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.loading = false;
          state.mainCategories = state.mainCategories.filter(
            (category) => category.id !== action.payload
          );
        }
      )
      .addCase(deleteMainCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to delete main category";
      });
  },
});

// SubCategory Slice
const subCategorySlice = createSlice({
  name: "subCategory",
  initialState: {
    subCategories: [] as SubCategory[],
    loading: false,
    error: null as string | null,
  } as SubCategoryState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchSubCategories.fulfilled,
        (state, action: PayloadAction<SubCategory[]>) => {
          state.loading = false;
          state.subCategories = action.payload;
        }
      )
      .addCase(fetchSubCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(
        createSubCategory.fulfilled,
        (state, action: PayloadAction<SubCategory>) => {
          state.subCategories.push(action.payload);
        }
      ) // Updating an existing sub category
      .addCase(
        updateSubCategory.fulfilled,
        (state, action: PayloadAction<SubCategory>) => {
          const index = state.subCategories.findIndex(
            (subCategory) => subCategory.id === action.payload.id
          );
          if (index !== -1) {
            state.subCategories[index] = action.payload;
          }
        }
      )

      // Deleting a sub category
      .addCase(
        deleteSubCategory.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.subCategories = state.subCategories.filter(
            (subCategory) => subCategory.id !== action.payload
          );
        }
      );
  },
});

export const mainCategoryReducer = mainCategorySlice.reducer;
export const subCategoryReducer = subCategorySlice.reducer;
