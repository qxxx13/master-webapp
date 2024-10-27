import { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { UserType } from '../shared/types/UserType';
import { LoginPage } from './LoginPage/LoginPage';
import { ProtectedRoute } from '../features/protected-route';
import { AdminOrdersPage } from './AdminOrdersPage/AdminOrdersPage';
import { OrdersPage } from './OrdersPage';
import { CreateNewOrderPage } from './CreateNewOrderPage/CreateNewOrderPage';
import { OrderDescPage } from './OrderDescPage/OrderDescPage';
import { CloseOrderPage } from './CloseOrderPage/CloseOrderPage';
import { ProfilePage } from './ProfilePage/ProfilePage';
import { AdminPaymentOrderPage } from './AdminPaymentOrderPage/AdminPaymentOrderPage';
import { PaymentOrderPage } from './PaymentOrderPage/PaymentOrderPage';
import { EditOrderPage } from './EditOrderPage/EditOrderPage';
import { UsersPage } from './UsersPage/UsersPage';
import { CompanyPage } from './CompanyPage/CompanyPage';
import { UserDescPage } from './UserDescPage/UserDescPage';
import { CreateNewUserPage } from './CreateNewUserPage/CreateNewUserPage';
import { EditUserPage } from './EditUserPage/EditUserPage';

export const AppRouter = () => {
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState<UserType | Record<string, unknown>>({});
    const [url, setUrl] = useState('');

    useEffect(() => {
        setCurrentUser(JSON.parse(localStorage.getItem('user') || '{}'));
        Telegram.WebApp.initDataUnsafe.start_param
            ? setUrl(`/${Telegram.WebApp.initDataUnsafe.start_param}`)
            : setUrl('/');
    }, []);

    if (url !== '') {
        navigate(url);
        setUrl('');
    }

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
                        <CloseOrderPage currentUser={currentUser as UserType} />
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
                path="/company"
                element={
                    <ProtectedRoute>
                        <CompanyPage currentUser={currentUser as UserType} />
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
