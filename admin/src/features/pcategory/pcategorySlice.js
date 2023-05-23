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

export const createCategory = createAsyncThunk(
  "brand/create-category",
  async ({ data, toast }, thunkAPI) => {
    try {
      const res = await prodcategoryService.createCategory(data);
      toast.success("Category created", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return res;
    } catch (error) {
      toast.error(error.response.data.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const deleteCategory = createAsyncThunk(
  "brand/delete-category",
  async ({ catId, toast }, thunkAPI) => {
    try {
      const data = await prodcategoryService.deleteCategory(catId);
      toast.success("Category deleted", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return data;
    } catch (error) {
      toast.error(error.response.data.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const editCategory = createAsyncThunk(
  "brand/edit-category",
  async ({ data, catId, toast }, thunkAPI) => {
    try {
      const res = await prodcategoryService.editCategory(data, catId);
      toast.success("Category updated", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return res;
    } catch (error) {
      toast.error(error.response.data.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
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
      })
      .addCase(createCategory.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.message = "";
        state.isSuccess = false;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = "Category Created";
        state.categories = [...state.categories, action.payload];
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(deleteCategory.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.message = "";
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = "Category Deleted";
        state.categories = state.categories.filter(
          (cat) => cat._id !== action.meta.arg.catId
        );
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(editCategory.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.message = "";
        state.isSuccess = false;
      })
      .addCase(editCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = "Category Updated";
        state.categories = state.categories.map((cat) =>
          cat._id === action.meta.arg.catId
            ? { ...cat, title: action.payload.title }
            : cat
        );
      })
      .addCase(editCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      });
  },
});

export const { resetState } = prodCategorySlice.actions;
export default prodCategorySlice.reducer;
