import React from "react";
import { Link } from "react-router-dom";
import { CgSearch } from "react-icons/cg";
import { IoNotifications } from "react-icons/io5";
import { useSelector } from "react-redux";
const Header = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <div className="header m-0 w-100 row py-2 px-3 bg-light">
      <Link to="/" className="navbar-brand text-primary fs-6 px-0 col-2">
        Dashboard
      </Link>
      <div className="col-3">
        <div className="search bg-white rounded-3 d-flex">
          <div className="icon d-flex align-items-center justify-content-center px-2">
            <CgSearch />
          </div>
          <input
            type="text"
            className="form-control border-0 py-1"
            placeholder="Search..."
          />
        </div>
      </div>
      <div className="col-3 px-0 ms-auto">
        <div className="profile d-flex justify-content-end align-items-center">
          <Link to="/dashboard/profile" className="user nav-link d-flex">
            <div className="name">
              <span className="d-block lh-sm fs-7 fw-semibold">
                {user?.firstname + " " + user?.lastname}
              </span>
              <span className="d-block lh-sm fs-9 fw-lighter">
                {user?.email}
              </span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
{
}
