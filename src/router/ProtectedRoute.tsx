import { Typography } from '@mui/material';
import { Navigate } from 'react-router-dom';

type ProtectedRouteProps = {
    children: React.ReactNode;
};

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const isAuth = localStorage.getItem('isAuth');
    const role = localStorage.getItem('userRole');

    if (isAuth === null) {
        return <Navigate to="/login" replace />;
    } else {
        return <>{children}</>;
    }
};
