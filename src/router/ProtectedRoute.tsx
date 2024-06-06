import { Navigate } from 'react-router-dom';

type ProtectedRouteProps = {
    children: React.ReactNode;
};

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const isAuth = localStorage.getItem('isAuth');

    if (isAuth === 'false' || isAuth === null) {
        return <Navigate to="/login" replace />;
    } else {
        return <>{children}</>;
    }
};
