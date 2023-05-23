import api from "../../utils/api";

const getOrdersInEachMonth = async () => {
  const response = await api.get("order/month");

  return response.data;
};

const getDashboardDetails = async () => {
  const response = await api.get("order/dashboard");
  return response.data;
};

const dashboardService = { getOrdersInEachMonth, getDashboardDetails };

export default dashboardService;
