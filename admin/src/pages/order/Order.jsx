import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../../features/order/orderSlice";
import { Link } from "react-router-dom";
import { SlRefresh } from "react-icons/sl";
const columns = [
  {
    title: "Number",
    dataIndex: "number",
  },
  {
    title: "Date",
    dataIndex: "date",
    sorter: (a, b) => a.date?.length - b.date?.length,
  },
  {
    title: "Customer",
    dataIndex: "customer",
    defaultSortOrder: "descend",
    sorter: (a, b) => a.customer?.length - b.customer?.length,
  },
  {
    title: "Paid",
    dataIndex: "paid",
    sorter: (a, b) => a.paid - b.paid,
  },
  {
    title: "Status",
    dataIndex: "status",
  },
  {
    title: "Items",
    dataIndex: "items",
  },
  {
    title: "Total",
    dataIndex: "total",
    sorter: (a, b) => a.total - b.total,
  },
];

const Order = () => {
  const data = [];
  const dispatch = useDispatch();
  const { isSuccess, message, orders, isLoading } = useSelector(
    (state) => state.order
  );
  const orderBgColor = {
    "Not Processed": "bg-dark",
    Delivered: "bg-success",
    Processing: "bg-warning",
    Canceled: "bg-danger",
  };

  useEffect(() => {
    if (orders.length === 0 && isSuccess === false) {
      dispatch(getOrders());
    }
  }, []);
  orders?.forEach((order, index) => {
    data.push({
      key: index,
      number: (
        <div className="w-100 d-flex align-items-center justify-content-center">
          <Link
            className="stretched-link"
            to={`/dashboard/orders/${order._id}`}
          >
            {index + 1}
          </Link>
        </div>
      ),
      date: new Date(order.createdAt).toLocaleString(),
      customer:
        order.shipingaddress?.firstname + " " + order.shipingaddress?.lastname,
      paid: order.paymentIntent.status,
      status: (
        <span
          className={`${
            orderBgColor[order.orderStatus]
          } d-inline-block p-1 text-white rounded-2`}
        >
          {order.orderStatus}
        </span>
      ),
      items: order.products
        .map((prod) => prod.quantity)
        .reduce((a, b) => a + b),
      total: order.paymentIntent.amount,
    });
  });
  return (
    <div className="p-4 rounded-3 bg-light">
      <div className="header mb-1 d-flex align-items-center">
        <h5 className="mb-0">Order List</h5>
        <button
          onClick={() => dispatch(getOrders())}
          className="reset ms-3"
          disabled={isLoading ? true : false}
        >
          <SlRefresh
            className={` fs-6 text-primary ${isLoading ? "spinner" : ""}`}
          />
        </button>
      </div>
      <Table loading={isLoading} columns={columns} dataSource={data} />
    </div>
  );
};

export default Order;
