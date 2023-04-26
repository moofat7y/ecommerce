import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import prodcategoryService from "./pcategoryService";

const initialState = {
  categories: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

export const getProdCategories = createAsyncThunk(
  "product/get-categories",
  async (thunkAPI) => {
    try {
      return await prodcategoryService.getProdCategories();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

const prodCategorySlice = createSlice({
  name: "pCategory",
  initialState,
  reducers: {
    resetState(state) {
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProdCategories.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.message = "";
        state.isSuccess = false;
      })
      .addCase(getProdCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = "";
        state.categories = action.payload;
      })
      .addCase(getProdCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      });
  },
});

export const { resetState } = prodCategorySlice.actions;
export default prodCategorySlice.reducer;
