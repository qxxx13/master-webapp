import { Navigate } from 'react-router-dom';
import { RoleEnum } from '../types/UserType';

type ProtectedRouteProps = {
    children: React.ReactNode;
    admitLevel?: RoleEnum;
};

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const user = JSON.stringify(localStorage.getItem('user'));

    if (Object.keys(user).length === 0) {
        return <Navigate to="/login" replace />;
    } else {
        return <>{children}</>;
    }
};
