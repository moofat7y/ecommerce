import React from "react";
import { useSelector } from "react-redux";
import Loading from "../loading/Loading";

const LoadingCont = () => {
  const { statusLoading } = useSelector((state) => state.auth);
  return (
    <>
      {statusLoading ? (
        <div
          style={{ zIndex: 1000 }}
          className="position-fixed bg-white w-100 h-100 top-0 start-0 d-flex align-items-center justify-content-center"
        >
          <Loading />
        </div>
      ) : null}
    </>
  );
};

export default LoadingCont;
