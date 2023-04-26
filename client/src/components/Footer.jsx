import React from "react";
import { Link } from "react-router-dom";
import {
  BsFillTelephoneFill,
  MdEmail,
  IoLocationSharp,
  FaFacebookF,
  BsWhatsapp,
  BsInstagram,
} from "react-icons/all";

const Footer = () => {
  return (
    <footer className="py-5 bg-dark">
      <div className="container">
        <div className="row justify-content-between">
          <div className="col-12 col-md-6 col-lg-4 p-3">
            <a
              className="navbar-brand order-2 order-md-1 mx-0 text-white fs-1 fw-bolder mb-3"
              href="#"
            >
              E-Commerce
            </a>
            <p className="text-white-50 mb-3 fs-7">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores
              odit porro officiis, sint sit voluptatibus commodi animi eveniet,
              fuga aspernatur beatae delectus pariatur, mollitia atque quis.
              Eaque quam placeat perferendis{" "}
            </p>
            <div className="w-100 d-flex">
              <img
                className="img-fluid"
                src="images/payments-methods.png"
                alt="..."
              />
            </div>
          </div>
          <div className="col-12 col-md-3 col-lg-3 p-3">
            <h6 className="text-capitalize text-white fw-bolder mb-3">
              my account
            </h6>
            <ul className="w-100 d-flex gap-3 flex-column p-0 m-0">
              <li className="text-capitalize">
                <Link className="nav-link text-white-50 fs-7">my product</Link>
              </li>
              <li className="text-capitalize">
                <Link className="nav-link text-white-50 fs-7">my order</Link>
              </li>
              <li className="text-capitalize">
                <Link className="nav-link text-white-50 fs-7">my address</Link>
              </li>
              <li className="text-capitalize">
                <Link className="nav-link text-white-50 fs-7">
                  my personal account
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-12 col-md-6 col-lg-4 p-3">
            <h6 className="text-capitalize text-white fw-bolder mb-3">
              contact us
            </h6>
            <ul className="w-100 d-flex gap-3 flex-column p-0 m-0">
              <li className="nav-link d-flex align-items-center text-capitalize text-white-50">
                <IoLocationSharp className="ms-3 text-white fs-6" />
                <span className="fs-7">123 Main Street, Anytown, CA 12345</span>
              </li>
              <li className=" text-capitalize">
                <Link className="nav-link d-flex align-items-center text-white-50">
                  <BsFillTelephoneFill className="ms-3 text-white fs-6" />
                  <span className="fs-7">+20 1005623453</span>
                </Link>
              </li>
              <li className=" text-capitalize">
                <Link className="nav-link d-flex align-items-center text-white-50">
                  <MdEmail className="ms-3 text-white fs-6" />
                  <span className="fs-7">example12@gmail.com</span>
                </Link>
              </li>
            </ul>
          </div>
          <hr className="text-muted my-4" />
          <div className="w-fit-content d-flex align-items-center gap-3 mx-auto">
            <Link className="nav-link fs-5 text-white">
              <FaFacebookF />
            </Link>
            <Link className="nav-link fs-5 text-white">
              <BsWhatsapp />
            </Link>
            <Link className="nav-link fs-5 text-white">
              <BsInstagram />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
