import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import colorService from "./colorService";

const initialState = {
  colors: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

export const getColors = createAsyncThunk(
  "color/get-colors",
  async (thunkAPI) => {
    try {
      return await colorService.getColors();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const createColor = createAsyncThunk(
  "color/create-color",
  async ({ data, toast }, thunkAPI) => {
    try {
      const res = await colorService.createColor(data);
      toast.success("Color created", {
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

export const editColor = createAsyncThunk(
  "color/edit-color",
  async ({ colorId, data, toast }, thunkAPI) => {
    try {
      const res = await colorService.editColor(colorId, data);
      toast.success("Color updated", {
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

export const deleteColor = createAsyncThunk(
  "color/delete-color",
  async ({ colorId, toast }, thunkAPI) => {
    try {
      const data = await colorService.deleteColor(colorId);
      toast.success("Color deleted", {
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

const colorSlice = createSlice({
  name: "color",
  initialState,
  reducers: {
    resetState(state) {
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getColors.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(getColors.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.colors = action.payload;
        state.message = "";
      })
      .addCase(getColors.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.colors = null;
        state.isSuccess = false;
        state.message = action.payload.response.data.message;
      })

      .addCase(createColor.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(createColor.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.colors = [...state.colors, action.payload];
        state.message = "Color created";
      })
      .addCase(createColor.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(editColor.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(editColor.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.colors = state.colors.map((color) =>
          color._id === action.meta.arg.colorId
            ? { ...color, title: action.payload.title }
            : color
        );
        state.message = "Color updated";
      })
      .addCase(editColor.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(deleteColor.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(deleteColor.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.colors = state.colors.filter(
          (color) => color._id !== action.meta.arg.colorId
        );
        state.message = "Color deleted";
      })
      .addCase(deleteColor.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      });
  },
});
export const { resetState } = colorSlice.actions;
export default colorSlice.reducer;
