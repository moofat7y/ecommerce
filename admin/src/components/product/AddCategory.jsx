import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import BtnLoading from "../loading/BtnLoading";
import {
  createCategory,
  editCategory,
} from "../../features/pcategory/pcategorySlice";
import { BiRotateLeft } from "react-icons/bi";
import { toast } from "react-toastify";
const AddCategory = ({ editCell, setEditCell }) => {
  const dispatch = useDispatch();
  const { pCategory } = useSelector((state) => state);
  const { isLoading } = pCategory;
  const categoryValue = useRef();
  if (editCell.catId) {
    categoryValue.current.value = editCell.categoryTitle;
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!categoryValue.current.value) {
      return;
    }
    if (editCell.catId) {
      const data = { title: categoryValue.current.value };
      const response = await dispatch(
        editCategory({ data, catId: editCell.catId, toast })
      );
      if (!response.error) {
        categoryValue.current.value = "";
      }
      return;
    }
    const data = { title: categoryValue.current.value };
    const response = await dispatch(createCategory({ data, toast }));
    if (!response.error) {
      categoryValue.current.value = "";
    }
  };
  return (
    <div className="mb-3">
      <div className="header mb-1 d-flex align-items-center">
        <h6 className="mb-0">{editCell.catId ? "Edit" : "Add"} Category</h6>
        <BiRotateLeft
          role="button"
          className={`ms-3 fs-6 text-primary ${
            editCell.catId ? "d-block" : "d-none"
          }`}
          onClick={() => setEditCell({})}
        />
      </div>
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="d-flex aling-items-center gap-3"
        action=""
      >
        <input ref={categoryValue} type="text" className="form-control" />
        <BtnLoading
          label={editCell.catId ? "Edit" : "Add"}
          bgcolor="btn-primary"
          loading={isLoading}
          extraClass="px-4"
        />
      </form>
    </div>
  );
};

export default AddCategory;
