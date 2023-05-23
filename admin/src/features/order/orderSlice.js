import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import orderService from "./orderService";
import { notifyError, notifySuccess } from "../../utils/helpers";

const initialState = {
  orders: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  singleOrder: null,
  message: "",
};

export const getOrders = createAsyncThunk(
  "order/get-allorders",
  async (thunkAPI) => {
    try {
      return await orderService.getOrders();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const getOrderById = createAsyncThunk(
  "order/get-order",
  async ({ orderId }, thunkAPI) => {
    try {
      return await orderService.getOrderById(orderId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const updateOrderStatus = createAsyncThunk(
  "order/update-status",
  async ({ orderId, status }, thunkAPI) => {
    try {
      const data = await orderService.updateOrderStatus(orderId, status);
      notifySuccess("Order updated");
      return data;
    } catch (error) {
      notifyError(error.response.data.message);
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const deleteOrder = createAsyncThunk(
  "order/delete-order",
  async ({ orderId, navigate }, thunkAPI) => {
    try {
      const data = await orderService.deleteOrder(orderId);
      navigate("/dashboard/orders");
      notifySuccess("Order deleted");
      return data;
    } catch (error) {
      notifyError(error.response.data.message);
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOrders.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.orders = action.payload;
        state.message = "";
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.orders = null;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(getOrderById.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(getOrderById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.singleOrder = action.payload;
        state.message = "";
      })
      .addCase(getOrderById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.singleOrder = null;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(updateOrderStatus.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.singleOrder =
          state.singleOrder._id === action.meta.arg.orderId
            ? { ...state.singleOrder, orderStatus: action.meta.arg.status }
            : state.singleOrder;
        state.message = "";
      })
      .addCase(updateOrderStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(deleteOrder.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.singleOrder = null;
        state.orders = state.orders.filter(
          (order) => order._id !== action.meta.arg.orderId
        );
      })
      .addCase(deleteOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      });
  },
});

export default orderSlice.reducer;
