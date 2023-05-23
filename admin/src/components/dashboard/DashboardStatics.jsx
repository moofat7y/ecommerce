import React from "react";
import { Spin } from "antd";
import { useSelector } from "react-redux";
import { GiReceiveMoney } from "react-icons/gi";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { IoIosTrendingDown, IoIosTrendingUp } from "react-icons/io";
import { FaOpencart, FaCashRegister } from "react-icons/fa";
const DashboardStatics = () => {
  const { isLoading, dashboardDetails, isError } = useSelector(
    (state) => state.dashboard
  );

  return (
    <div className="d-flex justify-content-center align-items-center gap-3">
      <div className="bg-light d-flex flex-column flex-grow-1  rounded-2 p-3">
        <Spin spinning={isLoading}>
          <div className="w-100 d-flex justify-content-between">
            <GiReceiveMoney className="fs-3" />
            <HiOutlineDotsHorizontal />
          </div>
          <p className="my-2 fw-light fs-8 lh-sm">Total Income</p>
          <h5 className="">{dashboardDetails[1]?.totalIncome} EGP</h5>
          <div className="d-flex align-items-center m-0 fw-light fs-8">
            {dashboardDetails[2]?.totalIncomePerc > 0 ? (
              <IoIosTrendingUp className="text-success fs-6 me-1" />
            ) : (
              <IoIosTrendingDown className="text-danger fs-6 me-1" />
            )}
            <p
              className={`${
                dashboardDetails[2]?.totalIncomePerc > 0
                  ? "text-success"
                  : "text-danger"
              } m-0 me-1`}
            >
              {dashboardDetails[2]?.totalIncomePerc > 0
                ? dashboardDetails[2]?.totalIncomePerc
                : -dashboardDetails[2]?.totalIncomePerc}
              %{" "}
            </p>{" "}
            from {dashboardDetails[0]?._id}
          </div>
        </Spin>
      </div>

      <div className="bg-light d-flex flex-column flex-grow-1  rounded-2 p-3">
        <Spin spinning={isLoading}>
          <div className="w-100 d-flex justify-content-between">
            <FaCashRegister className="fs-3" />
            <HiOutlineDotsHorizontal />
          </div>
          <p className="my-2 fw-light fs-8 lh-sm">Average Order Value</p>
          <h5 className="">{dashboardDetails[1]?.avgorderValue} EGP</h5>
          <div className="d-flex align-items-center m-0 fw-light fs-8">
            {dashboardDetails[2]?.avgOrderValuePerc > 0 ? (
              <IoIosTrendingUp className="text-success fs-6 me-1" />
            ) : (
              <IoIosTrendingDown className="text-danger fs-6 me-1" />
            )}{" "}
            <p
              className={` m-0 me-1 ${
                dashboardDetails[2]?.avgOrderValuePerc > 0
                  ? "text-success"
                  : "text-danger"
              }`}
            >
              {dashboardDetails[2]?.avgOrderValuePerc < 0
                ? -dashboardDetails[2]?.avgOrderValuePerc
                : dashboardDetails[2]?.avgOrderValuePerc}
              %{" "}
            </p>{" "}
            from {dashboardDetails[0]?._id}
          </div>
        </Spin>
      </div>

      <div className="bg-light d-flex flex-column flex-grow-1  rounded-2 p-3">
        <Spin spinning={isLoading}>
          <div className="w-100 d-flex justify-content-between">
            <FaOpencart className="fs-3" />
            <HiOutlineDotsHorizontal />
          </div>
          <p className="my-2 fw-light fs-8 lh-sm">Total Sales</p>
          <h5 className="">{dashboardDetails[1]?.sales}</h5>
          <div className="d-flex align-items-center m-0 fw-light fs-8">
            {dashboardDetails[2]?.totalSalesPerc > 0 ? (
              <IoIosTrendingUp className="text-success fs-6 me-1" />
            ) : (
              <IoIosTrendingDown className="text-danger fs-6 me-1" />
            )}{" "}
            <p
              className={` m-0 me-1 ${
                dashboardDetails[2]?.totalSalesPerc > 0
                  ? "text-success"
                  : "text-danger"
              }`}
            >
              {dashboardDetails[2]?.totalSalesPerc < 0
                ? -dashboardDetails[2]?.totalSalesPerc
                : dashboardDetails[2]?.totalSalesPerc}
              %{" "}
            </p>{" "}
            from {dashboardDetails[0]?._id}
          </div>
        </Spin>
      </div>
    </div>
  );
};

export default DashboardStatics;
