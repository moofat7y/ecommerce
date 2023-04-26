import React, { useState } from "react";
import { BsDot } from "react-icons/bs";
import { useNavigate, useParams } from "react-router-dom";
import LoadingBtn from "../../components/loading/LoadingBtn";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import { useForm } from "react-hook-form";
import { notifyError, notifySuccess } from "../../utils/helpers";
import api from "../../utils/api";
const ResetPassword = () => {
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
  const { token } = useParams();
  async function onSubmit(data) {
    setSubmitData((prev) => {
      return { ...prev, isLoading: true };
    });
    try {
      const res = await api.patch(`register/reset-password/${token}`, data);
      setSubmitData((prev) => {
        return { ...prev, isLoading: false };
      });
      reset();
      notifySuccess(res?.data?.message);
      navigate("/auth/signin");
    } catch (error) {
      notifyError(error?.response?.data?.message);
      navigate("/auth/forgot-password");

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
        <h2 className="fw-bold fs-1 mb-1">انشاء كلمة سر</h2>
        <span className="fs-6  text-secondary">
          <span className="">الرئيسيه</span>
          <BsDot className="fs-5" />
          <span>كلمة سر جديده</span>
        </span>
      </div>
      <div className="wrraper  bg-white w-100 ">
        <div className="text-center mb-4">
          <h3 className="semibold">انشاء كلمة سر</h3>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
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

          <LoadingBtn
            label="تعيين"
            bgcolor="btn-primary"
            loading={submitData.isLoading}
            extraClass="py-3 rounded-0 w-100"
          />
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
