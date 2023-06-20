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
      <Section className="orders-tracker-wrapper-1">
        {ordersState.length > 0 ? (
          orders
        ) : (
          <div
            style={{ height: "100vh" }}
            className="d-flex align-items-center justify-content-center"
          >
            <Lottie
              style={{ width: "50%", height: "50%" }}
              className=""
              animationData={animation}
            />
          </div>
        )}
      </Section>
    </div>
  );
};

export default OrdersTracker;
