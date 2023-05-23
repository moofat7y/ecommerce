import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import dashboardService from "./dashboardService";

const initialState = {
  ordersInEachMonth: [],
  dashboardDetails: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

export const getOrdersInEachMonth = createAsyncThunk(
  "dashboard/get-orders",
  async (thunkAPI) => {
    try {
      return await dashboardService.getOrdersInEachMonth();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const getDashboardDetails = createAsyncThunk(
  "dashboard/get-details",
  async (thunkAPI) => {
    try {
      return await dashboardService.getDashboardDetails();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOrdersInEachMonth.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(getOrdersInEachMonth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.ordersInEachMonth = action.payload;
        state.message = "";
      })
      .addCase(getOrdersInEachMonth.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.ordersInEachMonth = null;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(getDashboardDetails.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(getDashboardDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.dashboardDetails = action.payload;
        state.message = "";
      })
      .addCase(getDashboardDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.dashboardDetails = [];
        state.isSuccess = false;
        state.message = action.payload;
      });
  },
});

export default dashboardSlice.reducer;
