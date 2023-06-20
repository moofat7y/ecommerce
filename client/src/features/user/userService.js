import api from "../../utils/api";

const updateUser = async (data) => {
  const response = await api.patch("/user", data);
  return response.data;
};

const getCart = async (cart) => {
  const response = await api.post("/user/cart", { cart });

  return response.data;
};

const addToCart = async (prodId, color, size) => {
  const response = await api.put("/user/add-cart", { prodId, color, size });
  return response.data;
};

const updateCartQuantity = async (prodId, color, size, quantity) => {
  const response = await api.patch("/user/cart/prod-quantity", {
    prodId,
    color,
    size,
    quantity,
  });
  return response.data;
};

const createOrder = async (shipingaddress, cart) => {
  const response = await api.put("user/create-order", { shipingaddress, cart });
  return response.data;
};

const getOrders = async () => {
  const response = await api.get("/user/orders");
  return response.data;
};

const deleteUser = async (data) => {
  const response = await api.post("/user/delete-user", data);
  return response.data;
};

const userService = {
  getCart,
  addToCart,
  updateCartQuantity,
  createOrder,
  getOrders,
  updateUser,
  deleteUser,
};

export default userService;
