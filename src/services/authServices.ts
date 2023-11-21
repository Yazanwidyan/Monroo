import api from "../utils/api";

const authServices = {
  loginUser: (payload) => {
    const config = {
      headers: {
        "x-secret": "MonrooHeaders",
      },
    };
    return api
      .post(`/monroo/apis/user/login`, payload, config)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw error;
      });
  },
  loginProvider: (payload) => {
    const config = {
      headers: {
        "x-secret": "MonrooHeaders",
      },
    };
    return api
      .post(`/monroo/apis/provider/login`, payload, config)
      .then((response) => {
        return response;
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
        return response;
      })
      .catch((error) => {
        throw error;
      });
  },
};

export default authServices;
