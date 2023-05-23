import React, { useEffect, useState } from "react";
import { BsPlusLg } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import ImgItem from "./ImgItem";
import { notifyWarning } from "../../utils/helpers";
import { setEditImage, uploadImage } from "../../features/images/imageSlice";

const ImgListUploader = () => {
  const [selectedImages, setSelectedImages] = useState([]);
  const { image, product } = useSelector((state) => state);
  const { images, isLoading } = image;
  const { updatedProduct } = product;
  const dispatch = useDispatch();

  const onSelectFile = async (event) => {
    if (!event.target.files) {
      return;
    }
    if (selectedImages.length + event.target.files.length > 10) {
      notifyWarning("The maximum number if images is 10");
      return;
    }
    const selectedFiles = event.target.files;
    const selectedFilesArray = Array.from(selectedFiles);
    const imagesArray = selectedFilesArray.map((file) => {
      return {
        public_id: URL.createObjectURL(file),
        secure_url: URL.createObjectURL(file),
        file: file,
        notUploaded: true,
      };
    });
    setSelectedImages((prev) => [...prev, ...imagesArray]);
  };

  const image_list = selectedImages?.map((img) => {
    return (
      <ImgItem
        key={img.public_id}
        image={img}
        isLoading={isLoading}
        setSelectedImages={setSelectedImages}
      />
    );
  });

  useEffect(() => {
    const timeId = setTimeout(() => {
      const notUploadedImages = selectedImages
        .filter((image) => image.notUploaded)
        .map((img) => img.file);
      if (notUploadedImages.length > 0) {
        dispatch(uploadImage({ data: notUploadedImages }));
      }
    }, [2000]);

    return () => clearTimeout(timeId);
  }, [selectedImages]);

  useEffect(() => {
    setSelectedImages(images);
  }, [images]);

  useEffect(() => {
    if (updatedProduct?.images?.length > 0) {
      setSelectedImages(updatedProduct.images);
      dispatch(setEditImage(updatedProduct.images));
    }
  }, [updatedProduct]);
  return (
    <div className="products__img-upload d-flex flex-wrap">
      {image_list}

      {selectedImages.length >= 10 ? null : (
        <div className="uploader">
          <label
            htmlFor="prod-images"
            role="button"
            className="w-100 h-100 d-flex flex-column align-items-center justify-content-center"
          >
            <BsPlusLg className="mb-2" />
            <span className="fs-7 fw-light">Upload</span>
          </label>
          <input
            onChange={onSelectFile}
            multiple
            accept="image/png , image/jpeg , image/webg"
            id="prod-images"
            name="images"
            type="file"
            className="d-none"
          />
        </div>
      )}
    </div>
  );
};

export default ImgListUploader;
