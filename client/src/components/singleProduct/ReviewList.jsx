import React from "react";
import { useSelector } from "react-redux";
import Star from "../our-store/Star";

const ReviewList = () => {
  const { product } = useSelector((state) => state.singleProd);

  const review_list = product?.ratings?.map((review) => {
    const date = new Date(review.createdAt);

    return (
      <div
        key={review.postedBy._id}
        className="p-3 bg-light shadow-sm d-flex flex-column gap-1 shadow-sm"
      >
        <div className="d-flex align-items-center gap-3">
          <h3 className="fs-6 fw-bold m-0">
            {review.postedBy.firstname} {review.postedBy.lastname}
          </h3>
          <span className="review-history text-muted fw-bold fs-8">
            {date.toDateString()}
          </span>
        </div>
        <div className="d-flex align-items-center justify-content-between">
          <p className="review-description mb-0">{review.comment}</p>
          <Star stars={review.stars} />
        </div>
      </div>
    );
  });
  return <div className="reviews d-flex flex-column gap-3">{review_list}</div>;
};

export default ReviewList;
