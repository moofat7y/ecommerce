import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  getProducts,
  deleteProduct,
  setUpdateProduct,
} from "../../features/products/productSlice";
import { resetImageState } from "../../features/images/imageSlice";
import { useNavigate } from "react-router-dom";
import { BiMessageSquareEdit } from "react-icons/bi";
import { TfiTrash } from "react-icons/tfi";
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
    title: "Brand",
    dataIndex: "brand",
  },
  {
    title: "Category",
    dataIndex: "category",
  },
  {
    title: "Color",
    dataIndex: "color",
  },
  {
    title: "Price",
    dataIndex: "price",
    sorter: (a, b) => a.price - b.price,
  },
  {
    title: "Tag",
    dataIndex: "tag",
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];
const ProductList = () => {
  const { product } = useSelector((state) => state);
  const { isLoading, isSuccess, products } = product;
  const dispatch = useDispatch();
  const data = [];
  const navigate = useNavigate();

  const handleEdit = async (prod) => {
    await dispatch(resetImageState());
    await dispatch(setUpdateProduct(prod));
    navigate("/dashboard/catalog/add-product");
  };

  useEffect(() => {
    if (products.length === 0 && isSuccess === false) {
      dispatch(getProducts());
    }
  }, []);

  products?.forEach((prod, index) => {
    data.push({
      key: index + 1,
      title:
        prod.title.length > 40
          ? prod.title.substring(0, 40) + "..."
          : prod.title,
      brand: prod.brand,
      category: prod.category,
      color: prod.colors?.map((color, index) => (
        <span key={index}>{color}, </span>
      )),
      price: prod.price,
      tag: prod.tag || "none",
      action: (
        <div className="w-100 d-flex align-items-center justify-content-evenly">
          <span onClick={() => handleEdit(prod)} role="button">
            <BiMessageSquareEdit className="fs-5 text-primary" />
          </span>
          <span role="button">
            <TfiTrash
              className="fs-5 text-danger"
              onClick={() =>
                showDeleteConfirm({
                  title: "Confirm",
                  action: deleteProduct({ prodId: prod._id, toast }),
                  text: "Are you sure you want delete this product?",
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
      <h5>Porducts</h5>
      {isLoading ? "loading" : null}
      <Table loading={isLoading} columns={columns} dataSource={data} />
    </div>
  );
};

export default ProductList;
