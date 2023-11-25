import api from "../utils/api";

const providerServices = {
  getProviderEvents: (payload) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const config = {
      headers: {
        "x-access-token": user.token,
      },
    };
    return api
      .post(`/monroo/apis/provider/GetEvents`, payload, config)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw error;
      });
  },
  getUserMessages: () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const config = {
      headers: {
        "x-access-token": user.token,
      },
    };
    return api
      .post(`/monroo/apis/provider/getMessagesProfiles`, null, config)
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
      .post(`/monroo/apis/provider/sendMessage`, payload, config)
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
      .post(`/monroo/apis/provider/getDetailedMessages`, payload, config)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw error;
      });
  },
  getBookings: (payload) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const config = {
      headers: {
        "x-access-token": user.token,
      },
    };
    return api
      .post(`/monroo/apis/provider/getBookings`, payload, config)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw error;
      });
  },
};

export default providerServices;
