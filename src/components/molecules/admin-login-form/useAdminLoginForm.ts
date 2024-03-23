import { FormEvent } from 'react';

import useInput from '../../../hooks/useInput';

export default function useAdminLoginForm() {
    const [email, , onEmailChange] = useInput('');
    const [password, , onPasswordChange] = useInput('');

    function handleSubmit(event: FormEvent) {
        event.preventDefault();
    }

    return {
        email,
        password,
        onEmailChange,
        onPasswordChange,
        handleSubmit,
    };
}
