import React, { useState } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { addToWishlist } from "../../features/wishlist/wishlistSlice";
import { useNavigate } from "react-router-dom";
const ProdWishlist = ({ prodId }) => {
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
      onClick={() => onAdd()}
      className=" rounded-pill text-capitalize text-dark btn btn-light shadow-sm"
    >
      {isLoading ? (
        <span
          className="spinner-border spinner-border-sm ms-2 fs-5"
          role="status"
          aria-hidden="true"
        ></span>
      ) : isInWishlist ? (
        <>
          <AiFillHeart className=" ms-2 fs-5" />
          الازاله من قائمة الرغبات
        </>
      ) : (
        <>
          <AiOutlineHeart className=" ms-2 fs-5" />
          الاضافه الي قائمة الرغبات
        </>
      )}
    </button>
  );
};

export default ProdWishlist;
