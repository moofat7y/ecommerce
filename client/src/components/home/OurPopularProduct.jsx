import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../features/product/productSlice";
import Section from "../Section";
import ProductList from "../our-store/ProductList";
import Slider from "../slider/Slider";
import ProdItem from "../our-store/ProdItem";

const OurPopularProduct = () => {
  const { products, isLoading } = useSelector((state) => state.popularProd);

  const prod_list = products?.map((prod) => {
    return <ProdItem key={prod?._id} prod={prod} />;
  });
  return (
    <Section className="home-wrapper-6">
      <div className="row flex-column gap-3">
        <h5 className="fs-5 fw-bold text-capitalize">our popular product</h5>
        <div className="row mx-auto justify-content-between ">
          <div className="col-12 col-md-8 col-lg-2 px-1 py-2">
            <ul className="brand-filter w-100 h-fit-content d-flex flex-lg-column bg-white h-100 p-0 m-0 rounded-3 shadow-sm">
              <li
                className="w-100 p-3 d-flex gap-1 align-items-center justify-content-between shadow-sm"
                role="button"
              >
                <img
                  src="images/watch.jpg"
                  alt="..."
                  className="col-3 img-fluid"
                />
                <span className="text-muted fw-bold fs-7">smart watch</span>
              </li>
              <li
                className="w-100 p-3 d-flex gap-1 align-items-center justify-content-between shadow-sm"
                role="button"
              >
                <img
                  src="images/speaker.jpg"
                  alt="..."
                  className="col-3 img-fluid"
                />
                <span className="text-muted fw-bold fs-7">speaker</span>
              </li>
              <li
                className="w-100 p-3 d-flex gap-1 align-items-center justify-content-between shadow-sm"
                role="button"
              >
                <img
                  src="images/laptop.jpg"
                  alt="..."
                  className="col-3 img-fluid"
                />
                <span className="text-muted fw-bold fs-7">laptop</span>
              </li>
            </ul>
          </div>
          <div className="col-12 col-lg-10 px-1 py-2">
            <Slider>
              {isLoading ? (
                <>
                  <div className="col-12 col-sm-6 col-lg-4 col-xl-3  px-1 mb-2">
                    <div className="card shadow-sm border-0" aria-hidden="true">
                      <div className="ratio ratio-4x3">
                        <div className="card-img-top"></div>
                      </div>
                      <div className="card-body">
                        <h5 className="card-title placeholder-glow">
                          <span className="placeholder col-6"></span>
                        </h5>
                        <p className="card-text placeholder-glow">
                          <span className="placeholder col-7"></span>
                          <span className="placeholder col-4"></span>
                          <span className="placeholder col-4"></span>
                          <span className="placeholder col-6"></span>
                          <span className="placeholder col-8"></span>
                        </p>
                        <a className="btn btn-primary disabled placeholder col-6"></a>
                      </div>
                    </div>
                  </div>

                  <div className="col-12 col-sm-6 col-lg-4 col-xl-3  px-1 mb-2">
                    <div className="card shadow-sm border-0" aria-hidden="true">
                      <div className="ratio ratio-4x3">
                        <div className="card-img-top"></div>
                      </div>
                      <div className="card-body">
                        <h5 className="card-title placeholder-glow">
                          <span className="placeholder col-6"></span>
                        </h5>
                        <p className="card-text placeholder-glow">
                          <span className="placeholder col-7"></span>
                          <span className="placeholder col-4"></span>
                          <span className="placeholder col-4"></span>
                          <span className="placeholder col-6"></span>
                          <span className="placeholder col-8"></span>
                        </p>
                        <a className="btn btn-primary disabled placeholder col-6"></a>
                      </div>
                    </div>
                  </div>

                  <div className="col-12 col-sm-6 col-lg-4 col-xl-3  px-1 mb-2">
                    <div className="card shadow-sm border-0" aria-hidden="true">
                      <div className="ratio ratio-4x3">
                        <div className="card-img-top"></div>
                      </div>
                      <div className="card-body">
                        <h5 className="card-title placeholder-glow">
                          <span className="placeholder col-6"></span>
                        </h5>
                        <p className="card-text placeholder-glow">
                          <span className="placeholder col-7"></span>
                          <span className="placeholder col-4"></span>
                          <span className="placeholder col-4"></span>
                          <span className="placeholder col-6"></span>
                          <span className="placeholder col-8"></span>
                        </p>
                        <a className="btn btn-primary disabled placeholder col-6"></a>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                prod_list
              )}
            </Slider>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default OurPopularProduct;
