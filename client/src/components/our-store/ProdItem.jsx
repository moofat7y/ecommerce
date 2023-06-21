import React, { useState } from "react";
import Star from "./Star";
import { AiOutlineEye } from "react-icons/ai";
import { FaOpencart } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addToCart } from "../../features/user/userSlice";
import { NavLink, Link } from "react-router-dom";
import { notifyError } from "../../utils/helpers";
import WishList from "./WishList";
const ProdItem = ({ prod, extraClass }) => {
  const dispatch = useDispatch();
  const [prodColor, setProdColor] = useState("");
  const [size, setSize] = useState("");
  const onAdd = () => {
    if (prod?.size?.length > 0 && !size) {
      return notifyError("من فضلك اختر الحجم");
    }
    if (prod?.colors?.length > 0 && !prodColor) {
      return notifyError("يجب عليك ادخال اللون");
    }
    dispatch(addToCart({ product: prod, color: prodColor, size }));
  };
  return (
    <div
      className={` px-1 mb-2  ${
        extraClass ? extraClass : "col-6 col-sm-6 col-lg-4 col-xl-3 "
      }`}
    >
      <div className="card h-100 bg-light shadow-sm border-0 position-relative">
        <WishList prodId={prod?._id} />
        <div className="ratio ratio-4x3 ">
          <img
            src={prod?.images[0].secure_url}
            className="w-100 h-100 "
            alt="..."
            loading="lazy"
            style={{ objectFit: "cover" }}
          />
        </div>

        <div className="card-body d-flex flex-column px-1 px-md-3">
          <h5 className="card-title">
            <Link to={`/ourstore/${prod?._id}`} className="nav-link">
              {prod?.title}
            </Link>
          </h5>
          <p className="card-text mb-1">{prod?.description}</p>
          <Star stars={prod?.totalrating} reviews={prod?.ratings} />
          <span className="lh-sm">{prod?.price}جنيه </span>
          <div
            style={{ maxHeight: "20px" }}
            className="d-flex mb-3 align-items-center justify-content-between"
          >
            {prod?.colors ? (
              <ul className="p-0 d-flex gap-1 mb-0 colors align-items-center">
                {prod.colors.map((color, index) => {
                  if (index > 1) {
                    return;
                  }
                  return (
                    <li
                      onClick={() => setProdColor(color)}
                      key={index}
                      role="button"
                      className={`rounded-circle shadow nav-link ${
                        color === prodColor ? "active" : ""
                      }`}
                      style={{
                        width: "20px",
                        height: "20px",
                        backgroundColor: color.toLowerCase(),
                      }}
                    ></li>
                  );
                })}
                {prod?.colors?.length > 2 ? (
                  <span className="mb-0 lh-1">+{prod.colors.length - 2}</span>
                ) : null}
              </ul>
            ) : null}

            {prod?.size.length > 0 ? (
              <div className="form-group ">
                <select
                  onChange={(e) => setSize(e.target.value)}
                  value={size}
                  className="form-select py-0"
                >
                  <option value="none">none</option>
                  {prod?.size.map((size, index) => (
                    <option key={index} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
              </div>
            ) : null}
          </div>
          <div className="buttons gap-2 d-flex mt-auto">
            <button
              onClick={() => onAdd()}
              className="btn btn-light shadow-sm text-primary w-50"
            >
              <FaOpencart />
            </button>

            <NavLink
              to={`/ourstore/${prod?._id}`}
              className="btn btn-outline-primary  w-50"
            >
              <AiOutlineEye />
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProdItem;
