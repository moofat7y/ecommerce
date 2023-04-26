import { configureStore } from "@reduxjs/toolkit";

import authRed from "../features/auth/authSlice";
import productRed from "../features/product/productSlice";
import featuredRed from "../features/product/featuredProdSlice";
import popularRed from "../features/product/popularProdSlice";
import singleProdRed from "../features/product/singleProdSlice";
import userRed from "../features/user/userSlice";
import brandRed from "../features/brands/brandSlice";
import pcategoryRed from "../features/pcategory/pcategorySlice";
import wishlistRed from "../features/wishlist/wishlistSlice";
export const store = configureStore({
  reducer: {
    auth: authRed,
    product: productRed,
    user: userRed,
    brand: brandRed,
    category: pcategoryRed,
    featuredProd: featuredRed,
    popularProd: popularRed,
    singleProd: singleProdRed,
    wishlist: wishlistRed,
  },
});
