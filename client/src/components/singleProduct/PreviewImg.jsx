import React, { useState } from "react";
import { useSelector } from "react-redux";
const PreviewImg = () => {
  const { product } = useSelector((state) => state.singleProd);
  const [previewImgSrc, setPreviewImgSrc] = useState(
    product?.images?.length > 0 ? product.images[0]?.secure_url : ""
  );
  const changePreviewImg = (e) => {
    setPreviewImgSrc(e.currentTarget.src);
  };
  return (
    <div className="col-12 col-md-6 col-xl-4 px-0 ps-1 py-2 d-flex gap-5 flex-column">
      <div className="preview-img perimeter">
        <div className="image">
          <img
            className="w-100 h-100"
            style={{ objectFit: "contain", maxHeight: "420px" }}
            src={previewImgSrc}
            alt="product-image"
          />
        </div>
      </div>
      <div className="images d-flex flex-wrap align-items-center justify-content-between gap-1">
        {product.images?.map((img) => {
          return (
            <img
              key={img.public_id}
              role="button"
              onClick={changePreviewImg}
              src={img?.secure_url}
              alt="..."
              className="col-5 shadow-sm"
            />
          );
        })}
      </div>
    </div>
  );
};

export default PreviewImg;
