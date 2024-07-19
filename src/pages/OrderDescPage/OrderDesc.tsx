import { Divider, Link, Stack, Typography } from '@mui/material';
import moment from 'moment';

import { StatusChip } from '../../components/StatusChip/StatusChip';
import { OrderType } from '../../types/OrderType';

export const OrderDesc: React.FC<{ order: OrderType }> = ({ order }) => {
    const totalFormat = new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB' }).format(order.Total);
    const expensesFormat = new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB' }).format(
        order.Expenses,
    );
    const companyShareFormat =
        order.CompanyShare !== 0 &&
        new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB' }).format(+String(order.CompanyShare));

    return (
        <Stack sx={{ p: 2 }}>
            <Typography sx={{ mt: 1, mb: 1 }} variant="h5">
                Заявка №{order.Id}
            </Typography>
            <StatusChip status={order.Status} />
            <Typography sx={{ mt: 1 }} variant="h6">
                Дата: {moment(order.Date).format('DD.MM.YY')}
            </Typography>
            <Divider />
            <Typography variant="h6">Время: {order.Time}</Typography>
            <Divider />
            <Typography variant="h6">
                Номер:{' '}
                <Link href={`tel:${order.ClientPhoneNumber.replaceAll('-', '')}`}>{order.ClientPhoneNumber}</Link>
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
                    <Typography variant="h6">Забрал: {totalFormat}</Typography>
                    <Typography variant="h6">Расход: {expensesFormat}</Typography>
                    <Typography variant="h5" sx={{ textAlign: 'center' }}>
                        К сдаче: {companyShareFormat}
                    </Typography>
                </>
            )}
        </Stack>
    );
};
