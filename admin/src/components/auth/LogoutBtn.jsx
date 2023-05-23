import React from "react";
import { CgLogOut } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../features/auth/authSlice";

const LogoutBtn = () => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.auth);
  return (
    <button
      disabled={isLoading}
      onClick={() => dispatch(logOut())}
      className="btn btn-danger w-100"
    >
      <CgLogOut className="me-1 fs-5" />
      Logout
    </button>
  );
};

export default LogoutBtn;
