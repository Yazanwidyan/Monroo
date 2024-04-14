import api from '../utils/api';

const userServices = {
    getListProviders: (payload) => {
        const user = JSON.parse(localStorage.getItem('user'));
        const config = {
            headers: {
                'x-access-token': user.token,
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
    searchProviders: (payload) => {
        const user = JSON.parse(localStorage.getItem('user'));
        const config = {
            headers: {
                'x-access-token': user.token,
            },
        };
        return api
            .post(`/monroo/apis/user/SearchProviders`, payload, config)
            .then((response) => {
                return response;
            })
            .catch((error) => {
                throw error;
            });
    },
    createEvent: (payload) => {
        const user = JSON.parse(localStorage.getItem('user'));
        const config = {
            headers: {
                'x-access-token': user.token,
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
        const user = JSON.parse(localStorage.getItem('user'));
        const config = {
            headers: {
                'x-access-token': user.token,
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
    getUserMessages: () => {
        const user = JSON.parse(localStorage.getItem('user'));
        const config = {
            headers: {
                'x-access-token': user.token,
            },
        };
        return api
            .post(`/monroo/apis/user/getMessagesProfiles`, null, config)
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
            .post(`/monroo/apis/user/sendMessage`, payload, config)
            .then((response) => {
                return response;
            })
            .catch((error) => {
                throw error;
            });
    },
    requestPrivateEvent: (payload) => {
        const user = JSON.parse(localStorage.getItem('user'));
        const config = {
            headers: {
                'x-access-token': user.token,
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
        const user = JSON.parse(localStorage.getItem('user'));
        const config = {
            headers: {
                'x-access-token': user.token,
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
    getProviderProfile: (payload) => {
        const user = JSON.parse(localStorage.getItem('user'));
        const config = {
            headers: {
                'x-access-token': user.token,
            },
        };
        return api
            .post(`/monroo/apis/user/GetProviderProfile`, payload, config)
            .then((response) => {
                return response;
            })
            .catch((error) => {
                throw error;
            });
    },
    getReviews: (payload) => {
        const user = JSON.parse(localStorage.getItem('user'));
        const config = {
            headers: {
                'x-access-token': user.token,
            },
        };
        return api
            .post(`/monroo/apis/user/GetReviews`, payload, config)
            .then((response) => {
                return response;
            })
            .catch((error) => {
                throw error;
            });
    },
    addReview: (payload) => {
        const user = JSON.parse(localStorage.getItem('user'));
        const config = {
            headers: {
                'x-access-token': user.token,
            },
        };
        return api
            .post(`/monroo/apis/user/AddReview`, payload, config)
            .then((response) => {
                return response;
            })
            .catch((error) => {
                throw error;
            });
    },
};

export default userServices;
