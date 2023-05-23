import React, { useEffect, useState } from "react";
import { RxTrash } from "react-icons/rx";
import { useDispatch } from "react-redux";
import { uploadImage } from "../../features/images/imageSlice";
import { notifyError } from "../../utils/helpers";
import { deleteImage } from "../../features/images/imageSlice";
const ImgItem = ({ image, setSelectedImages, isLoading }) => {
  const dispatch = useDispatch();

  const handleDeleteImage = async () => {
    if (!image.notUploaded) {
      await dispatch(deleteImage({ imgId: image.public_id }));
    }
    setSelectedImages((prev) =>
      prev.filter((img) => img.public_id !== image.public_id)
    );
  };
  return (
    <div className="uploaded-image p-2">
      <div className="image-control position-relative w-100 h-100">
        <img
          className={`w-100 h-100 ${image.notUploaded ? "loading" : ""}`}
          src={image.secure_url}
          alt="uploaded-image"
        />

        {isLoading ? null : (
          <div className="control d-flex justify-content-center align-items-center w-100 h-100 position-absolute top-0 start-0">
            <RxTrash
              className="text-white fs-5"
              onClick={() => handleDeleteImage()}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ImgItem;
