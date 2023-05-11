import React, { useState } from "react";
import Section from "../Section";
import Star from "../our-store/Star";
import { BiLink, CiDeliveryTruck } from "react-icons/all";
import PreviewImg from "./PreviewImg";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { notifyError } from "../../utils/helpers";
import { addToCart } from "../../features/user/userSlice";
import ProdWishlist from "./ProdWishlist";

const MainSection = () => {
  const [prodSize, setProdSize] = useState("");
  const [prodColor, setProdColor] = useState("");
  const [cartLoading, setCartLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { singleProd, auth } = useSelector((state) => state);
  const { product } = singleProd;
  const { token } = auth;

  const onAdd = async () => {
    if (!token) {
      navigate("/auth/signin");
      return;
    }
    try {
      if (product?.size?.length > 0 && !prodSize) {
        return notifyError("Size is required");
      }

      if (product?.colors?.length > 0 && !prodColor) {
        return notifyError("Color is required");
      }
      setCartLoading(true);

      await dispatch(
        addToCart({ prodId: product?._id, color: prodColor, size: prodSize })
      );
      setCartLoading(false);
    } catch (error) {
      setCartLoading(false);
    }
  };
  return (
    <Section className="single-product-wrapper-1 bg-light">
      <div className="row bg-white shadow-sm p-3">
        <PreviewImg />
        <div className="col-12 col-md-6 px-0 pe-1 py-2 d-flex flex-column gap-3">
          <h1 className="fs-6 fw-bolder text-dark">{product.title}</h1>
          <span className="fs-6 fw-bolder">{product.price} جنيه </span>
          <Star
            stars={product?.totalrating || 0}
            reviews={product.ratings || []}
          />
          <span className="type">
            <span className="fw-bold me-2">Type : </span>
            <span className="text-muted">{product.category}</span>
          </span>
          <span className="brand">
            <span className="fw-bold me-2">Brand : </span>
            <span className="text-muted">{product.brand}</span>
          </span>
          <span className="categories">
            <span className="fw-bold me-2">Categories : </span>
            <span className="text-muted">{product.category}</span>
          </span>
          {product.tag ? (
            <span className="tags">
              <span className="fw-bold me-2">Tags : </span>
              <span className="text-muted">{product.tag}</span>
            </span>
          ) : null}
          <span className="availability">
            <span className="fw-bold me-2">Availability : </span>
            {product.quantity > 0 ? (
              <span className="text-muted">{product.quantity} in a stock</span>
            ) : (
              <span className="text-danger">Out of stock</span>
            )}
          </span>
          <span className="sold">
            <span className="fw-bold me-2">Sold : </span>
            <span className="text-muted">{product.sold} sold</span>
          </span>
          {product.size ? (
            <ul className="p-0 d-flex gap-1 mb-0 sizes">
              {product.size.map((size, index) => {
                return (
                  <li
                    onClick={() => setProdSize(size)}
                    key={index}
                    role="button"
                    className={`rounded-circle d-flex justify-content-center align-items-center btn btn-outline-primary ${
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
              disabled={cartLoading}
              className={`rounded-pill text-capitalize text-dark btn btn-primary text-white shadow-sm ${
                product.quantity <= 0 ? "disabled" : ""
              }`}
            >
              add to cart
            </button>
            <ProdWishlist prodId={product._id} />
          </div>
          <div className="d-flex flex-column gap-2">
            <div className="d-flex align-items-center gap-3">
              <CiDeliveryTruck className="fs-5" />
              <span className="fw-bold">Shipping & Return</span>
            </div>
            <p className="description text-muted fs-7">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Assumenda dolores animi consequuntur natus.
            </p>
          </div>
          <div className="share-product d-flex align-items-center gap-3 shadow-sm p-2">
            <button
              onClick={() =>
                window.navigator.clipboard.writeText(window.location.href)
              }
              className="btn btn-outline-dark"
            >
              <BiLink className="fs-5" />
            </button>
            <span className="fw-bold text-muted">share</span>
          </div>
          <div className="d-flex gap-3 flex-column align-items-center bg-light p-2">
            <span className="fw-bold">Payment Methods</span>
            <img
              src="/images/payments-methods.png"
              alt="..."
              className="w-100"
            />
          </div>
        </div>
      </div>
    </Section>
  );
};

export default MainSection;
