import React from "react";
import Star from "../our-store/Star";

const PrevCustomerReview = () => {
  return (
    <div className="p-3 bg-white shadow-sm d-flex flex-column gap-1 shadow-sm">
      <Star stars={2.5} reviews={3} />
      <span className="fs-6 fw-bold">good</span>
      <div className="d-flex align-items-center gap-3">
        <h3 className="fs-6 fw-bold m-0">Mohamed Fathy</h3>
        <span className="review-history text-muted fw-bold fs-8">
          On Aug 2023
        </span>
      </div>
      <p className="review-description">it is a good product</p>
    </div>
  );
};

export default PrevCustomerReview;
