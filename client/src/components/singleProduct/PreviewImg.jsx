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
    <div className="col-12 position-relative col-md-6 col-xl-4 d-flex gap-2 flex-column">
      <div className="preview-img perimeter">
        <div className="image">
          <img
            className="w-100 h-100"
            style={{ objectFit: "cover", maxHeight: "420px" }}
            src={previewImgSrc}
            loading="lazy"
            alt="product-image"
          />
        </div>
      </div>
      <div
        style={{ top: "10px", right: "10px" }}
        className="images position-absolute d-flex flex-column gap-2"
      >
        {product.images?.map((img) => {
          return (
            <img
              style={{ width: "20%", objectFit: "cover" }}
              key={img.public_id}
              role="button"
              onClick={changePreviewImg}
              src={img?.secure_url}
              alt="..."
              loading="lazy"
              className="ratio ratio-1x1 rounded-3 shadow-sm"
            />
          );
        })}
      </div>
    </div>
  );
};

export default PreviewImg;
