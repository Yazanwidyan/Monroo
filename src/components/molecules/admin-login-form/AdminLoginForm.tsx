import { LoginInput } from '../../../models/LoginInput';
import styles from './AdminLoginForm.module.scss';
import useAdminLoginForm from './useAdminLoginForm';

export type AdminLoginFormProps = {
    isLoading: boolean;
    onSubmit(loginInput: LoginInput): Promise<void>;
};

export default function AdminLoginForm() {
    const state = useAdminLoginForm();

    return (
        <form className={styles.form} onSubmit={state.handleSubmit}>
            <div className={styles.tools}></div>
        </form>
    );
}
