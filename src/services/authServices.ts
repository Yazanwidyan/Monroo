import api from "../utils/api";

const authServices = {
  login: (payload) => {
    const config = {
      headers: {
        "x-secret": "MonrooHeaders",
      },
    };
    return api
      .post(`/monroo/apis/user/login`, payload, config)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error;
      });
  },
  registerUser: (payload) => {
    const config = {
      headers: {
        "x-secret": "MonrooHeaders",
      },
    };
    return api
      .post(`/monroo/apis/user/register`, payload, config)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error;
      });
  },
};

export default authServices;
