import { Divider, Link, Stack, Typography } from '@mui/material';
import moment from 'moment';

import { StatusChip } from '../../components/StatusChip/StatusChip';
import { OrderType } from '../../types/OrderType';

export const OrderDesc: React.FC<{ order: OrderType }> = ({ order }) => {
    return (
        <Stack sx={{ mt: 4, p: 2 }}>
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
                    <Typography variant="h5" sx={{ textAlign: 'center' }}>
                        К сдаче: {order.CompanyShare}₽
                    </Typography>
                </>
            )}
        </Stack>
    );
};
