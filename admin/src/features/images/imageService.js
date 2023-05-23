import api from "../../utils/api";
const uploadImage = async (data) => {
  const response = await api.put("product/upload-image", data);
  return response.data;
};

const deleteImage = async (imgId) => {
  const response = await api.post(`product/delete-image`, {
    imgId,
  });

  return response.data;
};

const imageService = { uploadImage, deleteImage };

export default imageService;
