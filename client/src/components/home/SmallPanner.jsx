// react modules
import React from "react";
import { useSelector } from "react-redux";
// componentes
import SmallPannerItem from "./SmallPannerItem";

const SmallPanner = () => {
  const { smallPanner, isLoading, isError } = useSelector(
    (state) => state.smallPanner
  );
  return (
    <div className="col-12 col-lg-6 p-3 pt-0 pt-lg-3 pe-lg-0 d-flex flex-wrap justify-content-center align-items-center">
      {isLoading &&
        smallPanner.map((smallPanner) => (
          <SmallPannerItem key={smallPanner.id} smallPanner={smallPanner} />
        ))}
    </div>
  );
};

export default SmallPanner;
