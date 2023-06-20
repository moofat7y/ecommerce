import React, { useState } from "react";
import Section from "../Section";
import Star from "../our-store/Star";
import { BiLink, CiDeliveryTruck } from "react-icons/all";
import PreviewImg from "./PreviewImg";
import { useDispatch, useSelector } from "react-redux";
import { notifyError } from "../../utils/helpers";
import ProdWishlist from "./ProdWishlist";
import { addToCart } from "../../features/user/userSlice";

const MainSection = () => {
  const [prodSize, setProdSize] = useState("");
  const [prodColor, setProdColor] = useState("");
  const dispatch = useDispatch();
  const { singleProd } = useSelector((state) => state);
  const { product } = singleProd;

  const onAdd = () => {
    if (product?.size?.length > 0 && !prodSize) {
      return notifyError("Size is required");
    }

    if (product?.colors?.length > 0 && !prodColor) {
      return notifyError("Color is required");
    }

    dispatch(addToCart({ product: product, color: prodColor, size: prodSize }));
  };
  return (
    <Section className="single-product-wrapper-1 bg-light">
      <div className="row">
        <PreviewImg />
        <div className="col-12 col-md-6 px-0 pe-1 py-2 d-flex flex-column gap-3">
          <h1 className="fs-6 fw-bolder text-dark">{product.title}</h1>
          <Star
            stars={product?.totalrating || 0}
            reviews={product.ratings || []}
          />
          <span className="price">
            <span className="fw-bold ms-2">السعر : </span>
            <span className="text-muted">{product.price} جنيه </span>
          </span>
          <span className="type">
            <span className="fw-bold ms-2">النوع : </span>
            <span className="text-muted">{product.category}</span>
          </span>
          <span className="brand">
            <span className="fw-bold ms-2">ماركة : </span>
            <span className="text-muted">{product.brand}</span>
          </span>
          <span className="categories">
            <span className="fw-bold ms-2">الفئه : </span>
            <span className="text-muted">{product.category}</span>
          </span>
          {product.tag ? (
            <span className="tags">
              <span className="fw-bold ms-2">العلامه : </span>
              <span className="text-muted">{product.tag}</span>
            </span>
          ) : null}
          <span className="availability">
            <span className="fw-bold ms-2">التوفر : </span>
            {product.quantity > 0 ? (
              <span className="text-muted">{product.quantity} في المخزون</span>
            ) : (
              <span className="text-danger">Out of stock</span>
            )}
          </span>
          <span className="sold">
            <span className="fw-bold ms-2">مُباع : </span>
            <span className="text-muted">{product.sold} بيع</span>
          </span>
          {product.size ? (
            <ul className="p-0 d-flex gap-1 mb-0 sizes">
              {product.size.map((size, index) => {
                return (
                  <li
                    onClick={() => setProdSize(size)}
                    key={index}
                    role="button"
                    className={`rounded-circle fs-8 fw-semibold d-flex justify-content-center align-items-center btn btn-outline-primary ${
                      size === prodSize ? "active" : ""
                    }`}
                    style={{
                      width: "40px",
                      height: "40px",
                    }}
                  >
                    {size}
                  </li>
                );
              })}
            </ul>
          ) : null}

          {product.colors ? (
            <ul className="p-0 d-flex gap-1 mb-0 colors">
              {product.colors.map((color, index) => {
                return (
                  <li
                    onClick={() => setProdColor(color)}
                    key={index}
                    role="button"
                    className={`rounded-circle nav-link shadow ${
                      color === prodColor ? "active" : ""
                    }`}
                    style={{
                      width: "35px",
                      height: "35px",
                      transition: "0.2s",
                      backgroundColor: `${color.toLowerCase()}`,
                    }}
                  ></li>
                );
              })}
            </ul>
          ) : null}

          <div className="d-flex flex-column flex-sm-row flex-md-column flex-lg-row gap-3">
            <button
              onClick={() => onAdd()}
              className={`rounded-pill text-capitalize text-dark btn btn-primary text-white shadow-sm ${
                product.quantity <= 0 ? "disabled" : ""
              }`}
            >
              اضافه الي عربة التسوق
            </button>
            <ProdWishlist prodId={product._id} />
          </div>
          <div className="d-flex flex-column gap-2">
            <div className="d-flex align-items-center gap-3">
              <CiDeliveryTruck className="fs-5" />
              <span className="fw-bold">الشحن والإرجاع</span>
            </div>
            <p className="description text-muted fs-7">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Assumenda dolores animi consequuntur natus.
            </p>
          </div>
          <div className="share-product d-flex align-items-center gap-3 p-2">
            <button
              onClick={() =>
                window.navigator.clipboard.writeText(window.location.href)
              }
              className="btn btn-outline-dark"
            >
              <BiLink className="fs-5" />
            </button>
            <span className="fw-bold text-muted mb-0">مشاركه</span>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default MainSection;
