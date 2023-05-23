import api from "../../utils/api";

const getColors = async () => {
  const response = await api.get("color");
  return response.data;
};

const createColor = async (data) => {
  const response = await api.put("color", data);

  return response.data;
};

const editColor = async (colorId, data) => {
  const response = await api.patch(`color/${colorId}`, data);
  return response.data;
};

const deleteColor = async (colorId) => {
  const response = await api.delete(`color/${colorId}`);
  return response.data;
};

const colorService = { getColors, createColor, editColor, deleteColor };

export default colorService;
