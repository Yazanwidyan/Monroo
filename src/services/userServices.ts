import api from "../utils/api";

const userServices = {
  getListProviders: (payload) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const config = {
      headers: {
        "x-access-token": user.token,
      },
    };
    return api
      .post(`/monroo/apis/user/ListProviders`, payload, config)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw error;
      });
  },
  createEvent: (payload) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const config = {
      headers: {
        "x-access-token": user.token,
      },
    };
    return api
      .post(`/monroo/apis/user/CreateEvent`, payload, config)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw error;
      });
  },
  getUserEvents: (payload) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const config = {
      headers: {
        "x-access-token": user.token,
      },
    };
    return api
      .post(`/monroo/apis/user/GetUserEvents`, payload, config)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw error;
      });
  },
  getUserMessages: (payload) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const config = {
      headers: {
        "x-access-token": user.token,
      },
    };
    return api
      .post(`/monroo/apis/user/getMessagesProfiles`, payload, config)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw error;
      });
  },
  sendMessage: (payload) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const config = {
      headers: {
        "x-access-token": user.token,
      },
    };
    return api
      .post(`/monroo/apis/user/sendMessage`, payload, config)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw error;
      });
  },
  requestPrivateEvent: (payload) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const config = {
      headers: {
        "x-access-token": user.token,
      },
    };
    return api
      .post(`/monroo/apis/user/requestEvent`, payload, config)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw error;
      });
  },
  getDetailedMessages: (payload) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const config = {
      headers: {
        "x-access-token": user.token,
      },
    };
    return api
      .post(`/monroo/apis/user/getDetailedMessages`, payload, config)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw error;
      });
  },
};

export default userServices;
