import api from "../../utils/api";

const getProdCategories = async () => {
  const response = await api.get("prodcategory");
  return response.data;
};

const createCategory = async (data) => {
  const response = await api.put("prodcategory", data);
  return response.data;
};

const deleteCategory = async (catId) => {
  const response = await api.delete(`prodcategory/${catId}`);
  return response.data;
};

const editCategory = async (data, catId) => {
  const response = await api.patch(`prodcategory/${catId}`, data);
  return response.data;
};

const prodcategoryService = {
  getProdCategories,
  createCategory,
  editCategory,
  deleteCategory,
};
export default prodcategoryService;
