import api from '../utils/api';

const authServices = {
    loginUser: (payload) => {
        const config = {
            headers: {
                'x-secret': 'MonrooHeaders',
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
                'x-secret': 'MonrooHeaders',
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
                'x-secret': 'MonrooHeaders',
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
    registerProvider: (payload) => {
        const config = {
            headers: {
                'x-secret': 'MonrooHeaders',
                'Content-Type': 'multipart/form-data',
            },
        };
        return api
            .post(`/monroo/apis/provider/register`, payload, config)
            .then((response) => {
                return response;
            })
            .catch((error) => {
                throw error;
            });
    },
    socialLoginUser: (payload) => {
        const config = {
            headers: {
                'x-secret': 'MonrooHeaders',
            },
        };
        return api
            .post(`/monroo/apis/user/loginSocial`, payload, config)
            .then((response) => {
                return response;
            })
            .catch((error) => {
                throw error;
            });
    },
    socialLoginProvider: (payload) => {
        const config = {
            headers: {
                'x-secret': 'MonrooHeaders',
            },
        };
        return api
            .post(`/monroo/apis/provider/loginSocial`, payload, config)
            .then((response) => {
                return response;
            })
            .catch((error) => {
                throw error;
            });
    },
    socialRegisterUser: (payload) => {
        const config = {
            headers: {
                'x-secret': 'MonrooHeaders',
            },
        };
        return api
            .post(`/monroo/apis/user/SocialRegister`, payload, config)
            .then((response) => {
                return response;
            })
            .catch((error) => {
                throw error;
            });
    },
};

export default authServices;
