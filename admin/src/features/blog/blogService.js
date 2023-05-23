import api from "../../utils/api";

const getBlogs = async () => {
  const response = await api.get("/blog");
  return response.data;
};

const blogService = { getBlogs };

export default blogService;
