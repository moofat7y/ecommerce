import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoPersonOutline } from "react-icons/io5";
import { AiOutlineHeart } from "react-icons/ai";
import { NavLink, Link } from "react-router-dom";
import { logout } from "../../features/auth/authSlice";
import HeaderCart from "./HeaderCart";
const UserFeatures = () => {
  const { user } = useSelector((state) => state.auth);
  const [isLoading, setisLoading] = useState(false);
  const dispatch = useDispatch();
  const onLogout = async () => {
    try {
      setisLoading(true);
      await dispatch(logout());
      setisLoading(false);
    } catch (error) {
      setisLoading(false);
    }
  };
  return (
    <div className="d-flex gap-3 order-2 order-md-3 order-xl-4">
      {user ? (
        <div className="dropdown">
          <div
            className=" dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <IoPersonOutline className="fs-5 mx-0" />
            <span className="mb-0 d-none d-md-inline-block">حسابي</span>
          </div>
          <ul className="dropdown-menu text-center px-2 slideIn animate translate-middle-x">
            <li>
              <Link to="/my-account" className="dropdown-item">
                حسابي
              </Link>
            </li>
            <li>
              <Link to="/orders-tracker" className="dropdown-item">
                الطلبات
              </Link>
            </li>
            <li>
              <button
                disabled={isLoading}
                onClick={() => {
                  onLogout();
                }}
                className="dropdown-item bg-danger text-white"
              >
                تسجيل الخروج
              </button>
            </li>
          </ul>
        </div>
      ) : (
        <Link to="/auth/signin" className="d-flex align-items-center nav-link">
          <IoPersonOutline className="fs-5" />
          <span className="d-none d-md-inline mb-0 ">تسجيل الدخول</span>
        </Link>
      )}

      <NavLink to="/wishlist" className="d-flex align-items-center nav-link">
        <AiOutlineHeart className="fs-5 " />

        <span className="d-none d-md-inline mb-0 "> قائمة الرغبات</span>
      </NavLink>

      <HeaderCart />
    </div>
  );
};

export default UserFeatures;
