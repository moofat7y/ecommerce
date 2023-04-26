import React from "react";
import { Outlet } from "react-router-dom";
import img1 from "../assets/img1.png";
import img2 from "../assets/img2.png";
import img3 from "../assets/img3.png";
import img4 from "../assets/img4.png";
const AuthLayout = () => {
  return (
    <section className="auth py-5 bg-white">
      <div className="container d-flex align-items-center justify-content-center position-relative h-100">
        <img
          src={img1}
          className="position-absolute top-0 start-0 mt-5"
          alt=""
        />
        <img
          src={img2}
          className="position-absolute bottom-0 start-0 mb-5 "
          alt=""
        />
        <img src={img3} className="position-absolute end-0 top-0 mt-5" alt="" />
        <img
          src={img4}
          className="position-absolute bottom-0 start-100 translate-middle-x"
          alt=""
        />
        <div className="row justify-content-center w-100">
          <Outlet />
        </div>
      </div>
    </section>
  );
};

export default AuthLayout;
