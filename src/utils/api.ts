import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
});
api.interceptors.response.use(
  (response) => {
    if (response?.data?.status == 200) {
      return response?.data?.data;
    } else {
      return Promise.reject(response?.data?.data);
    }
  },
  (error) => {
    return Promise.reject(error.message);
  }
);

export default api;
