import { Navigate } from 'react-router-dom';

import { ProtectedRouteProps } from '../model/type';

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const user = JSON.parse(localStorage.getItem('user') as string);

    console.log(user);

    if (Object.keys(user).length === 0) {
        return <Navigate to="/login" replace />;
    } else {
        return <>{children}</>;
    }
};
