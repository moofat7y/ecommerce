import React from "react";
import { FaOpencart } from "react-icons/fa";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const HeaderCart = () => {
  const { cart } = useSelector((state) => state.user);
  return (
    <NavLink
      to="/cart"
      className="d-flex position-relative align-items-center nav-link"
    >
      <FaOpencart className="fs-5 " />
      {cart ? (
        <span className="position-absolute fs-9  top-0 start-100 translate-middle badge rounded-pill bg-primary">
          {cart?.products.length}
          <span className="visually-hidden">unread messages</span>
        </span>
      ) : (
        ""
      )}
      <span className="d-none d-md-inline mb-0 "> عربة التسوق</span>
    </NavLink>
  );
};

export default HeaderCart;
