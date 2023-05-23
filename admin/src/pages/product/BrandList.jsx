import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getBrands } from "../../features/brands/brandSlice";
import { BiMessageSquareEdit } from "react-icons/bi";
import { TfiTrash } from "react-icons/tfi";
import AddBrand from "../../components/product/AddBrand";
import { deleteBrand } from "../../features/brands/brandSlice";
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
const BrandList = () => {
  const [editCell, setEditCell] = useState({});
  const { brand } = useSelector((state) => state);
  const { brands, isLoading, isSuccess } = brand;
  const dispatch = useDispatch();
  const data = [];

  const handleEdit = (brandId, brandTitle) => {
    setEditCell({ brandId, brandTitle });
  };

  useEffect(() => {
    if (isSuccess === false && brands.length === 0) {
      dispatch(getBrands());
    }
  }, []);

  brands?.forEach((brand, index) => {
    data.push({
      key: index + 1,
      title: brand.title,
      action: (
        <div className="w-100 d-flex align-items-center justify-content-evenly">
          <span className="" role="button">
            <BiMessageSquareEdit
              onClick={() => handleEdit(brand._id, brand.title)}
              className="fs-5 text-primary"
            />
          </span>
          <span role="button">
            <TfiTrash
              className="fs-5 text-danger"
              onClick={() =>
                showDeleteConfirm({
                  title: "Confirm",
                  action: deleteBrand({ brandId: brand._id, toast }),
                  text: "Are you sure you want delete this brand?",
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
      <AddBrand editCell={editCell} setEditCell={setEditCell} />
      <h5>Brand List</h5>
      <Table loading={isLoading} columns={columns} dataSource={data} />
    </div>
  );
};

export default BrandList;
