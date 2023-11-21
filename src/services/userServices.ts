import api from "../utils/api";

const userServices = {
  getListProviders: (payload) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const config = {
      headers: {
        Authorization: "Bearer" + " " + user.token,
      },
    };
    return api
      .post(`/monroo/apis/user/ListProviders`, payload, config)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error;
      });
  },
};

export default userServices;
