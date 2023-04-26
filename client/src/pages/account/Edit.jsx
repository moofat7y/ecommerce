import React, { useEffect, useState } from "react";
import { BsDot } from "react-icons/bs";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import LoadingBtn from "../../components/loading/LoadingBtn";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import api from "../../utils/api";
import { notifyError, notifySuccess } from "../../utils/helpers";
import { useDispatch } from "react-redux";
import { updateUser } from "../../features/auth/authSlice";
const Edit = () => {
  const [passwordShow, setPasswordShow] = useState(false);
  const [confirmPasswordShow, setConfirmPasswordShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { state } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  useEffect(() => {
    if (!state) {
      return navigate("/");
    }
  }, [state]);

  const onSubmit = async (data) => {
    setIsLoading(true);
    if (state.data === "password") {
      try {
        const response = await api.patch("user/password", data);
        setIsLoading(false);
        notifySuccess(response.data.message);
        navigate("/");
      } catch (error) {
        setIsLoading(false);
        notifyError(error.response.data.message);
      }
    } else {
      await dispatch(updateUser({ data }));
      setIsLoading(false);
      navigate("/");
    }
  };

  return (
    <>
      <header className="bg-white d-flex justify-content-center py-4">
        <span className="fs-6  text-secondary">
          <span className="">الرئيسيه</span>
          <BsDot className="fs-5" />
          <span>حسابي</span>
        </span>
      </header>
      <div className="container">
        <div className=" d-flex py-5 justify-content-center align-items-center">
          <form
            style={{ minWidth: "360px", width: "30%" }}
            className="  shadow bg-white  px-4 py-3 rounded-3"
            onSubmit={handleSubmit(onSubmit)}
          >
            <p className="fs-5 fw-bold"> تغيير {state.label}</p>
            {state.data === "password" ? null : (
              <p className="fs-7 mb-0"> {state.label} الحالي : </p>
            )}
            <p className="fs-7">{state.userData}</p>
            <p className="fs-7">{state.text}</p>
            {state.inputs.map((input) => {
              return (
                <div key={input.data} className="form-group mb-2">
                  <label className="form-label">{input.label}</label>
                  <input
                    className={`form-control px-2 ${
                      errors[input.data] ? "is-invalid" : ""
                    }`}
                    {...register(input.data, {
                      required: ` يجب ادخال ${input.label}`,
                    })}
                    type={input.type}
                  />
                  {errors[input.data] ? (
                    <div className="invalid-feedback">
                      {errors[input.data].message}
                    </div>
                  ) : null}
                </div>
              );
            })}
            {state.data === "password" ? (
              <>
                <div className="mb-2 form-group">
                  <label className="form-label">كلمة المرور الجديده</label>
                  <div className=" position-relative">
                    <input
                      {...register("password", {
                        required: "يجب ادخال كلمة مرور",
                        pattern: {
                          value:
                            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&]/,
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
                      className={`form-control px-2 ${
                        errors.password ? "is-invalid" : ""
                      }`}
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

                <div className="mb-2 ">
                  <label className="form-label">تاكيد كلمة المرور</label>
                  <div className="position-relative">
                    <input
                      type={`${confirmPasswordShow ? "text" : "password"}`}
                      name="confirmPassword"
                      className={`form-control px-2  ${
                        errors.confirmPassword ? "is-invalid" : ""
                      }`}
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
              </>
            ) : null}
            <LoadingBtn
              loading={isLoading}
              label="تعديل"
              bgcolor="btn-outline-primary"
              extraClass="w-100 mt-3"
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default Edit;
