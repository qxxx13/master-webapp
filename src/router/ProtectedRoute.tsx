import { Navigate } from 'react-router-dom';

import { RoleEnum } from '../types/UserType';

type ProtectedRouteProps = {
    children: React.ReactNode;
    admitLevel?: RoleEnum;
};

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const user = JSON.parse(localStorage.getItem('user') as string);

    if (user && Object.keys(user).length > 0) {
        return <>{children}</>;
    } else {
        return <Navigate to="/login" replace />;
    }
};
