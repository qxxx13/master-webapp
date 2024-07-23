import { CircularProgress, Divider, Link, Stack, Typography } from '@mui/material';
import moment from 'moment';

import { StatusChip } from '../../components/StatusChip/StatusChip';
import { OrderType } from '../../types/OrderType';
import { UserType } from '../../types/UserType';
import { UserChip } from '../../components/UserChip/UserChip';
import { useEffect } from 'react';
import { $dispStoreGetStatus, fetchDispByIdFx } from './model/dispStore';
import { useUnit } from 'effector-react';

type OrderDescProps = {
    order: OrderType;
    master: UserType;
};

export const OrderDesc: React.FC<OrderDescProps> = ({ order, master }) => {
    const { data, loading } = useUnit($dispStoreGetStatus);

    const totalFormat = new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB' }).format(order.Total);
    const expensesFormat = new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB' }).format(
        order.Expenses,
    );
    const companyShareFormat =
        order.CompanyShare !== 0 &&
        new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB' }).format(+String(order.CompanyShare));

    useEffect(() => {
        order.DispId && fetchDispByIdFx({ userId: order.DispId });
    }, []);

    return (
        <Stack sx={{ p: 2 }}>
            <Typography sx={{ mt: 1, mb: 1 }} variant="h5">
                Заявка №{order.Id}
            </Typography>
            <Stack gap={1}>
                <StatusChip status={order.Status} />
                <UserChip user={master} />
            </Stack>
            <Typography sx={{ mt: 1 }} variant="h6">
                Дата: {moment(order.Date).format('DD.MM.YY')}
            </Typography>
            <Divider />
            <Typography variant="h6">Время: {order.Time}</Typography>
            <Divider />
            {order.DispId && !loading && (
                <>
                    <Typography variant="h6">Диспетчер: {<UserChip user={data as UserType} />}</Typography>
                    <Divider />
                </>
            )}

            <Typography variant="h6">
                Номер:{' '}
                <a
                    style={{ color: 'hsla(206,100%,73.3%,1)', textDecoration: 'none' }}
                    href={`tel:${order.ClientPhoneNumber.replaceAll('-', '')}`}
                >
                    {order.ClientPhoneNumber}
                </a>
            </Typography>
            <Divider />
            <Typography variant="h6">Город: {order.City}</Typography>
            <Divider />
            <Typography variant="h6">Адрес: {order.Address}</Typography>
            <Divider />
            <Typography variant="h6">Клиент: {order.ClientName}</Typography>
            <Divider />
            <Typography variant="h6">Имя мастера: {order.MasterName}</Typography>
            <Divider />
            <Typography variant="h6">Озвучка: {order.AnnouncedPrice}</Typography>
            <Divider />
            <Typography variant="h6">Описание:</Typography>
            <Typography variant="h6" sx={{ wordWrap: 'break-word' }}>
                {order.Description}
            </Typography>

            {order.CompanyShare !== 0 && (
                <>
                    <Divider />
                    <Typography variant="h6">Забрал: {totalFormat}</Typography>
                    <Divider />
                    <Typography variant="h6">Расход: {expensesFormat}</Typography>
                    <Divider />
                    <Typography variant="h5" sx={{ textAlign: 'center' }}>
                        К сдаче: {companyShareFormat}
                    </Typography>
                </>
            )}
        </Stack>
    );
};
