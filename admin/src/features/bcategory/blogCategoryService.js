import api from "../../utils/api";

const getBlogCategories = async () => {
  const response = await api.get("blogcategory");
  return response.data;
};

const blogCategoryService = { getBlogCategories };
export default blogCategoryService;
