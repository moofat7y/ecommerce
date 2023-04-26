import React from "react";
import { BsStar, BsStarHalf, BsStarFill } from "react-icons/bs";
const Star = ({ stars, reviews }) => {
  const ratings = Array.from({ length: 5 }, (elem, index) => {
    let number = index + 0.5;
    return (
      <span key={index}>
        {stars >= index + 1 ? (
          <BsStarFill className="text-warning" />
        ) : stars >= number ? (
          <BsStarHalf className="text-warning" />
        ) : (
          <BsStar className="text-warning" />
        )}
      </span>
    );
  });
  return (
    <div className="d-flex align-items-center" dir="ltr">
      {ratings}
      {reviews ? <span className="mx-1">({reviews.length})</span> : null}
    </div>
  );
};

export default Star;
