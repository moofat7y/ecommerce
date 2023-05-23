import api from "../../utils/api";

const getOrders = async () => {
  const response = await api.get("order");
  return response.data;
};

const getOrderById = async (orderId) => {
  const response = await api.get(`order/${orderId}`);
  return response.data;
};

const updateOrderStatus = async (orderId, status) => {
  const response = await api.patch(`order/${orderId}`, { status });
  return response.data;
};

const deleteOrder = async (orderId) => {
  const response = await api.delete(`order/${orderId}`);
  return response.data;
};
const orderService = {
  getOrders,
  getOrderById,
  updateOrderStatus,
  deleteOrder,
};
export default orderService;
