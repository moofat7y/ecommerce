import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateCartQuantity } from "../../features/user/userSlice";

const CartItem = ({ prod, index }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [prodQuantity, setProdQuantity] = useState(prod?.quantity);
  const dispatch = useDispatch();
  const handleChange = async (quantity) => {
    setIsLoading(true);
    await dispatch(
      updateCartQuantity({
        prodId: prod?.product?._id,
        color: prod?.color,
        size: prod?.size,
        quantity: quantity,
      })
    );
    setIsLoading(false);
  };

  useEffect(() => {
    const updateQuantity = async () => {
      setIsLoading(true);
      const response = await dispatch(
        updateCartQuantity({
          prodId: prod?.product?._id,
          color: prod?.color,
          size: prod?.size,
          quantity: prodQuantity,
        })
      );
      setIsLoading(false);
    };

    const timeId = setTimeout(() => {
      if (prod?.quantity !== prodQuantity) {
        updateQuantity();
      }
    }, [1000]);
    return () => clearTimeout(timeId);
  }, [prodQuantity]);
  return (
    <tr>
      <th scope="align-middle">{index}</th>
      <td className="align-middle row">
        <img
          className="img-thumbnail"
          src={prod?.product?.images[0]?.secure_url}
          alt=""
        />
      </td>
      <td className="align-middle">
        <div
          style={{
            width: "20px",
            height: "20px",
            margin: "0rem 0.25rem",
            backgroundColor: prod.color.toLowerCase(),
          }}
        ></div>
      </td>
      <td className="align-middle">
        <span className="mx-1">{prod?.size}</span>
      </td>
      <td className="align-middle">{prod.product.price} جنيه</td>
      <td className="align-middle">
        <div className="d-flex align-items-center">
          <button
            disabled={isLoading}
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
            disabled={isLoading}
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
            disabled={isLoading}
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
