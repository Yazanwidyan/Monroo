import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.response.use(
  (response) => {
    if (response?.data?.status == 200) {
      return response?.data;
    } else {
      return Promise.reject(response?.data?.data);
    }
  },
  (error) => {
    return Promise.reject(error.message);
  }
);

export default api;
