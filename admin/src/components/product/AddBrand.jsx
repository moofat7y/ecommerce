import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import BtnLoading from "../loading/BtnLoading";
import { createBrand, editBrand } from "../../features/brands/brandSlice";
import { BiRotateLeft } from "react-icons/bi";
import { toast } from "react-toastify";
const AddBrand = ({ editCell, setEditCell }) => {
  const dispatch = useDispatch();
  const { brand } = useSelector((state) => state);
  const { isLoading } = brand;
  const brandValue = useRef();
  if (editCell.brandId) {
    brandValue.current.value = editCell.brandTitle;
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!brandValue.current.value) {
      return;
    }
    if (editCell.brandId) {
      const data = { title: brandValue.current.value };
      const response = await dispatch(
        editBrand({ data, brandId: editCell.brandId, toast })
      );
      if (!response.error) {
        brandValue.current.value = "";
      }
      return;
    }
    const data = { title: brandValue.current.value };
    const response = await dispatch(createBrand({ data, toast }));
    if (!response.error) {
      brandValue.current.value = "";
    }
  };
  return (
    <div className="mb-3">
      <div className="header mb-1 d-flex align-items-center">
        <h6 className="mb-0">{editCell.brandId ? "Edit" : "Add"} Brand</h6>
        <BiRotateLeft
          role="button"
          className={`ms-3 fs-6 text-primary ${
            editCell.brandId ? "d-block" : "d-none"
          }`}
          onClick={() => setEditCell({})}
        />
      </div>
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="d-flex aling-items-center gap-3"
        action=""
      >
        <input ref={brandValue} type="text" className="form-control" />
        <BtnLoading
          label={editCell.brandId ? "Edit" : "Add"}
          bgcolor="btn-primary"
          loading={isLoading}
          extraClass="px-4"
        />
      </form>
    </div>
  );
};

export default AddBrand;
