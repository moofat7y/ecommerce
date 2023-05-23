import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import imageService from "./imageService";
import { notifyError } from "../../utils/helpers";

const initialState = {
  images: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  isReset: false,
  message: "",
};

export const uploadImage = createAsyncThunk(
  "product/upload-image",
  async ({ data }, thunkAPI) => {
    try {
      const formData = new FormData();
      data.map((img) => {
        formData.append("images", img);
      });
      return await imageService.uploadImage(formData);
    } catch (error) {
      notifyError(error.response.data.message);
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const deleteImage = createAsyncThunk(
  "product/delete-image",
  async ({ imgId }, thunkAPI) => {
    try {
      return await imageService.deleteImage(imgId);
    } catch (error) {
      notifyError(error.response.data.message);
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

const imageSlice = createSlice({
  name: "image",
  initialState,
  reducers: {
    resetImageState(state) {
      state.images = [];
      state.isError = false;
      state.isLoading = false;
      state.isReset = true;
      state.message = "";
    },
    setEditImage(state, action) {
      state.images = [...state.images, ...action.payload];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadImage.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
        state.isSuccess = false;
        state.isReset = false;
      })
      .addCase(uploadImage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.isReset = false;
        state.images = [...state.images, ...action.payload];
      })
      .addCase(uploadImage.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.isReset = false;
        state.message = action.payload;
      })
      .addCase(deleteImage.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
        state.isSuccess = false;
        state.isReset = false;
      })
      .addCase(deleteImage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.isReset = false;
        state.images = state.images.filter(
          (img) => img.public_id !== action.meta.arg.imgId
        );
      })
      .addCase(deleteImage.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isReset = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});
export const { resetImageState, setEditImage } = imageSlice.actions;
export default imageSlice.reducer;
