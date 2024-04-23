import { useNavigate } from 'react-router-dom';

import LoginForm from '../../../organisms/login-form/LoginForm';
import { LoginInput } from '../../../../models/LoginInput';
import { useContext } from 'react';
import { UserContext } from '../../../../contexts/UserContext';
import authServices from '../../../../services/authServices';
import useCustomToast from '../../../../hooks/useCustomToast';

export default function LoginProvider({ selectedTab, onClose }) {
    const navigate = useNavigate();
    const { showToast } = useCustomToast();
    const { updateUser } = useContext(UserContext);

    return (
        <LoginForm
            selectedTab={selectedTab}
            onClose={onClose}
            handleSubmit={async (loginInput: LoginInput) => {
                try {
                    const res = await authServices.loginProvider(loginInput);
                    updateUser(res.data);
                    if (!res.data.hasOwnProperty('dob')) {
                        navigate('/home', { replace: true });
                    } else {
                        navigate('/timeline', { replace: true });
                    }
                } catch (error) {
                    showToast(error, { status: 'error' });
                }
            }}
        />
    );
}
