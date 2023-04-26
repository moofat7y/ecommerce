import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../../utils/api";
import Loading from "../../components/loading/Loading";

const ConfirmEmail = () => {
  const { token } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);
  const [isSuccess, setIsSuccess] = useState(null);
  useEffect(() => {
    const confirmEmail = async () => {
      try {
        setIsError(null);
        setIsSuccess(null);
        setIsLoading(true);
        const res = await api.post(`/register/confirm-email/${token}`);
        setIsLoading(false);
        setIsSuccess(res.data.message);
      } catch (error) {
        setIsLoading(false);
        setIsError(error?.response?.data.message);
      }
    };
    if (token) {
      confirmEmail();
    }
  }, [token]);

  return (
    <div className="confirm-email d-flex flex-column align-items-center justify-content-center vh-100 text-center">
      <h1>E-commerce</h1>
      <div className="d-flex py-5 my-4 justify-content-center">
        <Loading />
      </div>
      <div className="mt-5">
        {isLoading ? <span>...الرجاء الانتظار</span> : null}
        {isError ? (
          <div className="text-danger fw-semibold fs-5">{isError}</div>
        ) : null}
        {isSuccess ? (
          <>
            <div className="mb-2 fw-semibold fs-5">{isSuccess}</div>
            <Link className="btn btn-primary" to="/auth/signin">
              تسجيل الدخول
            </Link>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default ConfirmEmail;
