import api from "../../utils/api";

const getBrands = async () => {
  const response = await api.get("/brand");
  return response.data;
};

const brandService = { getBrands };

export default brandService;
