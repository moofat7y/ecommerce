import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, updateUser } from "../../features/customers/customerSlice";
import { Table } from "antd";
import { SlRefresh } from "react-icons/sl";
import { toast } from "react-toastify";
const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
    defaultSortOrder: "descend",
    sorter: (a, b) => a.name.length - b.name.length,
  },
  {
    title: "Email",
    dataIndex: "email",
  },
  {
    title: "Mobile",
    dataIndex: "mobile",
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];
const Customers = () => {
  const dispatch = useDispatch();
  const { customer, auth } = useSelector((state) => state);
  const { user } = auth;
  const { customers, isSuccess, isLoading } = customer;
  const data = [];
  useEffect(() => {
    if (customers.length === 0 && isSuccess === false) dispatch(getUsers());
  }, []);

  const handleUpdate = (role, userId) => {
    dispatch(updateUser({ userId, role, toast }));
  };
  // Fill data array by customers
  customers.forEach((customer, index) => {
    if (customer.email === user.email) {
      return;
    }
    data.push({
      name: customer.firstname + " " + customer.lastname,
      key: index + 1,
      mobile: customer.mobile,
      email: customer.email,
      action: (
        <>
          <select
            onChange={(e) => handleUpdate(e.target.value, customer._id)}
            defaultValue={customer.role}
            className="form-select"
          >
            <option value="admin">admin</option>
            <option value="user">user</option>
          </select>
        </>
      ),
    });
  });
  return (
    <div className="p-4 rounded-3 bg-light">
      <div className="header mb-1 d-flex align-items-center">
        <h5 className="mb-0">Customers</h5>
        <button
          onClick={() => dispatch(getUsers())}
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

export default Customers;
