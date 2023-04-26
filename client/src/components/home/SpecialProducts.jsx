import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getProducts } from "../../features/product/productSlice";
import Section from "../Section";
import ProductList from "../our-store/ProductList";

const SpecialProducts = () => {
  const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(getProducts({ query: null }));
  // }, []);

  return (
    <Section className="home-wrapper-4">
      <div className="row flex-column gap-3">
        <h5 className="fs-5 fw-bold text-capitalize">special product</h5>
        <ProductList />
      </div>
    </Section>
  );
};

export default SpecialProducts;
