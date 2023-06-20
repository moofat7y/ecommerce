import { Suspense, lazy, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./scss/app.css";
import "react-toastify/dist/ReactToastify.css";

import LayOut from "./layouts/LayOut";
import AuthLayout from "./layouts/AuthLayout";

const SignUp = lazy(() => import("./pages/auth/SignUp"));
const SignIn = lazy(() => import("./pages/auth/Signin"));
const ConfirmEmail = lazy(() => import("./pages/auth/ConfirmEmail"));
const ForgotPassword = lazy(() => import("./pages/auth/ForgotPassword"));
const ResetPassword = lazy(() => import("./pages/auth/ResetPassword"));
const Home = lazy(() => import("./pages/home/Home"));
const Store = lazy(() => import("./pages/our-store/Store"));
const SingleProduct = lazy(() => import("./pages/singleProduct/SingleProduct"));
const Cart = lazy(() => import("./pages/cart/Cart"));
const OrderConfirm = lazy(() => import("./pages/cart/OrderConfirm"));
const OrdersTracker = lazy(() => import("./pages/ordersTracker/OrdersTracker"));
const ContactUs = lazy(() => import("./pages/contactus/ContactUs"));
const WishList = lazy(() => import("./pages/wishlist/WishList"));
const Account = lazy(() => import("./pages/account/Account"));
const Edit = lazy(() => import("./pages/account/Edit"));

import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollTop";
import LoadingCont from "./components/loading/LoadingCont";
import Header from "./components/header/Header";

import { useDispatch, useSelector } from "react-redux";
import { getBrands } from "./features/brands/brandSlice";
import { getProdCategories } from "./features/pcategory/pcategorySlice";
import { getFeaturedProducts } from "./features/product/featuredProdSlice";
import { getPopularProducts } from "./features/product/popularProdSlice";
import { getProducts } from "./features/product/productSlice";
import Loading from "./components/loading/Loading";
import NotFound from "./pages/notfound/NotFound";
import { getCart } from "./features/user/userSlice";
import { getBestSellerProducts } from "./features/product/bestseller";

function App() {
  const { isLogin } = useSelector((state) => state.auth);
  const cart = JSON.parse(localStorage.getItem("cart"));
  const dispatch = useDispatch();
  const ProtectedRoute = ({ login, children }) => {
    if (!login) {
      return <Navigate to="/auth/signin" replace />;
    }

    return children;
  };

  useEffect(() => {
    dispatch(getBrands());
    dispatch(getProdCategories());
    dispatch(getProducts({ query: null }));
    dispatch(getFeaturedProducts({ query: "limit=10&tag=featured" }));
    dispatch(getPopularProducts({ query: "limit=10&tag=popular" }));
    dispatch(getBestSellerProducts({ query: "limit=10&sort=-sold" }));
    if (cart) {
      dispatch(getCart({ cart }));
    }
  }, []);

  return (
    <Suspense
      fallback={
        <div className="position-fixed top-0 start-0 vh-100 w-100 d-flex align-items-center justify-content-center">
          <Loading />
        </div>
      }
    >
      <BrowserRouter>
        <Header />
        <LoadingCont />
        <ScrollToTop />

        <Routes>
          <Route path="/auth" element={<AuthLayout />}>
            <Route path="/auth/signup" element={<SignUp />} />
            <Route path="/auth/signin" element={<SignIn />} />
            <Route path="/auth/forgot-password" element={<ForgotPassword />} />
            <Route
              path="/auth/reset-password/:token"
              element={<ResetPassword />}
            />
          </Route>
          <Route path="/" element={<LayOut />}>
            <Route path="/" element={<Home />} />
            <Route path="/ourstore" element={<Store />} />
            <Route path="/ourstore/:prodId" element={<SingleProduct />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/cart/confirm-order" element={<OrderConfirm />} />
            <Route
              path="/orders-tracker"
              element={
                <ProtectedRoute login={isLogin}>
                  <OrdersTracker />
                </ProtectedRoute>
              }
            />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/wishlist" element={<WishList />} />
            <Route path="/my-account" element={<Account />} />
            <Route path="/my-account/edit" element={<Edit />} />
            <Route path="*" element={<NotFound />} />
          </Route>
          <Route path="/confirm-email/:token/" element={<ConfirmEmail />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
