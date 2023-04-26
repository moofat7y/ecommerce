import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import wishlistService from "./wishlistService";
import { notifyError, notifySuccess } from "../../utils/helpers";

const initialState = {
  wishlist: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

export const getWishlist = createAsyncThunk("wishlist/", async (thunkAPI) => {
  try {
    return await wishlistService.getWishlist();
  } catch (error) {
    return thunkAPI.rejectWithValue(error?.response?.data?.message);
  }
});

export const addToWishlist = createAsyncThunk(
  "wishlist/add",
  async ({ prodId }, thunkAPI) => {
    try {
      const res = await wishlistService.addToWishlist(prodId);
      return res;
    } catch (error) {
      notifyError(error?.response?.data?.message);
      return thunkAPI.rejectWithValue(error?.response?.data?.message);
    }
  }
);

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    resetWishlist(state) {
      state.wishlist = [];
      state.isLoading = false;
      state.isError = false;
      state.message = "";
      state.isSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getWishlist.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.message = "";
      })
      .addCase(getWishlist.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.wishlist = action.payload;
      })
      .addCase(getWishlist.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(addToWishlist.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.message = "";
      })
      .addCase(addToWishlist.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        const isInWishlist = state.wishlist.findIndex(
          (wish) => wish._id === action.meta.arg.prodId
        );
        if (isInWishlist >= 0) {
          state.wishlist = state.wishlist.filter(
            (wish) => wish._id !== action.meta.arg.prodId
          );
        } else {
          state.wishlist = [...state.wishlist, action.payload];
        }
      })
      .addCase(addToWishlist.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      });
  },
});
export const { resetWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
