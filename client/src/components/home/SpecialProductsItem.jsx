import React from "react";
import { AiOutlineHeart } from "react-icons/ai";
import Star from "../../pages/our-store/Star";
const SpecialProductsItem = ({ SpecialProduct }) => {
  return (
    <div className="col-4 rounded-3 d-flex p-2 shadow-sm bg-white">
      <div className="col-6 h-100 position-relative d-flex flex-column justify-content-center align-content-between">
        <div className="mainPreview">
          <img src={SpecialProduct?.images[0]} alt="" className="img-fluid" />
        </div>
        <div className="images d-flex justify-content-between align-items-center">
          {SpecialProduct?.images.map((img, i) => (
            <img
              key={i}
              src={img}
              alt=""
              className="shadow-sm img-fluid col-5"
            />
          ))}
        </div>
        <div className="w-100 position-absolute top-0 d-flex justify-content-between">
          {SpecialProduct?.discount?.copoun && (
            <span className="bg-danger text-dark rounded-pill px-2 py-1 fs-9">
              {SpecialProduct?.discount?.percent}
            </span>
          )}
          <div role="button" className="icon d-flex fs-5">
            <AiOutlineHeart />
          </div>
        </div>
      </div>
      <div className="col-6 h-100 p-3 d-flex flex-column">
        <span className="brand fs-8">{SpecialProduct?.brand}</span>
        <h6 className="fs-7 fw-bold">{SpecialProduct?.title}</h6>
        <Star
          stars={SpecialProduct?.totalrating}
          reviews={SpecialProduct?.ratings}
        />
      </div>
    </div>
  );
};

export default SpecialProductsItem;
