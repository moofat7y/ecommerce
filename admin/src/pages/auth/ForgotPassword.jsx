import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import api from "../../utils/api";
import { notifyError, notifySuccess } from "../../utils/helpers";
import BtnLoading from "../../components/loading/BtnLoading";
const ForgotPassword = () => {
  const [isLoading, setIsloading] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (email) => {
    try {
      setIsloading(true);
      const response = await api.post("register/forgot-password", email);
      setIsloading(false);
      navigate("/");
      notifySuccess(response.data.message);
    } catch (error) {
      setIsloading(false);
      notifyError(error.response.data.message);
    }
  };
  return (
    <div className="form w-50 d-flex flex-column">
      <h3 className="text-center mb-4">
        <span className="text-primary fw-bold fs-1">A</span>
        dmin Dashboard
      </h3>
      <h4 className="mb-2">Forgot your password!!</h4>
      <p className="fs-7 lh-sm">
        Please enter your email to reset your password.
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

        <Link className="mb-3 mt-2 d-inline-block" to="/">
          Back to login?
        </Link>
        <BtnLoading
          label="Submit"
          bgcolor="btn-primary"
          loading={isLoading}
          extraClass="py-2  w-100"
        />
      </form>
    </div>
  );
};

export default ForgotPassword;
