// export default Columns;
import React from "react";
import { Area } from "@ant-design/plots";
import { useDispatch, useSelector } from "react-redux";
import { SlRefresh } from "react-icons/sl";
import {
  getOrdersInEachMonth,
  getDashboardDetails,
} from "../../features/dashboard/dashboardSlice";
const DemoArea = () => {
  const dispatch = useDispatch();
  const { ordersInEachMonth, isLoading } = useSelector(
    (state) => state.dashboard
  );

  const config = {
    data: ordersInEachMonth,
    xField: "_id",
    yField: "sales",
    line: {
      color: "#003e29",
    },
    xAxis: {
      range: [0, 1],
      tickCount: 12,
    },
    areaStyle: () => {
      return {
        fill: "l(270) 0:#ffffff 0.5:#003e2951 1:#003e2996 1:#003e29c1",
      };
    },
  };

  return (
    <>
      <div className="header mb-1 d-flex align-items-center">
        <h5 className="mb-0">Income Statics</h5>
        <button
          onClick={() => {
            dispatch(getOrdersInEachMonth());
            dispatch(getDashboardDetails());
          }}
          className="reset ms-3"
          disabled={isLoading ? true : false}
        >
          <SlRefresh
            className={` fs-6 text-primary ${isLoading ? "spinner" : ""}`}
          />
        </button>
      </div>
      <div>
        <Area {...config} />
      </div>
    </>
  );
};

export default DemoArea;
