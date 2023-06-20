import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateCartQuantity } from "../../features/user/userSlice";

const CartItem = ({ prod, index }) => {
  const [prodQuantity, setProdQuantity] = useState(prod?.quantity);
  const dispatch = useDispatch();

  useEffect(() => {
    const updateQuantity = () => {
      dispatch(
        updateCartQuantity({
          prodId: prod?.product?._id,
          color: prod?.color,
          size: prod?.size,
          quantity: prodQuantity,
        })
      );
    };

    const timeId = setTimeout(() => {
      if (prod?.quantity !== prodQuantity) {
        updateQuantity();
      }
    }, [100]);
    return () => clearTimeout(timeId);
  }, [prodQuantity]);
  return (
    <tr className={`${prod?.product.quantity <= 0 ? "border-danger" : ""}`}>
      <td className="align-middle d-flex align-items-center">
        <img
          className="img-thumbnail bg-light border-0"
          style={{ width: "80px", height: "80px", objectFit: "cover" }}
          src={prod?.product?.images[0]?.secure_url}
          alt=""
        />
        <div className="mx-1">
          <p className="mb-0 fs-7">
            {prod?.product.title.substring(0, 20) + ".."}
          </p>
          {prod.size ? (
            <span className="mx-1">الحجم : {prod?.size}</span>
          ) : null}
          {prod.color ? (
            <div
              className="rounded-circle shadow"
              style={{
                width: "20px",
                height: "20px",
                margin: "0rem 0.25rem",
                backgroundColor: prod.color.toLowerCase(),
              }}
            ></div>
          ) : null}

          <span
            onClick={() =>
              dispatch(
                updateCartQuantity({
                  prodId: prod?.product?._id,
                  color: prod?.color,
                  size: prod?.size,
                  quantity: 0,
                })
              )
            }
            role="button"
            className="text-danger mb-0 mt-3 fw-light"
          >
            حذف
          </span>
        </div>
      </td>
      <td className="align-middle">{prod.product.price} جنيه</td>
      <td className="align-middle">
        <div className="d-flex align-items-center">
          <button
            onClick={() =>
              setProdQuantity((prev) => (prev + 1 > 10 ? prev : prev + 1))
            }
            className="btn btn-sm btn-primary"
          >
            +
          </button>
          <input
            style={{ maxWidth: "32px", minWidth: "32px" }}
            min={0}
            max={10}
            aria-controls="false"
            onChange={(e) =>
              e.target.value < 0
                ? setProdQuantity(1)
                : e.target.value > 10
                ? setProdQuantity(10)
                : setProdQuantity(e.target.value)
            }
            value={prodQuantity}
            type="number"
            className="px-1 form-control d-inline-block mx-2"
          />
          <button
            onClick={() =>
              setProdQuantity((prev) => (prev - 1 < 0 ? prev : prev - 1))
            }
            className="btn btn-sm btn-primary"
          >
            -
          </button>
        </div>
      </td>
      <td className="align-middle">{prod?.quantity * prod.price} جنيه </td>
    </tr>
  );
};

export default CartItem;
