import { Button, CircularProgress, MenuItem, Select, SelectChangeEvent, Stack, Typography } from '@mui/material';
import { RoleEnum, UserType } from '../../types/UserType';
import { useEffect, useState } from 'react';
import { $usersPaymentStoreGetStatus, fetchAllUsersFx } from './model/usersPaymentStore';
import { $ordersPaymentStoreGetStatus, fetchOrdersFx } from './model/ordersPaymentStore';
import { useUnit } from 'effector-react';
import { OrderCard } from '../../components/OrderCard/OrderCard';
import { deliveredOrder } from '../OrderDescPage/api/workOrderApi';
import { $updateOrderStore, setUpdate } from '../OrderDescPage/model/setUpdateOrderStore';
import { MainButton } from '@vkruglikov/react-telegram-web-app';

export const AdminPaymentOrderPage: React.FC<{ currentUser: UserType }> = ({ currentUser }) => {
    const [selectedUserId, setSelectedUserId] = useState(
        localStorage.getItem('selectedUserId') || String(currentUser.Id),
    );

    const update = useUnit($updateOrderStore);

    const { data: users, loading: usersLoading } = useUnit($usersPaymentStoreGetStatus);
    const { data, loading } = useUnit($ordersPaymentStoreGetStatus);

    const menuItems = users.map((user) => {
        if (user.Role === RoleEnum.master) {
            return (
                <MenuItem value={user.Id} key={user.Id}>
                    {user.UserName}
                </MenuItem>
            );
        }
    });

    const OrderList = data.data.map((order, index) => <OrderCard order={order} key={index} />);

    let totalCompanyShare = 0;
    let totalPrice = 0;

    data.data.map((order) => {
        totalPrice = totalPrice + order.Total;
        totalCompanyShare = totalCompanyShare + (order.CompanyShare as number);
    });

    const handleChange = (event: SelectChangeEvent) => {
        setSelectedUserId(event.target.value);
        localStorage.setItem('selectedUserId', event.target.value);
    };

    const selectedUser = users.find((user) => user.Id === +selectedUserId);

    const closeAllOrders = async () => {
        await data.data.map((order, index) => {
            deliveredOrder(selectedUser?.TelegramChatId as string, String(order.MessageId), String(order.Id));
        });
        setUpdate();
    };

    useEffect(() => {
        fetchOrdersFx({ userId: +selectedUserId });
        fetchAllUsersFx();
    }, [update]);

    return (
        <>
            {!loading ? (
                <Stack sx={{ p: 2, textAlign: 'center' }}>
                    <Typography variant="h5">Сдача</Typography>
                    <Typography variant="h6">Сумма к сдаче: {totalCompanyShare}₽</Typography>
                    <Typography variant="h6">Общая касса: {totalPrice}₽</Typography>
                    <MainButton text="Закрыть все заявки" onClick={closeAllOrders} />

                    <Select value={selectedUserId} onChange={handleChange}>
                        {menuItems}
                    </Select>

                    <Stack alignItems="center" sx={{ mt: 2, height: 'calc(100vh - 250px)', overflowY: 'scroll', p: 2 }}>
                        <Stack gap={1} sx={{ width: '100%' }}>
                            {OrderList}
                        </Stack>
                    </Stack>
                </Stack>
            ) : (
                <CircularProgress />
            )}
        </>
    );
};
