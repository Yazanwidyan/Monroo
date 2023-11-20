// apiService.js
import api from "../utils/api";

const commonService = {
  getUserData: () => {
    const config = {
      headers: {
        "x-secret": "MonrooHeaders",
      },
    };
    return api
      .post(`/monroo/apis/lookups/getAllSubCategories`, null, config)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error;
      });
  },

  register: (info) => {
    const config = {
      headers: {
        "x-secret": "MonrooHeaders",
      },
    };
    return api
      .post(`/monroo/apis/user/register`, info, config)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error;
      });
  },
  registerProvider: (info) => {
    const config = {
      headers: {
        "x-secret": "MonrooHeaders",
      },
    };
    return api
      .post(`/monroo/apis/provider/register`, info, config)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error;
      });
  },
  login: (info) => {
    const config = {
      headers: {
        "x-secret": "MonrooHeaders",
      },
    };
    return api
      .post(`/monroo/apis/user/login`, info, config)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error;
      });
  },
};

export default commonService;
