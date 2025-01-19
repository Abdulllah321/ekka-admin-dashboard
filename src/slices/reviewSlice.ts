import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { Review } from "../utils/types";

interface ReviewState {
  review: null | Review;
  reviews: Review[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: ReviewState = {
  review: null,
  reviews: [],
  status: "idle",
  error: null,
};

export const fetchAllReviews = createAsyncThunk<Review[], void>(
  "reviews/fetchAllReviews",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/reviews`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch reviews."
      );
    }
  }
);

export const fetchReviews = createAsyncThunk<Review[], string>(
  "reviews/fetchReviews",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/reviews/${productId}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch reviews."
      );
    }
  }
);
export const fetchReviewById = createAsyncThunk<Review, string>(
  "reviews/fetchReviewById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/reviews/id/${id}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch reviews."
      );
    }
  }
);

export const addReview = createAsyncThunk<
  Review,
  Omit<Review, "id" | "createdAt">
>("reviews/addReview", async (reviewData, { rejectWithValue }) => {
  try {
    const response = await axios.post(`/reviews`, reviewData);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data || "Failed to add review.");
  }
});

// Delete a review
export const deleteReview = createAsyncThunk<string, string>(
  "reviews/deleteReview",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`/reviews/${id}`);
      return id;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || "Failed to delete review."
      );
    }
  }
);

const reviewSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllReviews.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchAllReviews.fulfilled,
        (state, action: PayloadAction<Review[]>) => {
          state.status = "succeeded";
          state.reviews = action.payload;
          console.log(action.payload)
        }
      )
      .addCase(
        fetchAllReviews.rejected,
        (state, action: PayloadAction<any>) => {
          state.status = "failed";
          state.error = action.payload;
        }
      )
      .addCase(fetchReviews.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchReviews.fulfilled,
        (state, action: PayloadAction<Review[]>) => {
          state.status = "succeeded";
          state.reviews = action.payload;
        }
      )
      .addCase(fetchReviews.rejected, (state, action: PayloadAction<any>) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(fetchReviewById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchReviewById.fulfilled,
        (state, action: PayloadAction<Review>) => {
          state.status = "succeeded";
          state.review = action.payload;
        }
      )
      .addCase(
        fetchReviewById.rejected,
        (state, action: PayloadAction<any>) => {
          state.status = "failed";
          state.error = action.payload;
        }
      )
      .addCase(addReview.fulfilled, (state, action: PayloadAction<Review>) => {
        state.reviews.push(action.payload);
      })
      .addCase(
        deleteReview.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.reviews = state.reviews.filter(
            (review: Review) => review.id !== action.payload
          );
        }
      );
  },
});

export default reviewSlice.reducer;
