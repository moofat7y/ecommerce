import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getStatus } from "../features/auth/authSlice";
import { getCart, getOrders } from "../features/user/userSlice";
import { getWishlist } from "../features/wishlist/wishlistSlice";
const LayOut = () => {
  const { token, isFirstLogin } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchUserData = async () => {
      const res = await dispatch(getStatus());
      if (res.meta.requestStatus === "fulfilled") {
        dispatch(getWishlist());
        dispatch(getCart());
        dispatch(getOrders());
      }
    };

    if (token) {
      fetchUserData();
    }
  }, [isFirstLogin]);

  return (
    <div className="app">
      <Outlet />
    </div>
  );
};

export default LayOut;
