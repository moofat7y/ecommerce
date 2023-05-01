import React, { useState } from "react";
import Star from "./Star";
import { AiOutlineEye, AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { FaOpencart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../features/user/userSlice";
import { NavLink, useNavigate, Link } from "react-router-dom";
import { notifyError } from "../../utils/helpers";
import WishList from "./WishList";
const ProdItem = ({ prod, extraClass }) => {
  const dispatch = useDispatch();
  const [cartLoading, setCartLoading] = useState(false);
  const [prodColor, setProdColor] = useState("");
  const [size, setSize] = useState("");
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const onAdd = async () => {
    if (!token) {
      navigate("/auth/signin");
      return;
    }
    try {
      if (prod?.size?.length > 0 && !size) {
        return notifyError("من فضلك اختر الحجم");
      }
      if (prod?.colors?.length > 0 && !prodColor) {
        return notifyError("يجب عليك ادخال اللون");
      }
      setCartLoading(true);

      await dispatch(addToCart({ prodId: prod?._id, color: prodColor, size }));
      setCartLoading(false);
    } catch (error) {
      setCartLoading(false);
    }
  };
  return (
    <div
      className={` px-1 mb-2  ${
        extraClass ? extraClass : "col-6 col-sm-6 col-lg-4 col-xl-3 "
      }`}
    >
      <div className="card h-100 bg-light shadow border-0 position-relative">
        <WishList prodId={prod?._id} />
        <div className="ratio ratio-4x3 ">
          <img
            src={prod?.images[0].secure_url}
            className="w-100 h-100 "
            alt="..."
            style={{ objectFit: "contain" }}
          />
        </div>

        <div className="card-body">
          <h5 className="card-title">
            <Link to={`/ourstore/${prod?._id}`} className="nav-link">
              {prod?.title}
            </Link>
          </h5>
          <p className="card-text mb-1">{prod?.description}</p>
          <Star stars={prod?.totalrating} reviews={prod?.ratings} />
          <span className="lh-sm">{prod?.price}جنيه </span>
          <div
            // style={{ maxHeight: "20px" }}
            className="d-flex  align-items-center justify-content-between"
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
                  <span className="mb-0">+{prod.colors.length - 2}</span>
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
          <div className="buttons  gap-2 d-flex mt-3">
            <button
              onClick={() => onAdd()}
              disabled={cartLoading ? true : false}
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
