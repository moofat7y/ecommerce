import React from "react";
import ProductCard from "./ProductCard";

const OrderTrackerItem = ({ order, index }) => {
  const formateDate = (date) => {
    const firstValentineOfTheDecade = new Date(date);
    const longEnUSFormatter = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    return longEnUSFormatter.format(firstValentineOfTheDecade);
  };

  const products = order?.products?.map((prod, i) => {
    if (!prod?.product) {
      return;
    }
    return (
      <ProductCard
        key={prod.product._id + prod?.color + prod?.size}
        prod={prod.product}
        color={prod.color}
        quantity={prod.quantity}
      />
    );
  });
  const orderStatusColors = {
    "Not Processed": "bg-dark",
    Delivered: "bg-success",
    Processing: "bg-warning",
    Canceled: "bg-danger",
  };

  return (
    <div className={`orders-wrapper-${index} border border-3`}>
      <div className="container px-2 px-md-3 py-4">
        <div className="row flex-column">
          <h5>
            # الطلب رقم
            <span className="badge bg-secondary me-2">{order._id}</span>
          </h5>
          <div className="d-flex flex-wrap align-items-center">{products}</div>
          <div className="order-info p-3 mt-3 d-flex flex-wrap justify-content-between gap-3 gap-sm-3 border-top border-2">
            <div className=" d-flex flex-column gap-2">
              <div className="d-flex align-items-center fw-bold">
                الحالة :{" "}
                <span
                  className={`me-2 d-inline-block rounded-pill px-2 py-1 text-white ${
                    orderStatusColors[order.orderStatus]
                  }`}
                >
                  {order.orderStatus}
                </span>{" "}
              </div>
              <div className="d-flex fw-bold text-nowrap">
                العنوان :
                <div className="d-flex flex-column me-2 text-muted">
                  <span>
                    {order.shipingaddress.floor},{" "}
                    {order.shipingaddress.buildingname},{" "}
                  </span>
                  <span>{order.shipingaddress.streetname}</span>
                </div>
              </div>
            </div>
            <div className=" d-flex flex-wrap flex-column gap-2">
              <div className="d-flex fw-bold text-nowrap">
                تاريخ الانشاء :
                <span className="me-2 text-muted">
                  {formateDate(order.createdAt)}
                </span>
              </div>
              <div className="d-flex fw-bold text-nowrap">
                تاريخ التحديث :
                <span className="me-2 text-muted">
                  {formateDate(order.updatedAt)}
                </span>
              </div>
            </div>
            <div className="d-flex flex-column justify-content-end justify-content-md-start gap-2">
              <span className="bg-primary px-2 px-sm-3 py-2 rounded-pill fs-7 fs-bold text-white text-nowrap">
                {order.paymentIntent.amount} جنيه
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderTrackerItem;
