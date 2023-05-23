import api from "../../utils/api";

const getBrands = async () => {
  const response = await api.get("/brand");
  return response.data;
};

const createBrand = async (data) => {
  const response = await api.put("brand", data);

  return response.data;
};

const deleteBrand = async (brandId) => {
  const response = await api.delete(`brand/${brandId}`);

  return response.data;
};

const editBrand = async (data, brandId) => {
  const response = await api.patch(`brand/${brandId}`, data);

  return response.data;
};

const brandService = { getBrands, createBrand, deleteBrand, editBrand };

export default brandService;
