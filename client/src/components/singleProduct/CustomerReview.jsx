import React, { useState } from "react";
import { useForm } from "react-hook-form";
import LoadingBtn from "../loading/LoadingBtn";
import { notifyWarning } from "../../utils/helpers";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { rateProduct } from "../../features/product/singleProdSlice";
import { BsStarFill } from "react-icons/bs";
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
    <div className="p-3 bg-white  d-flex flex-column gap-1 ">
      <ul className="d-flex flex-wrap gap-2 px-0 justify-content-end">
        {Array.from({ length: 5 }, (ele, index) => {
          const stars = Array.from({ length: index + 1 }, (star, i) => {
            return (
              <BsStarFill key={i + "star"} className="fs-6 text-warning" />
            );
          });
          return (
            <li
              onClick={() => setReviewStar(index + 1)}
              key={index}
              className={`nav-link shadow-sm d-flex align-items-center gap-1 btn btn-light px-2 py-1  ${
                reviewStar === index + 1 ? "active" : null
              }`}
            >
              {stars}
            </li>
          );
        })}
      </ul>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-input">
          <textarea
            {...register("comment")}
            type="text"
            className={`review-comment w-100 form-control p-2 ${
              errors.comment ? "is-invalid" : null
            }`}
            placeholder="اكتب تعليقك"
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
