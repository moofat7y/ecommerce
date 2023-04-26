import api from "../../utils/api";

const getProdCategories = async () => {
  const response = await api.get("prodcategory");
  return response.data;
};

const prodcategoryService = {
  getProdCategories,
};
export default prodcategoryService;
