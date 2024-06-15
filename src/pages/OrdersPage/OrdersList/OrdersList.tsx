import { CircularProgress, Stack } from '@mui/material';
import { useUnit } from 'effector-react';
import { useEffect } from 'react';

import { OrderCard } from '../../../components/OrderCard/OrderCard';
import { MasterOrderStatusEnum } from '../../../types/OrderType';
import { UserType } from '../../../types/UserType';
import { $ordersGetStatus, fetchOrdersFx } from '../model/OrdersStore';

export const OrdersList: React.FC<{ currentUser: UserType; page: number; status: MasterOrderStatusEnum }> = ({
    currentUser,
    page,
    status,
}) => {
    const { data, error, loading } = useUnit($ordersGetStatus);

    const orderList = data.data.map((order, index) => <OrderCard order={order} key={index} />);

    useEffect(() => {
        fetchOrdersFx({ page: page, perPage: 10, userId: String(currentUser.Id), status: status });
    }, [page, status, currentUser]);

    return (
        <Stack alignItems="center">
            <Stack gap={1} sx={{ width: '100%' }}>
                {!loading ? orderList : <CircularProgress />}
            </Stack>
        </Stack>
    );
};
