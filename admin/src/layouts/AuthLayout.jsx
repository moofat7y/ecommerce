import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import authAnimation from "../animations/login_dh.json";
const AuthLayout = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, []);
  return (
    <div className="auth d-flex">
      <div className="bg-white h-100 w-50 d-flex flex-column align-items-center justify-content-center">
        <Outlet />
      </div>
      <div className="right-side bg-light w-50 d-flex justify-content-center align-items-center">
        <Lottie animationData={authAnimation} />
      </div>
    </div>
  );
};

export default AuthLayout;
