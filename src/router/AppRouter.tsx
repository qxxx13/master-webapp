import { Route, Routes } from 'react-router-dom';

import { LoginPage } from '../pages/LoginPage/LoginPage';
import { OrdersPage } from '../pages/OrdersPage/OrdersPage';
import { ProtectedRoute } from './ProtectedRoute';

export const AppRouter = () => {
    return (
        <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route
                path="/"
                element={
                    <ProtectedRoute>
                        <OrdersPage />
                    </ProtectedRoute>
                }
            />
        </Routes>
    );
};
