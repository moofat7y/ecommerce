import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { BsDot } from "react-icons/bs";
import LoadingBtn from "../../components/loading/LoadingBtn";
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "../../features/user/userSlice";
const OrderConfirm = () => {
  const { state } = useLocation();
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  useEffect(() => {
    if (!state) {
      navigate("/");
      return;
    }
    if (user) {
      setValue("firstname", user?.firstname);
      setValue("lastname", user?.lastname);
      setValue("email", user?.email);
      setValue("mobile", user?.mobile);
    }
  }, []);

  const onSubmit = async (data) => {
    setIsLoading(true);
    await dispatch(createOrder({ data, navigate }));
    setIsLoading(false);
  };
  return (
    <div className="container">
      <div className="order-confirm py-4">
        <div className="py-3 text-center">
          <h2 className="fw-bold fs-1 mb-1">تاكيد الطلب</h2>
          <span className="fs-6  text-secondary">
            <span className="">الرئيسيه</span>
            <BsDot className="fs-5" />
            <span>تاكيد الطلب</span>
          </span>
        </div>
        <div className="wrraper  bg-white  mx-auto">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="input-group flex-nowrap  gap-3 mb-3">
              <div className="flex-grow-1">
                <input
                  {...register("firstname", {
                    required: "يجب ادخال الاسم الاول",
                    minLength: { value: 2, message: "الاسم الاول غير صالح" },
                  })}
                  type="text"
                  className={`form-control px-3 py-2 rounded-0 ${
                    errors.firstname ? "is-invalid" : ""
                  }`}
                  placeholder="الاسم الاول"
                />
                {errors.firstname ? (
                  <div className="invalid-feedback">
                    {errors.firstname.message}
                  </div>
                ) : null}
              </div>

              <div className="flex-grow-1">
                <input
                  {...register("lastname", {
                    required: "يجب ادخال الاسم الثاني",
                    minLength: { value: 2, message: "الاسم الثاني غير صالح" },
                    maxLength: { value: 10, message: "الاسم الثاني غير صالح" },
                  })}
                  type="text"
                  className={`form-control px-3 py-2 rounded-0 ${
                    errors.lastname ? "is-invalid" : ""
                  }`}
                  placeholder="الاسم الثاني"
                />
                {errors.lastname ? (
                  <div className="invalid-feedback">
                    {errors.lastname.message}
                  </div>
                ) : null}
              </div>
            </div>

            <div className="input-group mb-3">
              <input
                {...register("email", {
                  required: "يجب ادخال بريد الكتروني",
                  pattern: {
                    value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                    message: "الرجاء استخدام بريد إلكتروني صالح",
                  },
                })}
                type="text"
                className={`form-control px-3 py-2 rounded-0 ${
                  errors.email ? "is-invalid" : ""
                }`}
                placeholder="البريد الالكتروني"
              />
              {errors.email ? (
                <div className="invalid-feedback">{errors.email.message}</div>
              ) : null}
            </div>

            <div className="input-group mb-3">
              <input
                {...register("mobile", {
                  required: "يجب ادخال رقم الهاتف",
                  minLength: {
                    value: 11,
                    message: "الرجاء رقم هاتف صحيح",
                  },
                  maxLength: {
                    value: 16,
                    message: "الرجاء رقم هاتف صحيح",
                  },
                })}
                type="number"
                className={`form-control px-3 py-2 rounded-0 ${
                  errors.mobile ? "is-invalid" : ""
                }`}
                placeholder="الهاتف"
              />
              {errors.mobile ? (
                <div className="invalid-feedback">{errors.mobile.message}</div>
              ) : null}
            </div>

            <div className="input-group mb-3">
              <input
                {...register("city", {
                  required: "يجب ادخال اسم المدينه",
                })}
                type="text"
                className={`form-control px-3 py-2 rounded-0 ${
                  errors.city ? "is-invalid" : ""
                }`}
                placeholder="المدينه"
              />
              {errors.city ? (
                <div className="invalid-feedback">{errors.city.message}</div>
              ) : null}
            </div>

            <div className="input-group mb-3">
              <input
                {...register("streetname", {
                  required: "يجب ادخال اسم الشارع",
                })}
                type="text"
                className={`form-control px-3 py-2 rounded-0 ${
                  errors.streetname ? "is-invalid" : ""
                }`}
                placeholder="الشارع"
              />
              {errors.streetname ? (
                <div className="invalid-feedback">
                  {errors.streetname.message}
                </div>
              ) : null}
            </div>

            <div className="input-group flex-nowrap  gap-3 mb-3">
              <div className="flex-grow-1">
                <input
                  {...register("buildingname", {
                    required: "رقم او اسم المبني",
                  })}
                  type="text"
                  className={`form-control px-3 py-2 rounded-0 ${
                    errors.buildingname ? "is-invalid" : ""
                  }`}
                  placeholder="اسم او رقم المبني"
                />
                {errors.buildingname ? (
                  <div className="invalid-feedback">
                    {errors.buildingname.message}
                  </div>
                ) : null}
              </div>

              <div className="flex-grow-1">
                <input
                  {...register("floor", {
                    required: "يجب ادخال رقم الطابق",
                  })}
                  type="text"
                  className={`form-control px-3 py-2 rounded-0 ${
                    errors.floor ? "is-invalid" : ""
                  }`}
                  placeholder="رقم الطابق"
                />
                {errors.floor ? (
                  <div className="invalid-feedback">{errors.floor.message}</div>
                ) : null}
              </div>
            </div>
            <LoadingBtn
              label="تاكيد"
              bgcolor="btn-primary"
              loading={isLoading}
              extraClass="py-3 rounded-0 w-100"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirm;
