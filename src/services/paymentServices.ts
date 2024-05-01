import api from '../utils/api';

const paymentService = {
    checkoutSim: (payload) => {
        const user = JSON.parse(localStorage.getItem('user'));
        const config = {
            headers: {
                'x-access-token': user.token,
                'x-secret': 'MonrooHeaders',
            },
        };
        return api
            .post(`/monroo/apis/payment/checkoutSim`, payload, config)
            .then((response) => {
                return response;
            })
            .catch((error) => {
                throw error;
            });
    },
};

export default paymentService;
