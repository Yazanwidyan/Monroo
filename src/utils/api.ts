import axios from "axios";

const api = axios.create({
  baseURL: "https://my-json-server.typicode.com/typicode/demo",
  timeout: 10000,
});

// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    // Retrieve token from wherever it's stored (e.g., localStorage)
    const token = localStorage.getItem("token");

    // If a token exists, set it in the request headers
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
