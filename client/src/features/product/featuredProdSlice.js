import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import productService from "./productService";
const initialState = {
  products: [],
  productsCount: 0,
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

export const getFeaturedProducts = createAsyncThunk(
  "product/featured",
  async ({ query }, thunkAPI) => {
    try {
      return await productService.getFeaturedProducts(query);
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data?.message);
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFeaturedProducts.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.message = "";
      })
      .addCase(getFeaturedProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.products = action.payload.products;
        state.productsCount = action.payload.count;
      })
      .addCase(getFeaturedProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      });
  },
});

export default productSlice.reducer;
