import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import enqService from "./enqService";
import { notifyError, notifySuccess } from "../../utils/helpers";

const initialState = {
  enquires: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

export const getEnquires = createAsyncThunk(
  "enquiry/get-enquires",
  async (thunkAPI) => {
    try {
      return await enqService.getEnquires();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const deleteEnquiry = createAsyncThunk(
  "enquiry/delete-enquiry",
  async (enqId, thunkAPI) => {
    try {
      const res = await enqService.deleteEnquiry(enqId);
      notifySuccess("Enquiry deleted");

      return res;
    } catch (error) {
      notifyError(error.response.data.message);
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const updateEnquiry = createAsyncThunk(
  "enquiry/update-enquiry",
  async ({ status, enqId }, thunkAPI) => {
    try {
      const res = await enqService.updateEnquiry(status, enqId);
      notifySuccess("Enquiry status updated");
      return res;
    } catch (error) {
      notifyError(error.response?.data?.message);
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

const enqSlice = createSlice({
  name: "enquiry",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getEnquires.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getEnquires.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.enquires = action.payload;
      })
      .addCase(getEnquires.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.enquires = null;
        state.message = action.payload.response.data.message;
      })
      .addCase(updateEnquiry.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateEnquiry.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.enquires = state.enquires.map((enq) =>
          enq._id === action.meta.arg.enqId
            ? { ...enq, status: action.meta.arg.status }
            : enq
        );
      })
      .addCase(updateEnquiry.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload.response.data.message;
      })
      .addCase(deleteEnquiry.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteEnquiry.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.enquires = state.enquires.filter(
          (enq) => enq._id !== action.meta.arg
        );
      })
      .addCase(deleteEnquiry.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload.response.data.message;
      });
  },
});

export default enqSlice.reducer;
