import React from "react";
import Loading from "../../components/Loading";

const LoadingPage = () => {
  return (
    <div className="vh-100 bg-white w-100 position-fixed top-0 start-0 d-flex align-items-center justify-content-center">
      <Loading />
    </div>
  );
};

export default LoadingPage;
