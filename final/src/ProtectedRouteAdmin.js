import { Outlet, Navigate } from 'react-router-dom';

export const ProtectedRouteAdmin = () => {
    const auth = localStorage.getItem('authToken');
    const userType = localStorage.getItem('userType');

    // If auth token exists and user type is admin, allow access
    if (auth && userType === 'Admin') {
        return <Outlet />;
    } else {
        // Otherwise, redirect to access denied page
        return <Navigate to="/accessDenied" />;
    }
};
