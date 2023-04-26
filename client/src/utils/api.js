import axios from "axios";
const baseUrl = "https://e-commerce-36sb.onrender.com/api/";

const api = axios.create({ baseURL: baseUrl, withCredentials: true });
api.interceptors.request.use(
  (req) => {
    const userToken = JSON.parse(window.localStorage.getItem("token"));

    userToken ? (req.headers["Authorization"] = "Bearer " + userToken) : "";
    return req;
  },
  (err) => {
    return Promise.reject(err);
  }
);

api.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalReq = err.config;
    const status = err.response ? err.response.status : null;
    if (status === 401) {
      try {
        const response = await axios.get(baseUrl + "register/refresh-user", {
          withCredentials: true,
        });

        window.localStorage.setItem(
          "token",
          JSON.stringify(response.data.accessToken)
        );
        const data = await api(originalReq);
        return data;
      } catch (error) {
        if (error.response.status === 417) {
          window.localStorage.removeItem("token");
          api.get("register/logout");
          window.location.replace("/");
          return;
        }
        throw error;
      }
    }
    if (status === 417) {
      window.localStorage.removeItem("token");
      window.location.replace("/");
      return;
    }
    throw err;
  }
);
export default api;
