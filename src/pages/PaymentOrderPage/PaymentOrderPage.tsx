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

    const BackBTN = Telegram.WebApp.BackButton;
    BackBTN.hide();

    useEffect(() => {
        fetchOrdersFx({ userId: String(currentUser.Id) });
        Telegram.WebApp.ready();
    }, []);

    return (
        <>
            <Stack sx={{ position: 'absolute', top: 8, textAlign: 'center', width: '100%', p: 2 }}>
                <Typography variant="h4">Сдача</Typography>
                <Typography variant="h6">Сумма к сдаче: {totalCompanyShare}₽</Typography>
            </Stack>
            <Stack alignItems="center" sx={{ mt: '100px', height: 'calc(100vh - 150px)', overflowY: 'scroll', p: 2 }}>
                <Stack gap={1} sx={{ width: '100%' }}>
                    {OrderList}
                </Stack>
            </Stack>
        </>
    );
};
