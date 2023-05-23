import api from "../../utils/api";

const getUsers = async () => {
  const response = await api.get("user");
  return response.data;
};

const updateUser = async (userId, role) => {
  const response = await api.patch(`user/byadmin/${userId}`, { role });
  return response.data;
};
const customerService = { getUsers, updateUser };

export default customerService;
