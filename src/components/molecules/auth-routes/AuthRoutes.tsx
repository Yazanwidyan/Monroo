import { useContext } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { UserContext } from '../../../contexts/UserContext';

export default function AuthRoutes() {
    const { user } = useContext(UserContext);

    // Check if user exists before determining logged in status
    const isLoggedIn = user !== null && user !== undefined;

    console.log('user', user);

    return !isLoggedIn ? <Outlet /> : <Navigate to={user.isMainUser ? '/home' : '/timeline'} />;
}
