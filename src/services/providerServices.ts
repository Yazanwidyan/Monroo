import api from '../utils/api';

const providerServices = {
    getProviderEvents: (payload) => {
        const user = JSON.parse(localStorage.getItem('user'));
        const config = {
            headers: {
                'x-access-token': user.token,
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
    getOneEvent: (payload) => {
        const user = JSON.parse(localStorage.getItem('user'));
        const config = {
            headers: {
                'x-access-token': user.token,
            },
        };
        return api
            .post(`/monroo/apis/provider/getOneEvent`, payload, config)
            .then((response) => {
                return response;
            })
            .catch((error) => {
                throw error;
            });
    },
    getUserMessages: () => {
        const user = JSON.parse(localStorage.getItem('user'));
        const config = {
            headers: {
                'x-access-token': user.token,
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
        const user = JSON.parse(localStorage.getItem('user'));
        const config = {
            headers: {
                'x-access-token': user.token,
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
        const user = JSON.parse(localStorage.getItem('user'));
        const config = {
            headers: {
                'x-access-token': user.token,
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
    getAllProvider: () => {
        const user = JSON.parse(localStorage.getItem('user'));
        const config = {
            headers: {
                'x-access-token': user.token,
            },
        };
        return api
            .post(`/monroo/apis/provider/getAllProvider`, null, config)
            .then((response) => {
                return response;
            })
            .catch((error) => {
                throw error;
            });
    },
    getMyReviews: () => {
        const user = JSON.parse(localStorage.getItem('user'));
        const config = {
            headers: {
                'x-access-token': user.token,
            },
        };
        return api
            .post(`/monroo/apis/provider/GetMyReviews`, null, config)
            .then((response) => {
                return response;
            })
            .catch((error) => {
                throw error;
            });
    },
    updateProvider: (payload) => {
        const user = JSON.parse(localStorage.getItem('user'));
        const config = {
            headers: {
                'x-access-token': user.token,
                'Content-Type': 'multipart/form-data',
            },
        };
        return api
            .post(`/monroo/apis/provider/UpdateProvider`, payload, config)
            .then((response) => {
                return response;
            })
            .catch((error) => {
                throw error;
            });
    },
    requestConnection: (payload) => {
        const user = JSON.parse(localStorage.getItem('user'));
        const config = {
            headers: {
                'x-access-token': user.token,
            },
        };
        return api
            .post(`/monroo/apis/provider/RequestConnection`, payload, config)
            .then((response) => {
                return response;
            })
            .catch((error) => {
                throw error;
            });
    },
    getBookings: () => {
        const user = JSON.parse(localStorage.getItem('user'));
        const config = {
            headers: {
                'x-access-token': user.token,
            },
        };
        return api
            .post(`/monroo/apis/provider/getBookings`, null, config)
            .then((response) => {
                return response;
            })
            .catch((error) => {
                throw error;
            });
    },
};

export default providerServices;
