import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import productService from "./productService";

const initialState = {
  product: {},
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

export const getProduct = createAsyncThunk(
  "product/single-product",
  async ({ prodId }, thunkAPI) => {
    try {
      return await productService.getSingleProduct(prodId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data?.message);
    }
  }
);

export const rateProduct = createAsyncThunk(
  "product/rate",
  async ({ data }, thunkAPI) => {
    try {
      return await productService.rateProduct(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data?.message);
    }
  }
);

const singleProductSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProduct.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.message = "";
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.product = action.payload;
      })
      .addCase(getProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(rateProduct.fulfilled, (state, action) => {
        state.product = action.payload;
      });
  },
});

export default singleProductSlice.reducer;
