import React from "react";

const SmallPannerItem = ({ smallPanner }) => {
  return (
    <div className="col-12 col-sm-6 p-2 d-flex justify-content-end align-items-center align-items-sm-start small-banner position-relative">
      <img
        src={smallPanner.img}
        className="img-fluid w-100 rounded-3"
        alt="main banner"
      />
      <div className="small-banner-content position-absolute p-3 text-start">
        <span className="text-danger fs-9 text-uppercase d-block mb-2">
          {smallPanner.smallTitle}
        </span>
        <h2 className="fs-5 fs-sm-6 fw-bold text-capitalize mb-2">
          <Link to={smallPanner.bigTitle.link} className="nav-link">
            {smallPanner.bigTitle.text}
          </Link>
        </h2>
        <p className="fs-sm-8">{smallPanner.description}</p>
      </div>
    </div>
  );
};

export default SmallPannerItem;
