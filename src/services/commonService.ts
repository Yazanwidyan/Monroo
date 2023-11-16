// apiService.js
import api from "../utils/api";

const CommonService = {
  getUserData: () => {
    return api
      .get(`/posts`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error;
      });
  },

  postUserData: (userData) => {
    return api
      .post("/users", userData)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error;
      });
  },
};

export default CommonService;
