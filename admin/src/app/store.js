import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import customerReduccer from "../features/customers/customerSlice";
import productReduccer from "../features/products/productSlice";
import brandReduccer from "../features/brands/brandSlice";
import pcategoryReduccer from "../features/pcategory/pcategorySlice";
import colorReduccer from "../features/color/colorSlice";
import blogReduccer from "../features/blog/blogSlice";
import bcategoryReduccer from "../features/bcategory/blogCategorySlice";
import enqReduccer from "../features/enquires/enqSlice";
import orderReduccer from "../features/order/orderSlice";
import imageReduccer from "../features/images/imageSlice";
import dashboardReduccer from "../features/dashboard/dashboardSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    customer: customerReduccer,
    product: productReduccer,
    brand: brandReduccer,
    color: colorReduccer,
    pCategory: pcategoryReduccer,
    bCategory: bcategoryReduccer,
    blog: blogReduccer,
    enquiry: enqReduccer,
    order: orderReduccer,
    image: imageReduccer,
    dashboard: dashboardReduccer,
  },
});
