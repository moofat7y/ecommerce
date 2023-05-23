import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import productsService from "./productService";
import { notifyError, notifySuccess } from "../../utils/helpers";
const initialState = {
  products: [],
  deleteProducts: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  updatedProduct: null,
  message: "",
};

export const getProducts = createAsyncThunk(
  "product/get-products",
  async (thunkAPI) => {
    try {
      return await productsService.getProducts();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const createProduct = createAsyncThunk(
  "product/create-product",
  async ({ data, navigate }, thunkAPI) => {
    try {
      const res = await productsService.createProduct(data);
      notifySuccess("Product created");
      navigate("/dashboard/product-list");
      return res;
    } catch (error) {
      notifyError(error.response.data.message);
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const updateProduct = createAsyncThunk(
  "product/update-product",
  async ({ data, prodId, navigate }, thunkAPI) => {
    try {
      const res = await productsService.updateProduct(data, prodId);
      notifySuccess("Product updated");
      navigate("/dashboard/product-list");
      return res;
    } catch (error) {
      notifyError(error.response.data.message);
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "product/delete-product",
  async ({ prodId }, thunkAPI) => {
    try {
      const data = await productsService.deleteProduct(prodId);
      notifySuccess("Product deleted");
      return data;
    } catch (error) {
      notifyError(error.response.data.message);
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setUpdateProduct(state, action) {
      state.updatedProduct = action.payload;
    },
    resetState(state) {
      state.message = "";
      state.updatedProduct = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.message = "";
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.products = action.payload.products;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(createProduct.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.message = "";
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = "Product created";
        state.products = [...state.products, action.payload];
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(updateProduct.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.message = "";
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updatedProduct = null;
        state.message = "Product updated";
        state.products = state.products.map((prod) =>
          prod._id === action.meta.arg.prodId ? action.payload : prod
        );
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(deleteProduct.pending, (state, action) => {
        state.isError = false;
        state.isLoading = true;
        state.message = "";
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = "Product deleted";
        state.isSuccess = true;
        state.isError = false;
        state.products = state.products.filter(
          (prod) => prod._id !== action.meta.arg.prodId
        );
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { setUpdateProduct, resetState } = productSlice.actions;
export default productSlice.reducer;
