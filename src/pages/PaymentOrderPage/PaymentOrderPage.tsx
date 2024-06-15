import { Stack, Typography } from '@mui/material';
import { useUnit } from 'effector-react';
import { useEffect } from 'react';

import { OrderCard } from '../../components/OrderCard/OrderCard';
import { UserType } from '../../types/UserType';
import { $paymentOrdersGetStatus, fetchOrdersFx } from './model/paymentOrdersStore';

export const PaymentOrderPage: React.FC<{ currentUser: UserType }> = ({ currentUser }) => {
    const { data, error, loading } = useUnit($paymentOrdersGetStatus);

    const OrderList = data.data.map((order, index) => <OrderCard order={order} key={index} />);

    let totalCompanyShare = 0;

    data.data.map((order) => {
        totalCompanyShare = totalCompanyShare + (order.CompanyShare as number);
    });

    useEffect(() => {
        fetchOrdersFx({ userId: String(currentUser.Id) });
    }, []);

    return (
        <Stack sx={{ p: 2, textAlign: 'center' }} gap={1}>
            <Typography variant="h4">Сдача</Typography>
            <Typography variant="h6">Сумма к сдаче: {totalCompanyShare}₽</Typography>
            {OrderList}
        </Stack>
    );
};
