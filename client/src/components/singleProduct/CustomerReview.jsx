import React, { useState } from "react";
import { useForm } from "react-hook-form";
import LoadingBtn from "../loading/LoadingBtn";
import { notifyWarning } from "../../utils/helpers";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { rateProduct } from "../../features/product/singleProdSlice";
const CustomerReview = () => {
  const [reviewStar, setReviewStar] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { singleProd, auth } = useSelector((state) => state);

  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    if (!auth.token) {
      return navigate("/auth/signin");
    }
    if (!reviewStar) {
      return notifyWarning("يجب ادخال عدد النجوم");
    }
    setIsLoading(true);
    await dispatch(
      rateProduct({
        data: { ...data, prodId: singleProd?.product._id, stars: reviewStar },
      })
    );
    setIsLoading(false);
    setReviewStar(null);
    reset();
  };
  return (
    <div className="p-3 bg-white shadow-sm d-flex flex-column gap-1 shadow-sm">
      <h3 className="fs-6 fw-bold m-0">
        Customer Review <span className="text-muted">(you)</span>
      </h3>
      <ul className="d-flex justify-content-end">
        {Array.from({ length: 5 }, (ele, index) => {
          return (
            <li
              onClick={() => setReviewStar(index + 1)}
              key={index}
              className={`nav-link btn btn-light px-2 py-1 mx-2 ${
                reviewStar === index + 1 ? "active" : null
              }`}
            >
              {index + 1} نجوم
            </li>
          );
        })}
      </ul>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-input">
          <textarea
            {...register("comment")}
            type="text"
            className={`review-comment w-100 form-control shadow-sm p-2 ${
              errors.comment ? "is-invalid" : null
            }`}
            placeholder="write a review"
          />
          {errors.comment ? (
            <div className="invalid-feedback">{errors.comment.message}</div>
          ) : null}
        </div>

        <LoadingBtn
          loading={isLoading}
          label="تاكيد"
          bgcolor="btn-primary"
          extraClass="mt-2"
        />
      </form>
    </div>
  );
};

export default CustomerReview;
