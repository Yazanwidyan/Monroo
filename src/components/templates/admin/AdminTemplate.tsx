// import { Outlet, NavLink, useNavigate } from 'react-router-dom';

// import styles from './AdminTemplate.module.scss';
// import ProtectedElement from '../../molecules/protected-element/ProtectedElement';

export default function AdminTemplate() {
    // const navigate = useNavigate();

    return (
        <div></div>
        // <div className={styles.body}>
        //     <div className={styles.header}>
        //         <nav className={styles.nav}>
        //             {!adminInfo?.adminId ? (
        //                 <NavLink to="login">Login</NavLink>
        //             ) : (
        //                 <Button
        //                     onClick={() => {
        //                         logout();
        //                         navigate('login');
        //                     }}
        //                     variant="navLink"
        //                 >
        //                     Logout
        //                 </Button>
        //             )}
        //             <ProtectedElement allowedRoles={['Admin']}>
        //                 <NavLink to="dashboard">Dashboard</NavLink>
        //             </ProtectedElement>
        //             <ProtectedElement allowedRoles={['Admin']}>
        //                 <NavLink to="register-admin">Register Admin</NavLink>
        //             </ProtectedElement>
        //             <ProtectedElement allowedRoles={['Admin', 'Observer']}>
        //                 <NavLink to="create-user">Create User</NavLink>
        //             </ProtectedElement>
        //         </nav>
        //     </div>
        //     <main className={styles.main}>
        //         <Outlet />
        //     </main>
        // </div>
    );
}
