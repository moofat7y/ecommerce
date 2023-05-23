import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  getOrderById,
  updateOrderStatus,
  deleteOrder,
} from "../../features/order/orderSlice";
import { Link } from "react-router-dom";
import { notifyWarning, orderStatus } from "../../utils/helpers";

const OrderDetails = () => {
  const [IsEdit, setIsEdit] = useState(false);
  const navigate = useNavigate();
  const { orderId } = useParams();
  const { isLoading, singleOrder } = useSelector((state) => state.order);
  const [status, setStatus] = useState(singleOrder?.orderStatus);

  const dispatch = useDispatch();
  useEffect(() => {
    if (orderId && singleOrder?._id !== orderId) {
      dispatch(getOrderById({ orderId }));
    }
  }, [orderId]);
  const orderBgColor = {
    "Not Processed": "bg-dark",
    Delivered: "bg-success",
    Processing: "bg-warning",
    Canceled: "bg-danger",
  };

  const handleUpdate = async () => {
    if (status !== singleOrder.orderStatus) {
      await dispatch(updateOrderStatus({ orderId, status: status }));
      setIsEdit(false);
    } else {
      notifyWarning("Pleas chosse anthor status");
    }
  };

  const handleDelete = async () => {
    dispatch(deleteOrder({ orderId: singleOrder?._id, navigate }));
  };
  return (
    <>
      {isLoading || !singleOrder ? (
        <div>loading</div>
      ) : (
        <>
          <div className="d-flex">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/dashboard">Dashboard</Link>
                </li>
                <li className="breadcrumb-item">
                  <Link to="/dashboard/orders">Orders</Link>
                </li>

                <li className="breadcrumb-item active" aria-current="page">
                  Order #{singleOrder?._id}
                </li>
              </ol>
            </nav>
            <div className="control ms-auto">
              {IsEdit ? (
                <button
                  className="btn btn-secondary me-2"
                  onClick={() => setIsEdit(false)}
                >
                  Cancel
                </button>
              ) : (
                <button
                  className="btn btn-secondary me-2"
                  onClick={() => handleDelete()}
                >
                  Delete
                </button>
              )}
              <button
                className={`btn btn-primary ${IsEdit ? "d-none" : ""}`}
                onClick={() => setIsEdit(true)}
              >
                Edit
              </button>
              {IsEdit ? (
                <button
                  onClick={() => handleUpdate()}
                  className="btn btn-primary"
                >
                  Update
                </button>
              ) : null}
            </div>
          </div>
          <div className="py-2 px-3 fs-7 mt-3 d-flex border-top border-bottom align-items-center">
            <span>{new Date(singleOrder?.createdAt)?.toLocaleString()}</span>
            <span className="mx-2 lh-sm text-secondary fs-6">|</span>
            <span>
              {singleOrder?.products
                ?.map((prod) => prod.quantity)
                .reduce((a, b) => a + b)}{" "}
              items
            </span>
            <span className="mx-2 lh-sm text-secondary fs-6">|</span>
            <span>Total {singleOrder?.paymentIntent?.amount} EGP</span>
            <span className="mx-2 lh-sm text-secondary fs-6">|</span>
            {IsEdit ? (
              <select
                onChange={(e) => setStatus(e.target.value)}
                value={status}
                className="form-select w-25 py-1 fs-8"
              >
                {orderStatus?.map((st, index) => (
                  <option key={index + st} value={st}>
                    {st}
                  </option>
                ))}
              </select>
            ) : (
              <span
                className={`p-1 rounded-2 text-white ${
                  orderBgColor[singleOrder?.orderStatus]
                }`}
              >
                {singleOrder?.orderStatus}
              </span>
            )}
          </div>

          <div className="details mt-4  d-flex gap-3">
            <div className="items align-self-start w-75 py-4 bg-light rounded-3">
              <h6 className="px-4 pb-3 border-bottom">Items</h6>
              {singleOrder?.products?.map((prod, index) => {
                return (
                  <div
                    key={prod?.product?._id + index}
                    className="px-4 py-3 border-bottom d-flex align-items-center"
                  >
                    <div className="rounded-circle me-3">
                      <img
                        className="order_prod-image"
                        src={prod?.product?.images[0]?.secure_url}
                        alt="product image"
                      />
                    </div>
                    <div className="d-flex flex-column">
                      <p className="mb-0">{prod?.product?.title}</p>

                      {prod?.color ? <p className="">{prod?.color}</p> : null}
                    </div>
                    <p className="mb-0 ms-auto">{prod?.product?.price} EGP</p>
                    <p className="mb-0 mx-4">{prod?.quantity}</p>
                    <p className="mb-0">
                      {prod?.quantity * prod?.product?.price} EGP
                    </p>
                  </div>
                );
              })}
              <div className="total px-4 pt-3 d-flex justify-content-between">
                <p className="mb-0">Total</p>
                <p className="mb-0">{singleOrder?.paymentIntent?.amount} EGP</p>
              </div>
            </div>

            <div className="customer w-25">
              <div className="bg-light mb-3 p-4 rounded-3">
                <h6 className="mb-3">Customer</h6>
                <div className="d-flex">
                  <div className="image me-2">
                    <img
                      src={singleOrder?.orderby?.image?.secure_url}
                      className="img-profile"
                      alt="img-profile"
                    />
                  </div>
                  <p className="mb-0">
                    {singleOrder?.orderby?.firstname}{" "}
                    {singleOrder?.orderby?.lastname}
                  </p>
                </div>
              </div>

              <div className="bg-light mb-3 p-4 rounded-3">
                <h6 className="mb-3">Contact</h6>
                <p className="mb-0 lh-sm fs-7">
                  {singleOrder?.orderby?.firstname}{" "}
                  {singleOrder?.orderby?.lastname}
                </p>
                <a
                  className="fs-7 fw-light d-block"
                  href={`mailto:${singleOrder?.orderby?.email}`}
                >
                  {singleOrder?.orderby?.email}
                </a>
                <a
                  className="fs-7 fw-light d-block"
                  href={`tel:${singleOrder?.orderby?.mobile}`}
                >
                  {singleOrder?.orderby?.mobile}
                </a>
              </div>

              <div className="bg-light mb-3 p-4 rounded-3">
                <h6 className="mb-3">Shiping Address</h6>
                {singleOrder?.shipingaddress
                  ? Object.entries(singleOrder?.shipingaddress)?.map(
                      ([key, value]) => {
                        return (
                          <p key={key} className="mb-0">
                            <span className="mb-0 fw-semibold">{key}: </span>{" "}
                            {value}
                          </p>
                        );
                      }
                    )
                  : null}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default OrderDetails;
