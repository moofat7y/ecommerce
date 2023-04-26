import React from "react";
import { BsDot } from "react-icons/all";
import Section from "../../components/Section";
import OrderTrackerItem from "../../components/orderTracker/OrderTrackerItem";
import { useSelector } from "react-redux";
import Lottie from "lottie-react";
import animation from "../../animations/3683233.json";
const OrdersTracker = () => {
  const { orders: ordersState } = useSelector((state) => state.user);
  const orders = ordersState?.map((order, i) => {
    return <OrderTrackerItem key={order._id} order={order} index={++i} />;
  });

  return (
    <div>
      <header className="bg-white d-flex justify-content-center py-4">
        <span className="fs-6  text-secondary">
          <span className="">الرئيسيه</span>
          <BsDot className="fs-5" />
          <span>الطلبات</span>
        </span>
      </header>
      <Section className="orders-tracker-wrapper-1">
        {ordersState.length > 0 ? (
          orders
        ) : (
          <div style={{ height: "80vh" }} className=" w-100">
            <Lottie className="w-100 h-100" animationData={animation} />
          </div>
        )}
      </Section>
    </div>
  );
};

export default OrdersTracker;
