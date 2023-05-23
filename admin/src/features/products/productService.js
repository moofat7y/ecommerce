import api from "../../utils/api";

const getProducts = async () => {
  const response = await api.get("product");
  return response.data;
};

const createProduct = async (data) => {
  const response = await api.put("/product", data);

  return response.data;
};

const updateProduct = async (data, prodId) => {
  const response = await api.patch(`/product/${prodId}`, data);

  return response.data;
};

const deleteProduct = async (prodId) => {
  const response = await api.delete(`/product/${prodId}`);

  return response.data;
};

const productsService = {
  getProducts,
  createProduct,
  deleteProduct,
  updateProduct,
};
export default productsService;
