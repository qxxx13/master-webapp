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
import { UsersPage } from '../pages/UsersPage/UsersPage';
import { UserDescPage } from '../pages/UserDescPage/UserDescPage';
import { CreateNewUserPage } from '../pages/CreateNewUserPage/CreateNewUserPage';
import { EditUserPage } from '../pages/EditUserPage/EditUserPage';
import { AdminPaymentOrderPage } from '../pages/AdminPaymentOrderPage/AdminPaymentOrderPage';

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
                        {currentUser.Role === 'admin' ? (
                            <AdminPaymentOrderPage currentUser={currentUser as UserType} />
                        ) : (
                            <PaymentOrderPage currentUser={currentUser as UserType} />
                        )}
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
            <Route
                path="/users"
                element={
                    <ProtectedRoute>
                        <UsersPage currentUser={currentUser as UserType} />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/user/:id"
                element={
                    <ProtectedRoute>
                        <UserDescPage currentUser={currentUser as UserType} />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/createNewUser"
                element={
                    <ProtectedRoute>
                        <CreateNewUserPage currentUser={currentUser as UserType} />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/editUser/:id"
                element={
                    <ProtectedRoute>
                        <EditUserPage currentUser={currentUser as UserType} />
                    </ProtectedRoute>
                }
            />
        </Routes>
    );
};
