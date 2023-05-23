import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getColors, deleteColor } from "../../features/color/colorSlice";
import { BiMessageSquareEdit } from "react-icons/bi";
import { TfiTrash } from "react-icons/tfi";
import AddColor from "../../components/product/AddColor";
import { toast } from "react-toastify";
import showDeleteConfirm from "../../components/CustomModal";
const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Title",
    dataIndex: "title",
    defaultSortOrder: "descend",
    sorter: (a, b) => a.title.length - b.title.length,
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const ColorList = () => {
  const [editCell, setEditCell] = useState({});
  const data = [];
  const dispatch = useDispatch();
  const { color } = useSelector((state) => state);
  const { isSuccess, colors, isLoading } = color;
  useEffect(() => {
    if (colors.length === 0 && isSuccess === false) {
      dispatch(getColors());
    }
  }, []);

  const handleEdit = (colorId, colorTitle) => {
    setEditCell({ colorId, colorTitle });
  };
  colors?.forEach((color, index) => {
    data.push({
      key: index + 1,
      title: color.title,
      action: (
        <div className="w-100 d-flex align-items-center justify-content-evenly">
          <span role="button" className="">
            <BiMessageSquareEdit
              onClick={() => handleEdit(color._id, color.title)}
              className="fs-5 text-primary"
            />
          </span>
          <span role="button">
            <TfiTrash
              onClick={() =>
                showDeleteConfirm({
                  title: "Confirm",
                  action: deleteColor({ colorId: color._id, toast }),
                  text: "Are you sure you want delete this color?",
                  dispatch,
                })
              }
              className="fs-5 text-danger"
            />
          </span>
        </div>
      ),
    });
  });
  return (
    <div className="p-4 rounded-3 bg-light">
      <AddColor editCell={editCell} setEditCell={setEditCell} />
      <h5>Color List</h5>
      <Table loading={isLoading} columns={columns} dataSource={data} />
    </div>
  );
};

export default ColorList;
