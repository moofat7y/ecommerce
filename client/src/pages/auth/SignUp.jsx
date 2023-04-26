import React, { useState } from "react";
import { BsDot } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import LoadingBtn from "../../components/loading/LoadingBtn";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import { useForm } from "react-hook-form";
import { notifyError, notifySuccess } from "../../utils/helpers";
import api from "../../utils/api";
const SignUp = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [passwordShow, setPasswordShow] = useState(false);
  const [confirmPasswordShow, setConfirmPasswordShow] = useState(false);
  const [submitData, setSubmitData] = useState({
    isLoading: false,
    isSuccess: false,
    isError: null,
  });

  async function onSubmit(data) {
    setSubmitData((prev) => {
      return { ...prev, isLoading: true };
    });
    try {
      const res = await api.put("register/signup", data);
      setSubmitData((prev) => {
        return { ...prev, isLoading: false };
      });
      reset();
      notifySuccess(res?.data?.message);
      navigate("/auth/signin");
    } catch (error) {
      notifyError(error?.response?.data?.message);
      setSubmitData((prev) => {
        return {
          ...prev,
          isLoading: false,
          isError: error?.response?.data?.message,
        };
      });
    }
  }
  return (
    <div className="signup col-xl-6 col-lg-8 ">
      <div className="py-5 text-center">
        <h2 className="fw-bold fs-1 mb-1">التسجيل الان</h2>
        <span className="fs-6  text-secondary">
          <span className="">الرئيسيه</span>
          <BsDot className="fs-5" />
          <span>انشاء</span>
        </span>
      </div>
      <div className="wrraper  bg-white w-100 ">
        <div className="text-center">
          <h3 className="semibold">انشاء حساب</h3>
          <p>
            هل لديك حساب بالفعل؟
            <Link to="/auth/signin" className="mx-1">
              تسجيل الدخول
            </Link>
          </p>
        </div>
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

          <div className="mb-3 form-group">
            <div className=" position-relative">
              <input
                {...register("password", {
                  required: "يجب ادخال كلمة مرور",
                  pattern: {
                    value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&]/,
                    message:
                      "يجب ان تتكون كلمة المرور من 6 احرف علي الاقل وتحتوي علي حرف كبير وحرف صغير",
                  },
                  minLength: {
                    value: 6,
                    message:
                      "يجب ان تتكون كلمة المرور من 6 احرف علي الاقل وتحتوي علي حرف كبير وحرف صغير",
                  },
                })}
                type={`${passwordShow ? "text" : "password"}`}
                name="password"
                className={`form-control px-3 py-2 rounded-0 ${
                  errors.password ? "is-invalid" : ""
                }`}
                placeholder="كلمة المرور"
              />
              <div
                onClick={() => setPasswordShow((prev) => !prev)}
                role="button"
                className="password-switch position-absolute top-50 end-0 translate-middle"
              >
                {passwordShow ? (
                  <VscEyeClosed className="fs-6" />
                ) : (
                  <VscEye className="fs-6" />
                )}
              </div>
            </div>
            {errors.password ? (
              <div className="invalid-feedback d-block">
                {errors.password.message}
              </div>
            ) : null}
          </div>

          <div className="mb-3 ">
            <div className="position-relative">
              <input
                type={`${confirmPasswordShow ? "text" : "password"}`}
                name="confirmPassword"
                className={`form-control px-3 py-2 rounded-0 ${
                  errors.confirmPassword ? "is-invalid" : ""
                }`}
                placeholder="تاكيد كلمة المرور"
                {...register("confirmPassword", {
                  required: true,
                  validate: (value) => {
                    if (watch("password") !== value) {
                      return "يجب انا يتطابق كلا من كلمتي المرور";
                    }
                  },
                })}
              />
              <div
                onClick={() => setConfirmPasswordShow((prev) => !prev)}
                role="button"
                className="password-switch position-absolute top-50 end-0 translate-middle"
              >
                {confirmPasswordShow ? (
                  <VscEyeClosed className="fs-6" />
                ) : (
                  <VscEye className="fs-6" />
                )}
              </div>
            </div>
            {errors.confirmPassword ? (
              <div className="invalid-feedback d-block">
                يجب انا يتطابق كلا من كلمتي المرور
              </div>
            ) : null}
          </div>

          <p className="text-secondary fs-7">
            بتسجيلك حساب جديد فإنك توافق على شروط الاستخدام والبيع واشعار
            الخصوصية.
          </p>

          <LoadingBtn
            label="انشاء حساب"
            bgcolor="btn-primary"
            loading={submitData.isLoading}
            extraClass="py-3 rounded-0 w-100"
          />
        </form>
      </div>
    </div>
  );
};

export default SignUp;
