import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import userService from "./userService";
import { notifyError, notifyInfo, notifySuccess } from "../../utils/helpers";

const cart = JSON.parse(window.localStorage.getItem("cart"));

const initialState = {
  cart: cart || { products: [], cartTotal: 0 },
  isLoading: false,
  isSuccess: false,
  isError: false,
  orders: [],
  message: "",
};

export const getCart = createAsyncThunk("cart/", async ({ cart }, thunkAPI) => {
  try {
    return await userService.getCart(cart);
  } catch (error) {
    return thunkAPI.rejectWithValue(error?.response?.data?.message);
  }
});

export const createOrder = createAsyncThunk(
  "cart/create-order",
  async ({ data, cart, navigate }, thunkAPI) => {
    try {
      const res = await userService.createOrder(data, cart);
      thunkAPI.dispatch(resetCart());
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
      window.localStorage.removeItem("cart");
      state.cart = { products: [], cartTotal: 0 };
      state.isLoading = false;
      state.isError = false;
      state.message = "";
      state.isSuccess = false;
    },
    addToCart(state, action) {
      const newCart = JSON.parse(localStorage.getItem("cart")) || {
        products: [],
        cartTotal: 0,
      };

      const alReadyAdded = newCart.products.findIndex(
        (prod) =>
          prod.color === action.payload.color &&
          prod.size === action.payload.size &&
          prod.product._id === action.payload.product._id
      );
      if (alReadyAdded >= 0) {
        const newProduct = {
          ...newCart.products[alReadyAdded],
          quantity: newCart.products[alReadyAdded].quantity + 1,
        };
        newCart.products[alReadyAdded] = newProduct;
        notifyInfo("تم تحديث الكميه");
      } else {
        const newProduct = {
          product: action.payload.product,
          quantity: 1,
          color: action.payload.color,
          size: action.payload.size,
          price: action.payload.product.price,
        };
        newCart.products.push(newProduct);
        notifySuccess("تم اضافه المنتج الي عربة التسوق");
      }
      let totalPrice = 0;
      for (let i = 0; i < newCart.products.length; i++) {
        totalPrice =
          totalPrice + newCart.products[i].price * newCart.products[i].quantity;
      }
      newCart.cartTotal = totalPrice;
      window.localStorage.setItem("cart", JSON.stringify(newCart));
      state.cart = newCart;
    },
    updateCartQuantity(state, action) {
      let prodIndex = state.cart.products.findIndex(
        (prod) =>
          prod.product._id === action.payload.prodId &&
          prod.color === action.payload.color &&
          prod.size === action.payload.size
      );
      const exsitProd = state.cart.products[prodIndex];
      state.cart.cartTotal =
        state.cart.cartTotal -
        state.cart.products[prodIndex].quantity *
          state.cart.products[prodIndex].price;

      if (action.payload.quantity > 0) {
        state.cart.products[prodIndex].quantity = action.payload.quantity;
      } else if (action.payload.quantity <= 0) {
        state.cart.products = state.cart.products.filter(
          (prod) =>
            prod.product._id !== action.payload.prodId ||
            prod.color !== action.payload.color ||
            prod.size !== action.payload.size
        );
      }
      state.cart.cartTotal += exsitProd.price * action.payload.quantity;
      window.localStorage.setItem("cart", JSON.stringify(state.cart));
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
export const { resetCart, addToCart, updateCartQuantity } = cartSlice.actions;
export default cartSlice.reducer;
