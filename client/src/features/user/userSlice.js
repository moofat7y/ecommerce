import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userService from "./userService";
import { notifyError, notifySuccess } from "../../utils/helpers";

const initialState = {
  cart: null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  orders: [],
  message: "",
};

export const getCart = createAsyncThunk("cart/", async (thunkAPI) => {
  try {
    return await userService.getCart();
  } catch (error) {
    return thunkAPI.rejectWithValue(error?.response?.data?.message);
  }
});

export const addToCart = createAsyncThunk(
  "cart/add",
  async ({ prodId, color, size }, thunkAPI) => {
    try {
      const res = await userService.addToCart(prodId, color, size);
      notifySuccess("تمت الاضافه الي عربة التسوق");
      return res;
    } catch (error) {
      notifyError(error?.response?.data?.message);
      return thunkAPI.rejectWithValue(error?.response?.data?.message);
    }
  }
);

export const updateCartQuantity = createAsyncThunk(
  "cart/prod-quantity",
  async ({ prodId, color, size, quantity }, thunkAPI) => {
    try {
      const res = await userService.updateCartQuantity(
        prodId,
        color,
        size,
        quantity
      );
      return res;
    } catch (error) {
      notifyError(error?.response?.data?.message);
      return thunkAPI.rejectWithValue(error?.response?.data?.message);
    }
  }
);

export const createOrder = createAsyncThunk(
  "cart/create-order",
  async ({ data, navigate }, thunkAPI) => {
    try {
      const res = await userService.createOrder(data);
      notifySuccess("تم تاكيد الطلب بنجاح وسيتم التواصل معك في اقرب وقت");
      navigate("/");
      return res;
    } catch (error) {
      notifyError(error?.response?.data?.message);
      return thunkAPI.rejectWithValue(error?.response?.data?.message);
    }
  }
);

export const getOrders = createAsyncThunk(
  "orders-tracker/",
  async (thunkAPI) => {
    try {
      return await userService.getOrders();
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data?.message);
    }
  }
);

const cartSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetCart(state) {
      state.cart = null;
      state.isLoading = false;
      state.isError = false;
      state.message = "";
      state.isSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCart.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.message = "";
      })
      .addCase(getCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.cart = action.payload;
      })
      .addCase(getCart.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(addToCart.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.message = "";
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.cart = action.payload;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(updateCartQuantity.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.message = "";
      })
      .addCase(updateCartQuantity.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.cart = action.payload;
      })
      .addCase(updateCartQuantity.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.cart = { ...state.cart, cartTotal: 0, products: [] };
        state.orders = [...state.orders, action.payload];
      })
      .addCase(getOrders.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.orders = action.payload;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      });
  },
});
export const { resetCart } = cartSlice.actions;
export default cartSlice.reducer;
