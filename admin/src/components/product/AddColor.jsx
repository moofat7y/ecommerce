import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import BtnLoading from "../loading/BtnLoading";
import { createColor, editColor } from "../../features/color/colorSlice";
import { BiRotateLeft } from "react-icons/bi";
import { toast } from "react-toastify";
const AddColor = ({ editCell, setEditCell }) => {
  const dispatch = useDispatch();
  const { color } = useSelector((state) => state);
  const { isLoading } = color;
  const colorValue = useRef();
  if (editCell.colorId) {
    colorValue.current.value = editCell.colorTitle;
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!colorValue.current.value) {
      return;
    }
    if (editCell.colorId) {
      const data = { title: colorValue.current.value };
      const response = await dispatch(
        editColor({ data, colorId: editCell.colorId, toast })
      );
      if (!response.error) {
        colorValue.current.value = "";
      }
      return;
    }
    const data = { title: colorValue.current.value };
    const response = await dispatch(createColor({ data, toast }));
    if (!response.error) {
      colorValue.current.value = "";
    }
  };
  return (
    <div className="mb-3">
      <div className="header mb-1 d-flex align-items-center">
        <h6 className="mb-0">{editCell.colorId ? "Edit" : "Add"} Color</h6>
        <BiRotateLeft
          role="button"
          className={`ms-3 fs-6 text-primary ${
            editCell.colorId ? "d-block" : "d-none"
          }`}
          onClick={() => setEditCell({})}
        />
      </div>
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="d-flex aling-items-center gap-3"
        action=""
      >
        <input ref={colorValue} type="text" className="form-control" />
        <BtnLoading
          label={editCell.colorId ? "Edit" : "Add"}
          bgcolor="btn-primary"
          loading={isLoading}
          extraClass="px-4"
        />
      </form>
    </div>
  );
};

export default AddColor;
