import { Box, Button, CircularProgress, Divider, Stack, Typography } from '@mui/material';
import { useUnit } from 'effector-react';
import moment from 'moment';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { handleTotal, handleTotalSalary } from '../../components/SalaryCharts/handleTotalSalary';
import { StatusChip } from '../../components/StatusChip/StatusChip';
import { OrderStatusEnum } from '../../types/OrderType';
import { UserType } from '../../types/UserType';
import { $userAllOrdersStoreGetStatus, fetchAllUserOrdersFx } from './model/userAllOrdersStore';
import { $userDescPageStoreGetStatus, fetchUserByIdFx } from './model/userDescPageStore';
import { $userOrdersPerMonthStoreGetStatus, fetchUserOrdersPerMonthFx } from './model/userOrdersPerMonthStore';
import { DescLoading } from '../../components/CardLoading/DescLoading';
import { MainButton } from '@vkruglikov/react-telegram-web-app';

export const UserDescPage: React.FC<{ currentUser: UserType }> = ({ currentUser }) => {
    const navigate = useNavigate();
    const id = useParams().id;

    const { data, loading } = useUnit($userDescPageStoreGetStatus);
    const { data: ordersAllTime, loading: ordersAllTimeLoading } = useUnit($userAllOrdersStoreGetStatus);
    const { data: ordersPerMonth } = useUnit($userOrdersPerMonthStoreGetStatus);

    const salaryForMonth = handleTotalSalary(ordersPerMonth.data);
    const salaryForAllTime = handleTotalSalary(ordersAllTime.data);
    const allTimeTotal = handleTotal(ordersAllTime.data);

    const averageBill = Math.round(salaryForMonth / ordersPerMonth.data.length);

    const salaryForMonthFormat = new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB' }).format(
        salaryForMonth,
    );
    const salaryForAllTimeFormat = new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB' }).format(
        salaryForAllTime,
    );
    const averageBillFormat = new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB' }).format(
        averageBill,
    );
    const allTimeTotalFormat = new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB' }).format(
        allTimeTotal,
    );

    const goBack = () => navigate(-1);
    const goToEditUser = () => navigate(`/editUser/${id}`);

    const firstDay = moment().startOf('month').format('YYYY-MM-DD'); // Отмечаем начало месяца!
    const lastDay = moment().endOf('month').format('YYYY-MM-DD');

    const BackBTN = Telegram.WebApp.BackButton;
    BackBTN.show();
    BackBTN.onClick(goBack);

    useEffect(() => {
        Telegram.WebApp.ready();
        fetchUserByIdFx({ userId: String(id) });
        fetchAllUserOrdersFx({ userId: +String(id) });
        fetchUserOrdersPerMonthFx({ userId: +String(id), startDate: firstDay, endDate: lastDay });
    }, []);

    return (
        <>
            {!loading && !ordersAllTimeLoading ? (
                <Stack sx={{ p: 2 }}>
                    <Stack flexDirection="row" justifyContent="space-between">
                        <Typography variant="h5" sx={{ mb: 1 }}>
                            Пользователь: {data.UserName as string}
                        </Typography>
                        <Typography variant="h5">Id: {data.Id as string}</Typography>
                    </Stack>
                    <StatusChip status={data.Status as OrderStatusEnum} />
                    <Typography variant="h6" sx={{ mt: 1 }}>
                        Роль: {data.Role as string}
                    </Typography>
                    <Divider />
                    <Typography variant="h6">Пароль: {data.Password as string}</Typography>
                    <Divider />
                    <Typography variant="h6">Процент: {data.InterestRate as string}%</Typography>
                    <Divider />
                    <Typography variant="h6">ЗП за месяц: {salaryForMonthFormat}</Typography>
                    <Divider />
                    <Typography variant="h6">ЗП за все время: {salaryForAllTimeFormat}</Typography>
                    <Divider />
                    <Typography variant="h6">Касса за все время: {allTimeTotalFormat}</Typography>
                    <Divider />
                    <Typography variant="h6">Заявок за месяц: {ordersPerMonth.data.length}</Typography>
                    <Divider />

                    <Typography variant="h6">Заявок за все время: {ordersAllTime.meta.total}</Typography>
                    <Divider />
                    <Typography variant="h6">Средний чек за месяц: {averageBillFormat}</Typography>

                    <MainButton text="Редактировать" onClick={goToEditUser} />
                </Stack>
            ) : (
                <DescLoading />
            )}
        </>
    );
};
