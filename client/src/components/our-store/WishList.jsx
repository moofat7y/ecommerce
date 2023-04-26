import React, { useState } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToWishlist } from "../../features/wishlist/wishlistSlice";
const WishList = ({ prodId }) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { wishlist: w, auth } = useSelector((state) => state);
  const { wishlist } = w;
  const { token } = auth;
  const dispatch = useDispatch();
  let isInWishlist = false;
  if (wishlist) {
    isInWishlist =
      wishlist?.findIndex((wish) => wish._id === prodId) >= 0 ? true : false;
  }

  const onAdd = async () => {
    if (!token) {
      navigate("/auth/signin");
      return;
    }
    setIsLoading(true);
    await dispatch(addToWishlist({ prodId }));
    setIsLoading(false);
  };
  return (
    <button
      disabled={isLoading}
      style={{
        width: "30px",
        height: "30px",
        border: "none",
        outline: "none",
        background: "none",
      }}
      onClick={() => onAdd()}
      className="icon bg-white rounded-circle shadow-sm d-flex fs-4 position-absolute align-items-center justify-content-center"
    >
      {isLoading ? (
        <span
          className="spinner-border text-black spinner-border-sm fs-7"
          role="status"
          aria-hidden="true"
        ></span>
      ) : isInWishlist ? (
        <AiFillHeart className="text-primary " />
      ) : (
        <AiOutlineHeart className=" " />
      )}
    </button>
  );
};

export default WishList;
