import React, { useState } from "react";
import { BsDot } from "react-icons/bs";
import { useSelector } from "react-redux";
import CartItem from "./CartItem";
import { NavLink, useNavigate } from "react-router-dom";
import api from "../../utils/api";
import loading from "../../animations/Carretilla_master.json";
import Lottie from "lottie-react";
const Cart = () => {
  const [status, setStatus] = useState("cash");
  const { cart } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const products = cart?.products?.map((prod, i) => {
    if (!prod?.product) {
      return;
    }
    return (
      <CartItem
        key={prod.product._id + prod?.color + prod?.size}
        prod={prod}
        subtotal={cart.cartTotal}
        index={++i}
      />
    );
  });

  const onSubmit = async () => {
    if (status === "visa") {
      const response = await api.post("stripe/create-checkout-session");
      window.open(response.data.url, "_blank");
      return;
    }
    navigate("/cart/confirm-order", { state: cart });
  };
  return (
    <div className="cart">
      <header className="bg-white d-flex justify-content-center py-4">
        <span className="fs-6  text-secondary">
          <span className="">الرئيسيه</span>
          <BsDot className="fs-5" />
          <span>عربة التسوق</span>
        </span>
      </header>
      <div className="container py-5">
        {cart?.products?.length === 0 || cart === null ? (
          <div className="w-100 vh-100 d-flex flex-column justify-content-center align-items-center">
            <h3>عربة التسوق فارغه</h3>
            <Lottie
              style={{
                width: "50%",
                height: "50%",
              }}
              animationData={loading}
            />
          </div>
        ) : (
          <>
            <div className="table-wrapper mb-3">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">المنتج</th>
                    <th scope="col">اللون</th>
                    <th scope="col">الحجم</th>
                    <th scope="col">السعر</th>
                    <th scope="col">الكمية</th>
                    <th scope="col">اجمالى السعر</th>
                  </tr>
                </thead>
                <tbody>{products}</tbody>
              </table>
            </div>

            <div className="text-start mb-3">
              <NavLink
                to="/ourstore"
                className=" btn btn-primary rounded-pill px-3"
              >
                تابع التسوق
              </NavLink>
            </div>

            <p className="fw-semibold mb-3 me-3">
              المجموع : {cart?.cartTotal} جنيه
            </p>
            <div className="d-flex flex-end">
              <div className="p-3 bg-white shadow-sm">
                <div className="my-3">
                  <div className="form-check">
                    <input
                      className="form-check-input me-5"
                      type="radio"
                      name="exampleRadios"
                      id="exampleRadios1"
                      value="cash"
                      checked={status === "cash"}
                      onChange={(e) => setStatus(e.currentTarget.value)}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="exampleRadios1"
                    >
                      الدفع عند الاستلام
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input me-5"
                      type="radio"
                      name="exampleRadios"
                      id="exampleRadios2"
                      value="visa"
                      onChange={(e) => setStatus(e.currentTarget.value)}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="exampleRadios2"
                    >
                      ادفع الان
                    </label>
                  </div>
                </div>
                <button
                  onClick={() => onSubmit()}
                  className="btn btn-primary rounded-pill px-3"
                >
                  تاكيد الطلب
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
