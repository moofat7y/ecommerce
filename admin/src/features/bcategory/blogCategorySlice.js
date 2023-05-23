import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import blogCategoryService from "./blogCategoryService";

const initialState = {
  categories: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

export const getBlogCategories = createAsyncThunk(
  "blog/get-categories",
  async (thunkAPI) => {
    try {
      return await blogCategoryService.getBlogCategories();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const blogCategorySlice = createSlice({
  name: "bCategory",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBlogCategories.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(getBlogCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.categories = action.payload;
        state.message = "";
      })
      .addCase(getBlogCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.categories = null;
        state.isSuccess = false;
        state.message = action.payload.response.data.message;
      });
  },
});

export default blogCategorySlice.reducer;
