import React, { useEffect } from "react";
import { BsDot } from "react-icons/all";
import Section from "../../components/Section";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import MainSection from "../../components/singleProduct/MainSection";
import CustomerReview from "../../components/singleProduct/CustomerReview";
import { getProduct } from "../../features/product/singleProdSlice";
import Loading from "../../components/loading/Loading";
import ReviewList from "../../components/singleProduct/ReviewList";

const SingleProduct = () => {
  const { prodId } = useParams();
  const dispatch = useDispatch();

  const { product, isLoading } = useSelector((state) => state.singleProd);
  useEffect(() => {
    if (prodId) {
      dispatch(getProduct({ prodId }));
    }
  }, [prodId]);

  return (
    <>
      {isLoading ? (
        <div className="w-100 vh-100 d-flex align-items-center justify-content-center">
          <Loading />
        </div>
      ) : (
        <>
          <header className="bg-white d-flex justify-content-center py-4">
            <span className="fs-6  text-secondary">
              <span className="">الرئيسيه</span>
              <BsDot className="fs-5" />
              <span>المنتج</span>
            </span>
          </header>
          <MainSection />
          <Section className="single-product-wrapper-2">
            <div className="row flex-column gap-3">
              <h2 className="fw-bolder-fs-3">Description</h2>
              <p className="p-3 bg-white shadow-sm">{product.description}</p>
            </div>
          </Section>
          <Section className="single-product-wrapper-3">
            <div className="row flex-column gap-3">
              <h2 className="fw-bolder-fs-3">Review</h2>
              <div className="review-box bg-white shadow-sm p-3 d-flex flex-column gap-2">
                <CustomerReview />
                <ReviewList />
              </div>
            </div>
          </Section>
        </>
      )}
    </>
  );
};

export default SingleProduct;
