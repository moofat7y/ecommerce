import api from "../../utils/api";

const getProducts = async (query) => {
  const response = await api.get(
    `/product/?limit=20&quantity[gt]=0&${query ? query : ""}`
  );
  return response.data;
};

const getFeaturedProducts = async (query) => {
  const response = await api.get(
    `/product/?quantity[gt]=0&${query ? query : ""}`
  );
  return response.data;
};

const getPopularProducts = async (query) => {
  const response = await api.get(
    `/product/?quantity[gt]=0&${query ? query : ""}`
  );
  return response.data;
};

const getSingleProduct = async (prodId) => {
  const response = await api.get(`product/${prodId}`);

  return response.data;
};

const rateProduct = async (data) => {
  const response = await api.put("product/rate", data);
  return response.data;
};

const productService = {
  getProducts,
  getFeaturedProducts,
  getPopularProducts,
  getSingleProduct,
  rateProduct,
};
export default productService;
