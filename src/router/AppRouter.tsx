import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import { LoginPage } from '../pages/LoginPage/LoginPage';
import { OrderDescPage } from '../pages/OrderDescPage/OrderDescPage';
import { OrdersPage } from '../pages/OrdersPage/OrdersPage';
import { UserType } from '../types/UserType';
import { ProtectedRoute } from './ProtectedRoute';

export const AppRouter = () => {
    const [currentUser, setCurrentUser] = useState<UserType | Record<string, unknown>>({});

    useEffect(() => {
        setCurrentUser(JSON.parse(localStorage.getItem('user') || '{}'));
    }, []);

    return (
        <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route
                path="/"
                element={
                    <ProtectedRoute>
                        <OrdersPage currentUser={currentUser as UserType} />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/:id"
                element={
                    <ProtectedRoute>
                        <OrderDescPage />
                    </ProtectedRoute>
                }
            />
        </Routes>
    );
};
