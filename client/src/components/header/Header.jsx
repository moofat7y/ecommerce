import React from "react";
import { BsTelephone } from "react-icons/bs";

import UserFeatures from "./UserFeatures";
import { NavLink } from "react-router-dom";
import {
  AiOutlineAppstore,
  AiOutlineHome,
  AiOutlinePhone,
} from "react-icons/ai";
import SearchBox from "./SearchBox";

const Header = () => {
  return (
    <header>
      <div className="py-1 bg-primary ">
        <div className="container text-white fs-7 d-flex justify-content-between align-items-center">
          <a
            href="tel:+201210192476"
            className="phone text-white nav-link d-flex align-items-center"
          >
            <BsTelephone className="mx-2" />
            +201210192476
          </a>

          <span className="mb-0">Shop</span>

          <span className="mb-0">AR</span>
        </div>
      </div>

      <nav className="navbar shadow-sm navbar-expand-xl bg-body-tertiary">
        <div className="container d-flex">
          <a className="navbar-brand order-1  mx-0" href="#">
            E-Commerce
          </a>
          <UserFeatures />
          <SearchBox />
          <div
            className=" navbar-collapse order-4 order-md-4 order-xl-2"
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav me-auto mb-xl-2 mb-lg-0">
              <li className="nav-item d-flex align-items-center">
                <NavLink to="/" className="nav-link " aria-current="page">
                  <span className="mb-0 d-none d-xl-block">الرئيسيه</span>
                  <AiOutlineHome className="d-block d-xl-none fs-4" />
                </NavLink>
              </li>
              <li className="nav-item d-flex align-items-center">
                <NavLink to="/ourstore" className="nav-link">
                  <span className="mb-0 d-none d-xl-block">متجرنا</span>
                  <AiOutlineAppstore className="d-block d-xl-none fs-4" />
                </NavLink>
              </li>

              <li className="nav-item d-flex align-items-center">
                <NavLink to="/contact-us" className="nav-link">
                  <span className="mb-0 d-none d-xl-block">اتصل بنا</span>
                  <AiOutlinePhone className="d-block d-xl-none fs-4" />
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;