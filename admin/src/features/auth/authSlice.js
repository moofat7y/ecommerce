import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";
import { notifyError, notifySuccess } from "../../utils/helpers";

const userDefaultState = JSON.parse(window.localStorage.getItem("user"));

const initialState = {
  user: userDefaultState || null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

export const login = createAsyncThunk(
  "auth/admin-login",
  async ({ user, navigate }, thunkAPI) => {
    try {
      const data = await authService.Login(user);
      window.localStorage.setItem("user", JSON.stringify(data));
      navigate("/dashboard");
      notifySuccess(`Welcome back ${data.firstname}`);
      return data;
    } catch (error) {
      notifyError(error?.response?.data?.message);
      return thunkAPI.rejectWithValue(error?.response?.data?.message);
    }
  }
);

export const getUserStatus = createAsyncThunk(
  "user/get-status",
  async ({ token }, thunkAPI) => {
    try {
      return await authService.getUserStatus(token);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const refreshToken = createAsyncThunk(
  "user/refresh",
  async (_, thunkAPI) => {
    try {
      return await authService.refreshToken();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const logOut = createAsyncThunk("logout", async (thunkAPI) => {
  try {
    const data = await authService.logOut();
    window.localStorage.removeItem("user");
    return data;
  } catch (error) {
    window.localStorage.removeItem("user");

    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.message = "";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
        state.message = "";
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.user = null;
        state.message = action.payload;
      })
      .addCase(logOut.pending, (state) => {
        state.isLoading = true;
        state.message = "";
      })
      .addCase(logOut.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = null;
        state.message = "";
      })
      .addCase(logOut.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      });
  },
});

export default authSlice.reducer;
