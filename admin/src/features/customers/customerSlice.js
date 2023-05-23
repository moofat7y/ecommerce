import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import customerService from "./customerService";

const initialState = {
  customers: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

export const getUsers = createAsyncThunk(
  "customer/get-customers",
  async (thunkAPI) => {
    try {
      return await customerService.getUsers();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const updateUser = createAsyncThunk(
  "customer/update-customer",
  async ({ userId, role, toast }, thunkAPI) => {
    try {
      const data = await customerService.updateUser(userId, role);
      toast.success("Status updated", {
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

const customerSlice = createSlice({
  name: "users",
  reducers: {},
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.customers = action.payload;
        state.isSuccess = true;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.customers = [];
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload || "Something wrong";
      })
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.customers = state.customers.map((customer) =>
          customer._id === action.meta.arg.userId
            ? { ...customer, role: action.meta.arg.role }
            : customer
        );
        state.isSuccess = true;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload || "Something wrong";
      });
  },
});

export default customerSlice.reducer;
