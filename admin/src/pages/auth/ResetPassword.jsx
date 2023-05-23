import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../utils/api";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import { notifyError, notifySuccess } from "../../utils/helpers";
import BtnLoading from "../../components/loading/BtnLoading";
const ResetPassword = () => {
  const [isLoading, setIsloading] = useState(false);
  const [passwordShow, setPasswordShow] = useState(false);
  const [confirmPasswordShow, setConfirmPasswordShow] = useState(false);
  const navigate = useNavigate();
  const { token } = useParams();
  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setIsloading(true);
      const response = await api.patch(
        `register/reset-password/${token}`,
        data
      );
      setIsloading(false);
      notifySuccess(response.data.message);
      navigate("/");
    } catch (error) {
      setIsloading(false);
      notifyError(error?.response?.data?.message);
      navigate("/forgot-password");
    }
  };
  return (
    <div className="form w-50 d-flex flex-column">
      <h3 className="text-center mb-4">
        <span className="text-primary fw-bold fs-1">A</span>
        dmin Dashboard
      </h3>
      <h4 className="mb-2">Reset your password!!</h4>
      <p className="fs-7 lh-sm">
        Please enter your email to reset your password.
      </p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3 form-group">
          <div className=" position-relative">
            <input
              {...register("password", {
                required: "Password required",
                pattern: {
                  value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&]/,
                  message:
                    "Password should be combination of one uppercase , one lower case, one special char, one digit and min 6 , max 20 char long",
                },
                minLength: {
                  value: 6,
                  message:
                    "Password should be combination of one uppercase , one lower case, one special char, one digit and min 6 , max 20 char long",
                },
              })}
              type={`${passwordShow ? "text" : "password"}`}
              name="password"
              className={`form-control px-3 py-2 rounded-3 ${
                errors.password ? "is-invalid" : ""
              }`}
              placeholder="Password"
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
              className={`form-control px-3 py-2 rounded-3 ${
                errors.confirmPassword ? "is-invalid" : ""
              }`}
              placeholder="Confirm password"
              {...register("confirmPassword", {
                required: true,
                validate: (value) => {
                  if (watch("password") !== value) {
                    return "Password do not match";
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
              Password do not match
            </div>
          ) : null}
        </div>

        <BtnLoading
          label="Confirm"
          bgcolor="btn-primary"
          loading={isLoading}
          extraClass="py-2  w-100"
        />
      </form>
    </div>
  );
};

export default ResetPassword;
