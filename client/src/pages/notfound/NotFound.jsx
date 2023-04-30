import React from "react";
import Lottie from "lottie-react";
import notFound from "../../animations/LAMASSU 404.json";

const NotFound = () => {
  return (
    <div
      className="not-found d-flex align-items-center justify-content-center"
      style={{ height: "80vh" }}
    >
      <Lottie className="w-100 h-100" animationData={notFound} />
    </div>
  );
};

export default NotFound;
