import api from "../../utils/api";

const getEnquires = async () => {
  const response = await api.get("enq");
  return response.data;
};

const updateEnquiry = async (status, enqId) => {
  const response = await api.patch(`enq/${enqId}`, { status });
  return response.data;
};

const deleteEnquiry = async (enqId) => {
  const response = await api.delete(`enq/${enqId}`);

  return response.data;
};

const enqService = { getEnquires, updateEnquiry, deleteEnquiry };
export default enqService;
