import api from "../../utils/api";
const Login = async (userData) => {
  const response = await api.post("/register/admin-signin", userData);
  return response.data;
};

const getUserStatus = async () => {
  const response = await api.get("register/user-status");
  return response.data;
};

const logOut = async () => {
  const response = await api.get("register/logout");
  return response.data;
};

const authService = { Login, getUserStatus, logOut };

export default authService;
