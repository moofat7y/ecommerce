import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import AddProduct from "./pages/product/AddProduct";
import BrandList from "./pages/product/BrandList";
import ColorList from "./pages/product/ColorList";
import Customers from "./pages/customer/Customers";
import Dashboard from "./pages/dashboard/Dashboard";
import Enquiry from "./pages/Enquiry";
import Order from "./pages/order/Order";
import OrderDetails from "./pages/order/OrderDetails";
import ProdCategoryList from "./pages/product/ProdCategoryList";
import ProductList from "./pages/product/ProductList";
import Profile from "./pages/Profile";
import SignIn from "./pages/auth/SignIn";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import AuthLayout from "./layouts/AuthLayout";
import { useEffect } from "react";
import { getBrands } from "./features/brands/brandSlice";
import { getProdCategories } from "./features/pcategory/pcategorySlice";
import { getColors } from "./features/color/colorSlice";
function App() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const ProtectedRoute = ({ children }) => {
    if (!user) {
      return <Navigate to="/" />;
    }
    return children;
  };

  useEffect(() => {
    dispatch(getBrands());
    dispatch(getProdCategories());
    dispatch(getColors());
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthLayout />}>
          <Route path="/" index element={<SignIn />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route
            path="auth/reset-password/:token"
            element={<ResetPassword />}
          />
        </Route>
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="/dashboard/profile" element={<Profile />} />
          <Route path="/dashboard/customers" element={<Customers />} />
          <Route path="/dashboard/product-list" element={<ProductList />} />
          <Route path="/dashboard/brand-list" element={<BrandList />} />
          <Route
            path="/dashboard/product/category-list"
            element={<ProdCategoryList />}
          />
          <Route path="/dashboard/color-list" element={<ColorList />} />
          <Route path="/dashboard/enquires" element={<Enquiry />} />
          <Route path="/dashboard/orders" element={<Order />} />
          <Route path="/dashboard/orders/:orderId" element={<OrderDetails />} />
          <Route
            path="/dashboard/catalog/add-product"
            element={<AddProduct />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
