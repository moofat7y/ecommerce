import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  getEnquires,
  updateEnquiry,
  deleteEnquiry,
} from "../features/enquires/enqSlice";
import { TfiTrash } from "react-icons/tfi";
const columns = [
  {
    title: "Number",
    dataIndex: "number",
  },
  {
    title: "Name",
    dataIndex: "name",
    defaultSortOrder: "descend",
    sorter: (a, b) => a.title?.length - b.title?.length,
  },
  {
    title: "Email",
    dataIndex: "email",
  },
  {
    title: "Comment",
    dataIndex: "comment",
  },
  {
    title: "Mobile",
    dataIndex: "mobile",
  },
  {
    title: "Status",
    dataIndex: "status",
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const enqStates = ["Submitted", "Contacted", "In Progress"];
const Enquiry = () => {
  const { enquires, isLoading } = useSelector((state) => state.enquiry);
  const dispatch = useDispatch();
  const data = [];

  useEffect(() => {
    dispatch(getEnquires());
  }, []);

  const updateStatus = (value, enqId) => {
    dispatch(updateEnquiry({ status: value, enqId }));
  };

  const onDelete = async (enqId) => {
    await dispatch(deleteEnquiry(enqId));
  };

  enquires?.forEach((enq, index) => {
    data.push({
      key: enq._id,
      number: index + 1,
      name: enq.name,
      email: enq.email,
      comment: enq.comment,
      mobile: enq.mobile,
      status: (
        <>
          <select
            onChange={(e) => updateStatus(e.target.value, enq._id)}
            defaultValue={enq.status}
            className="form-select"
          >
            {enqStates.map((enq, index) => {
              return (
                <option key={index} value={enq}>
                  {enq}
                </option>
              );
            })}
          </select>
        </>
      ),
      action: (
        <div className="w-100 d-flex align-items-center justify-content-evenly">
          <span role="button" onClick={() => onDelete(enq._id)}>
            <TfiTrash className="fs-5 text-danger" />
          </span>
        </div>
      ),
    });
  });
  return (
    <div className="p-4 rounded-3 bg-light">
      <h5>Enquires</h5>
      <Table loading={isLoading} columns={columns} dataSource={data} />
    </div>
  );
};

export default Enquiry;
