import api from "../../utils/api";

const getWishlist = async () => {
  const response = await api.get("/user/wishlist");

  return response.data;
};

const addToWishlist = async (prodId) => {
  const response = await api.put("/user/add-wishlist", { prodId });
  return response.data;
};

const wishlistService = { getWishlist, addToWishlist };

export default wishlistService;
