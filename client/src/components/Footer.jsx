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
import Logo from "../assets/logo2.png";
const Footer = () => {
  return (
    <footer className="py-5 bg-dark">
      <div className="container pb-5">
        <div className="row justify-content-between">
          <div className="col-12  col-lg-4 p-3 pt-0">
            <a
              className="navbar-brand order-2 order-md-1 mx-0 text-white fs-1 fw-bolder d-inline-block mb-3"
              href="#"
            >
              <img
                style={{ width: "calc(3rem + 3.5vw)", objectFit: "cover" }}
                src={Logo}
                alt=""
              />
            </a>
            <p className="text-white-50 mb-3 fs-7">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores
              odit porro officiis, sint sit voluptatibus commodi animi eveniet,
              fuga aspernatur beatae delectus pariatur, mollitia atque quis.
              Eaque quam placeat perferendis{" "}
            </p>
          </div>
          <div className="col-12 col-md-3 col-lg-3 p-3">
            <h6 className="text-capitalize text-white fw-bolder mb-3">
              روابط سريعة
            </h6>
            <ul className="w-100 d-flex gap-3 flex-column p-0 m-0">
              <li className="text-capitalize">
                <Link to="/" className="nav-link text-white-50 fs-7">
                  الرئيسيه
                </Link>
              </li>
              <li className="text-capitalize">
                <Link to="ourstore" className="nav-link text-white-50 fs-7">
                  المتجر
                </Link>
              </li>
              <li className="text-capitalize">
                <Link to="contact-us" className="nav-link text-white-50 fs-7">
                  تواصل معنا
                </Link>
              </li>
              <li className="text-capitalize">
                <Link to="cart" className="nav-link text-white-50 fs-7">
                  عربة التسوق
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-12 col-md-6 col-lg-4 p-3">
            <h6 className="text-capitalize text-white fw-bolder mb-3">
              تواصل معنا
            </h6>
            <ul className="w-100 d-flex gap-3 flex-column p-0 m-0">
              <li className="nav-link d-flex align-items-center text-capitalize text-white-50">
                <IoLocationSharp className="ms-3 text-white fs-6" />
                <span className="fs-7">123 Main Street, Anytown, CA 12345</span>
              </li>
              <li className=" text-capitalize">
                <a
                  href="tel:201028401545"
                  className="nav-link d-flex align-items-center text-white-50"
                >
                  <BsFillTelephoneFill className="ms-3 text-white fs-6" />
                  <span className="fs-7">+201028401545</span>
                </a>
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
            <a
              href="https://web.facebook.com/MEDODODO1000?mibextid=ZbWKwL&_rdc=1&_rdr"
              target="_blank"
              className="nav-link fs-5 text-white"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://api.whatsapp.com/send?phone=+201028401545&text=hello"
              target="_blank"
              className="nav-link fs-5 text-white"
            >
              <BsWhatsapp />
            </a>
            <a
              href="https://www.instagram.com/mamdouhgonem/?igshid=NTc4MTIwNjQ2YQ=="
              target="_blank"
              className="nav-link fs-5 text-white"
            >
              <BsInstagram />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
