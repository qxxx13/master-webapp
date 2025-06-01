import { Box, Divider, Skeleton, Stack, Typography } from '@mui/material';
import { useUnit } from 'effector-react';
import moment from 'moment';
import { useEffect } from 'react';

import { translate } from '../../common/translate/translate';
import { StatusChip } from '../../components/StatusChip/StatusChip';
import { UserChip } from '../../components/UserChip/UserChip';
import { useRubFormat } from '../../hooks/useRubFormat';
import { OrderType } from '../../types/OrderType';
import { UserType } from '../../types/UserType';
import { $dispStoreGetStatus, fetchDispByIdFx } from './model/dispStore';

type OrderDescProps = {
    order: OrderType;
    master: UserType;
    isAdmin?: boolean;
};

export const OrderDesc: React.FC<OrderDescProps> = ({ order, master, isAdmin }) => {
    const { data, loading } = useUnit($dispStoreGetStatus);

    const totalFormat = useRubFormat(order.Total).format;
    const expensesFormat = useRubFormat(order.Expenses).format;
    const debtFormat = useRubFormat(order.Debt).format;
    const companyShareFormat = order.CompanyShare !== 0 && useRubFormat(+String(order.CompanyShare)).format;

    const callToClient = () => {
        window.open(`tel:${order.ClientPhoneNumber.replaceAll('-', '')}`);
    };

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
                Дата: {translate(moment(order.Date).format('dddd'))} {moment(order.Date).format('DD.MM.YY')}
            </Typography>
            <Divider />
            <Typography variant="h6">Время: {order.Time}</Typography>
            <Divider />
            <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center' }}>
                Диспетчер:
                {order.DispId && !loading ? (
                    <UserChip user={data as UserType} />
                ) : (
                    <Skeleton variant="rounded" sx={{ display: 'inline-block' }} width={80} />
                )}
            </Typography>
            <Divider />
            <Typography variant="h6">
                Номер:{' '}
                <Box sx={{ color: 'hsla(206,100%,73.3%,1)', display: 'inline' }} onClick={callToClient}>
                    {order.ClientPhoneNumber}
                </Box>
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
            <Typography variant="h6">Источник: {translate((order?.Source || 'PaperAdvertising') as string)}</Typography>
            <Divider />
            <Typography variant="h6">Описание:</Typography>
            <Typography variant="h6" sx={{ wordWrap: 'break-word' }}>
                {order.Description}
            </Typography>
            {isAdmin ? (
                <>
                    <Divider />
                    <Typography variant="h6" color={'text.secondary'}>
                        Скрытое описание:
                    </Typography>
                    <Typography variant="h6" sx={{ wordWrap: 'break-word' }} color={'text.secondary'}>
                        {order.HiddenDescription}
                    </Typography>{' '}
                </>
            ) : null}

            {order.CompanyShare !== 0 && (
                <>
                    <Divider />
                    <Typography variant="h6">Забрал: {totalFormat}</Typography>
                    {order.Debt > 0 && (
                        <>
                            <Divider />
                            <Typography variant="h6">Долг: {debtFormat}</Typography>
                        </>
                    )}
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
