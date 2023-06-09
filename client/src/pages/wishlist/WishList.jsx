import React from "react";
import { useSelector } from "react-redux";
import ProdItem from "../../components/our-store/ProdItem";
import Lottie from "lottie-react";
import Like from "../../animations/LIKE .json";
const WishList = () => {
  const { wishlist } = useSelector((state) => state.wishlist);

  const prod_list = wishlist?.map((prod) => {
    return (
      <ProdItem
        key={prod?._id}
        extraClass={"col-6 col-sm-4 col-md-3 col-xl-2"}
        prod={prod}
      />
    );
  });
  return (
    <div className="wishlist">
      <div className="container py-5">
        {wishlist.length > 0 ? (
          <div className="products row">{prod_list}</div>
        ) : (
          <div className="w-100 vh-100 d-flex flex-column justify-content-center align-items-center">
            <h3>قائمة الرغبات فارغه</h3>
            <Lottie
              style={{
                width: "50%",
                height: "50%",
              }}
              animationData={Like}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default WishList;
