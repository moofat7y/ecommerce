import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  getProdCategories,
  deleteCategory,
} from "../../features/pcategory/pcategorySlice";
import { BiMessageSquareEdit } from "react-icons/bi";
import { TfiTrash } from "react-icons/tfi";
import AddCategory from "../../components/product/AddCategory";
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

const ProdCategoryList = () => {
  const data = [];
  const dispatch = useDispatch();
  const [editCell, setEditCell] = useState({});
  const { isSuccess, categories, isLoading } = useSelector(
    (state) => state.pCategory
  );

  useEffect(() => {
    if (categories.length === 0 && isSuccess === false) {
      dispatch(getProdCategories());
    }
  }, []);

  const handleEdit = (catId, categoryTitle) => {
    setEditCell({ catId, categoryTitle });
  };

  categories?.forEach((cat, index) => {
    data.push({
      key: index + 1,
      title: cat.title,
      action: (
        <div className="w-100 d-flex align-items-center justify-content-evenly">
          <span role="button">
            <BiMessageSquareEdit
              className="fs-5 text-primary"
              onClick={() => handleEdit(cat._id, cat.title)}
            />
          </span>
          <span role="button">
            <TfiTrash
              className="fs-5 text-danger"
              onClick={() =>
                showDeleteConfirm({
                  title: "Confirm",
                  action: deleteCategory({ catId: cat._id, toast }),
                  text: "Are you sure you want delete this color?",
                  dispatch,
                })
              }
            />
          </span>
        </div>
      ),
    });
  });
  return (
    <div className="p-4 rounded-3 bg-light">
      <AddCategory editCell={editCell} setEditCell={setEditCell} />
      <h5>Category List</h5>
      <Table loading={isLoading} columns={columns} dataSource={data} />
    </div>
  );
};

export default ProdCategoryList;
