import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    MenuItem,
    Select,
    SelectChangeEvent,
    Skeleton,
    Stack,
    Typography,
} from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { MainButton } from '@vkruglikov/react-telegram-web-app';
import { Dayjs } from 'dayjs';
import { useUnit } from 'effector-react';
import { enqueueSnackbar } from 'notistack';
import { useEffect, useState } from 'react';

import { CardLoading } from '../../components/CardLoading/CardLoading';
import { OrderCard } from '../../components/OrderCard/OrderCard';
import { useRubFormat } from '../../hooks/useRubFormat';
import { RoleEnum, UserType } from '../../types/UserType';
import { deliveredOrder } from '../OrderDescPage/api/workOrderApi';
import { $updateOrderStore, setUpdate } from '../OrderDescPage/model/setUpdateOrderStore';
import { $ordersPaymentStoreGetStatus, fetchOrdersFx } from './model/ordersPaymentStore';
import { $usersPaymentStoreGetStatus, fetchAllUsersFx } from './model/usersPaymentStore';

export const AdminPaymentOrderPage: React.FC<{ currentUser: UserType }> = ({ currentUser }) => {
    const [selectedUserId, setSelectedUserId] = useState(
        localStorage.getItem('selectedUserId') || String(currentUser.Id),
    );
    const [showDialog, setShowDialog] = useState(false);
    const [ordersDate, setOrdersDate] = useState<Dayjs | null>(null);

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

    let totalCompanyShare = 0;
    let totalPrice = 0;

    data.data.map((order) => {
        totalPrice = totalPrice + order.Total;
        totalCompanyShare = totalCompanyShare + (order.CompanyShare as number);
    });

    const totalCompanyShareFormat = useRubFormat(totalCompanyShare).format;
    const totalPriceFormat = useRubFormat(totalPrice).format;

    const handleChange = (event: SelectChangeEvent) => {
        setSelectedUserId(event.target.value);
        localStorage.setItem('selectedUserId', event.target.value);
    };

    const handleCloseDialog = () => {
        setShowDialog(false);
    };

    const handleShowDialog = () => {
        setShowDialog(true);
    };

    const selectedUser = users.find((user) => user.Id === +selectedUserId);

    const closeAllOrders = async () => {
        const length = data.data.length;
        await data.data.map((order, index) => {
            deliveredOrder(selectedUser?.TelegramChatId as string, String(order.MessageId), String(order.Id))
                .then(() => {
                    enqueueSnackbar(`Заявка №${order.Id} успешно закрыта`, { variant: 'success' });
                    if (index === length - 1) {
                        setUpdate();
                    }
                })
                .catch((e: Error) => {
                    enqueueSnackbar(`Заявка №${order.Id} не закрыта, ${e.message}`, { variant: 'error' });
                });
        });

        setShowDialog(false);
    };

    const OrderList = data.data.map((order, index) => (
        <OrderCard order={order} currentUserRole="admin" key={index} user={selectedUser} />
    ));

    useEffect(() => {
        if (selectedUserId !== 'all') {
            fetchOrdersFx({ userId: selectedUserId, ordersDate: ordersDate });
        } else {
            fetchOrdersFx({ userId: 'all', ordersDate: ordersDate });
        }

        fetchAllUsersFx();
        Telegram.WebApp.ready();
    }, [update, selectedUserId, ordersDate]);

    return (
        <Stack sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h4">Сдача</Typography>
            <Typography variant="h6">
                Сумма к сдаче:{' '}
                {!loading ? (
                    totalCompanyShareFormat
                ) : (
                    <Skeleton sx={{ display: 'inline-block' }} width={120} variant="text" />
                )}
            </Typography>
            <Typography variant="h6">
                Общая касса:{' '}
                {!loading ? totalPriceFormat : <Skeleton sx={{ display: 'inline-block' }} width={120} variant="text" />}
            </Typography>
            <MainButton text="Закрыть все заявки" onClick={handleShowDialog} />

            <Select value={selectedUserId} onChange={handleChange} sx={{ height: 45 }}>
                <MenuItem value="all">Все</MenuItem>
                {menuItems}
            </Select>
            <Stack flexDirection="row" alignItems="center" justifyContent="space-between">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DatePicker']} sx={{ width: '75%' }}>
                        <DatePicker label="Дата заявок" value={ordersDate} onChange={(date) => setOrdersDate(date)} />
                    </DemoContainer>
                </LocalizationProvider>
                <Button variant="contained" sx={{ height: 54, width: 84, mt: 1 }} onClick={() => setOrdersDate(null)}>
                    Все
                </Button>
            </Stack>

            <Stack alignItems="center">
                <Stack gap={1} sx={{ width: '100%', p: 1, mb: 6 }}>
                    {!loading ? OrderList : <CardLoading height={160} />}
                </Stack>
            </Stack>

            <Dialog open={showDialog} onClose={handleCloseDialog}>
                <DialogTitle>Закрыть все заявки</DialogTitle>
                <DialogContent>
                    <DialogContentText>Вы уверены, что хотите закрыть все заявки?</DialogContentText>
                </DialogContent>
                <DialogActions sx={{ justifyContent: 'space-between', p: 2 }}>
                    <Button variant="outlined" color="warning" onClick={handleCloseDialog}>
                        Нет
                    </Button>
                    <Button variant="outlined" color="success" onClick={closeAllOrders}>
                        Да
                    </Button>
                </DialogActions>
            </Dialog>
        </Stack>
    );
};
