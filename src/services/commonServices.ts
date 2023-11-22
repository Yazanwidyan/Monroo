import api from "../utils/api";

const commonService = {
  getCategories: () => {
    const config = {
      headers: {
        "x-secret": "MonrooHeaders",
      },
    };
    return api
      .post(`/monroo/apis/lookups/getCategories`, null, config)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw error;
      });
  },
  getSubCategories: (payload) => {
    const config = {
      headers: {
        "x-secret": "MonrooHeaders",
      },
    };
    return api
      .post(`/monroo/apis/lookups/getSubCategories`, payload, config)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw error;
      });
  },
  getProviderlookups: (payload) => {
    const config = {
      headers: {
        "x-secret": "MonrooHeaders",
      },
    };
    return api
      .post(`/monroo/apis/lookups/GetProviderLookups`, payload, config)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw error;
      });
  },
};

export default commonService;
