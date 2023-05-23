import React from "react";
import DemoArea from "../../components/dashboard/Columns";
import DashboardStatics from "../../components/dashboard/DashboardStatics";

const Dashboard = () => {
  return (
    <>
      <h4 className="mb-3">Dashboard</h4>
      <DashboardStatics />
      <div className="mt-4 bg-light p-4 rounded-3">
        <DemoArea />
      </div>
    </>
  );
};

export default Dashboard;
