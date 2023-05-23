import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import BtnLoading from "../../components/loading/BtnLoading";
import { useSelector } from "react-redux";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import { useDispatch } from "react-redux";
import { login } from "../../features/auth/authSlice";
const SignIn = () => {
  const [passwordShow, setPasswordShow] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { isLoading } = useSelector((state) => state.auth);
  const onSubmit = (data) => {
    dispatch(login({ user: data, navigate }));
  };
  return (
    <div className="form w-50 d-flex flex-column">
      <h3 className="text-center mb-4">
        <span className="text-primary fw-bold fs-1">A</span>
        dmin Dashboard
      </h3>
      <h4 className="mb-2">Welcome, Back!</h4>
      <p className="fs-7 lh-sm">
        Please enter your email and password to enter to your dashboard.
      </p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="input-group mb-3">
          <input
            {...register("email", {
              required: "Email required",
              pattern: {
                value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                message: "Please enter a valid email",
              },
            })}
            type="text"
            className={`form-control px-3 py-2 rounded-3 ${
              errors.email ? "is-invalid" : ""
            }`}
            placeholder="Email"
          />
          {errors.email ? (
            <div className="invalid-feedback">{errors.email.message}</div>
          ) : null}
        </div>

        <div className=" form-group">
          <div className=" position-relative">
            <input
              {...register("password", {
                required: "Password required",
              })}
              type={`${passwordShow ? "text" : "password"}`}
              name="password"
              className={`form-control rounded-3 px-3 py-2 ${
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
        <Link className="mb-3 mt-2 d-inline-block" to="/forgot-password">
          Forgot your password?
        </Link>
        <BtnLoading
          label="Login"
          bgcolor="btn-primary"
          loading={isLoading}
          extraClass="py-2  w-100"
        />
      </form>
    </div>
  );
};

export default SignIn;
