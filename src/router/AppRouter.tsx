import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import { AdminOrdersPage } from '../pages/AdminOrdersPage/AdminOrdersPage';
import { CloseOrderPage } from '../pages/CloseOrderPage/CloseOrderPage';
import { CreateNewOrderPage } from '../pages/CreateNewOrderPage/CreateNewOrderPage';
import { EditOrderPage } from '../pages/EditOrderPage/EditOrderPage';
import { LoginPage } from '../pages/LoginPage/LoginPage';
import { OrderDescPage } from '../pages/OrderDescPage/OrderDescPage';
import { OrdersPage } from '../pages/OrdersPage/OrdersPage';
import { PaymentOrderPage } from '../pages/PaymentOrderPage/PaymentOrderPage';
import { ProfilePage } from '../pages/ProfilePage/ProfilePage';
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
                        {currentUser.Role === 'admin' ? (
                            <AdminOrdersPage currentUser={currentUser as UserType} />
                        ) : (
                            <OrdersPage currentUser={currentUser as UserType} />
                        )}
                    </ProtectedRoute>
                }
            />
            <Route
                path="/createNewOrder"
                element={
                    <ProtectedRoute>
                        <CreateNewOrderPage currentUser={currentUser as UserType} />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/:id"
                element={
                    <ProtectedRoute>
                        <OrderDescPage currentUser={currentUser as UserType} />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/closeOrder/:chatId/:messageId/:orderId"
                element={
                    <ProtectedRoute>
                        <CloseOrderPage />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/profile"
                element={
                    <ProtectedRoute>
                        <ProfilePage currentUser={currentUser as UserType} />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/paymentOrder"
                element={
                    <ProtectedRoute>
                        <PaymentOrderPage currentUser={currentUser as UserType} />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/editOrder/:id"
                element={
                    <ProtectedRoute>
                        <EditOrderPage currentUser={currentUser as UserType} />
                    </ProtectedRoute>
                }
            />
        </Routes>
    );
};
