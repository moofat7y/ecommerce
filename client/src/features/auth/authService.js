import api from "../../utils/api";

const login = async (data) => {
  const response = await api.post("/register/signin", data);
  return response.data;
};

const logout = async () => {
  const response = await api.get("/register/logout-user");
  return response.data;
};

const getStatus = async () => {
  const response = await api.get("/register/status");
  return response.data;
};

const authService = { login, logout, getStatus };

export default authService;
