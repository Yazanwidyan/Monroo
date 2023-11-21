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
        return response.data;
      })
      .catch((error) => {
        throw error;
      });
  },
};

export default commonService;
