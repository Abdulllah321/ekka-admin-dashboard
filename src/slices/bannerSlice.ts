import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

// Define the Banner type
export interface Banner {
  id?: string;
  image: string;
  title: string;
  subtitle: string;
  discount: string;
  buttonText: string;
  buttonUrl: string;
  animation: string;
}

// Fetch all banners
export const fetchBanners = createAsyncThunk<Banner[]>(
  "banners/fetchBanners",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get<Banner[]>("/banners");
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Failed to fetch banners"
      );
    }
  }
);

// Create a new banner
export const createBanner = createAsyncThunk<Banner, Omit<Banner, "id">>(
  "banners/createBanner",
  async (newBanner, thunkAPI) => {
    try {
      const response = await axios.post<Banner>("/banners", newBanner);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Failed to create banner"
      );
    }
  }
);

// Get a single banner by ID
export const getBannerById = createAsyncThunk<Banner, string>(
  "banners/getBannerById",
  async (id, thunkAPI) => {
    try {
      const response = await axios.get<Banner>(`/banners/${id}`);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Failed to fetch banner"
      );
    }
  }
);

// Update a banner by ID
export const updateBanner = createAsyncThunk<
  Banner,
  { id: string; updatedBanner: Partial<Banner> }
>("banners/updateBanner", async ({ id, updatedBanner }, thunkAPI) => {
  try {
    const response = await axios.put<Banner>(`/banners/${id}`, updatedBanner);
    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      error.response?.data || "Failed to update banner"
    );
  }
});

// Delete a banner by ID
export const deleteBanner = createAsyncThunk<string, string>(
  "banners/deleteBanner",
  async (id, thunkAPI) => {
    try {
      await axios.delete(`/banners/${id}`);
      return id; // Return the ID of the deleted banner
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Failed to delete banner"
      );
    }
  }
);

interface BannerState {
  banners: Banner[];
  selectedBanner: Banner | null;
  loading: boolean;
  error: string | null;
}

const initialState: BannerState = {
  banners: [],
  selectedBanner: null,
  loading: false,
  error: null,
};

const bannerSlice = createSlice({
  name: "banners",
  initialState,
  reducers: {
    clearSelectedBanner(state) {
      state.selectedBanner = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch Banners
    builder.addCase(fetchBanners.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      fetchBanners.fulfilled,
      (state, action: PayloadAction<Banner[]>) => {
        state.banners = action.payload;
        state.loading = false;
      }
    );
    builder.addCase(fetchBanners.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Create Banner
    builder.addCase(createBanner.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      createBanner.fulfilled,
      (state, action: PayloadAction<Banner>) => {
        state.banners.push(action.payload);
        state.loading = false;
      }
    );
    builder.addCase(createBanner.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Get Banner By ID
    builder.addCase(getBannerById.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      getBannerById.fulfilled,
      (state, action: PayloadAction<Banner>) => {
        state.selectedBanner = action.payload;
        state.loading = false;
      }
    );
    builder.addCase(getBannerById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Update Banner
    builder.addCase(updateBanner.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      updateBanner.fulfilled,
      (state, action: PayloadAction<Banner>) => {
        const index = state.banners.findIndex(
          (b) => b.id === action.payload.id
        );
        if (index !== -1) {
          state.banners[index] = action.payload;
        }
        state.loading = false;
      }
    );
    builder.addCase(updateBanner.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Delete Banner
    builder.addCase(deleteBanner.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      deleteBanner.fulfilled,
      (state, action: PayloadAction<string>) => {
        state.banners = state.banners.filter((b) => b.id !== action.payload);
        state.loading = false;
      }
    );
    builder.addCase(deleteBanner.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export const { clearSelectedBanner } = bannerSlice.actions;

export default bannerSlice.reducer;