import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import brandService from "./brandService";

const initialState = {
  brands: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const getBrands = createAsyncThunk(
  "brand/get-brands",
  async (thunkAPI) => {
    try {
      return await brandService.getBrands();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const createBrand = createAsyncThunk(
  "brand/create-brand",
  async ({ data, toast }, thunkAPI) => {
    try {
      const res = await brandService.createBrand(data);
      toast.success("Brand created", {
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

export const deleteBrand = createAsyncThunk(
  "brand/delete-brand",
  async ({ brandId, toast }, thunkAPI) => {
    try {
      const data = await brandService.deleteBrand(brandId);

      toast.success("Brand deleted", {
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

export const editBrand = createAsyncThunk(
  "brand/edit-brand",
  async ({ data, brandId, toast }, thunkAPI) => {
    try {
      const res = await brandService.editBrand(data, brandId);
      toast.success("Brand updated", {
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

const brandSlice = createSlice({
  name: "brand",
  initialState,
  reducers: {
    resetState(state) {
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBrands.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(getBrands.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.brands = action.payload;
      })
      .addCase(getBrands.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.brands = null;
        state.message = action.payload;
      })
      .addCase(createBrand.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(createBrand.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = "Brand Created";
        state.brands = [...state.brands, action.payload];
      })
      .addCase(createBrand.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.brands = null;
        state.message = action.payload;
      })
      .addCase(deleteBrand.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(deleteBrand.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = "Brand deleted";
        state.brands = state.brands.filter(
          (brand) => brand._id !== action.meta.arg.brandId
        );
      })
      .addCase(deleteBrand.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(editBrand.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(editBrand.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = "Brand updated";
        state.brands = state.brands.map((brand) =>
          brand._id === action.meta.arg.brandId
            ? { ...brand, title: action.payload.title }
            : brand
        );
      })
      .addCase(editBrand.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      });
  },
});

export const { resetState } = brandSlice.actions;

export default brandSlice.reducer;
