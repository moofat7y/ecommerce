import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateCartQuantity } from "../../features/user/userSlice";

const CartItem = ({ prod, index }) => {
  const [isLoading, setIsLoading] = useState(false);
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
        {prod.product.size.map((size) => (
          <span className="mx-1">{size}</span>
        ))}
      </td>
      <td className="align-middle">{prod.product.price} جنيه</td>
      <td className="align-middle">
        <div className="d-flex align-items-center">
          <input
            min={0}
            disabled={isLoading}
            onChange={(e) => handleChange(e.target.value)}
            defaultValue={prod?.quantity}
            type="number"
            className="w-25 form-control"
          />
        </div>
      </td>
      <td className="align-middle">{prod?.quantity * prod.price} جنيه </td>
    </tr>
  );
};

export default CartItem;
