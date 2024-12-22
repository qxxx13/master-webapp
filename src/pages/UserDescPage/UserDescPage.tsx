import { Box, Button, CircularProgress, Divider, Stack, Typography } from '@mui/material';
import { BackButton, MainButton } from '@vkruglikov/react-telegram-web-app';
import { useUnit } from 'effector-react';
import moment from 'moment';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { DescLoading } from '../../components/CardLoading/DescLoading';
import { handleTotal, handleTotalExpenses, handleTotalSalary } from '../../components/SalaryCharts/handleTotalSalary';
import { StatusChip } from '../../components/StatusChip/StatusChip';
import { OrderStatusEnum } from '../../types/OrderType';
import { UserType } from '../../types/UserType';
import { $userAllOrdersStoreGetStatus, fetchAllUserOrdersFx } from './model/userAllOrdersStore';
import { $userDescPageStoreGetStatus, fetchUserByIdFx } from './model/userDescPageStore';
import { $userOrdersPerMonthStoreGetStatus, fetchUserOrdersPerMonthFx } from './model/userOrdersPerMonthStore';

export const UserDescPage: React.FC<{ currentUser: UserType }> = ({ currentUser }) => {
    const navigate = useNavigate();
    const id = useParams().id;

    const { data, loading } = useUnit($userDescPageStoreGetStatus);
    const { data: ordersAllTime, loading: ordersAllTimeLoading } = useUnit($userAllOrdersStoreGetStatus);
    const { data: ordersPerMonth } = useUnit($userOrdersPerMonthStoreGetStatus);

    const salaryForMonth = handleTotalSalary(ordersPerMonth.data);
    const salaryForAllTime = handleTotalSalary(ordersAllTime.data);
    const expensesForAllTime = handleTotalExpenses(ordersAllTime.data);
    const expensesForMonth = handleTotalExpenses(ordersPerMonth.data);
    const allTimeTotal = handleTotal(ordersAllTime.data);
    const monthTotal = handleTotal(ordersPerMonth.data);

    const averageBill = Math.round(salaryForMonth / ordersPerMonth.data.length);

    const salaryForMonthFormat = new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB' }).format(
        salaryForMonth,
    );
    const salaryForAllTimeFormat = new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB' }).format(
        salaryForAllTime,
    );
    const averageBillFormat = new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB' }).format(
        averageBill || 0,
    );
    const allTimeTotalFormat = new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB' }).format(
        allTimeTotal,
    );
    const monthTotalFormat = new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB' }).format(monthTotal);
    const expensesForAllTimeFormat = new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB' }).format(
        expensesForAllTime,
    );
    const expensesForMonthFormat = new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB' }).format(
        expensesForMonth,
    );

    const cancelByClientForMonth = ordersPerMonth.data.filter(
        (order) => order.Status === OrderStatusEnum.cancelByClient,
    ).length;

    const rejectedByClientForMonth = ordersPerMonth.data.filter(
        (order) => order.Status === OrderStatusEnum.rejectedByClient,
    ).length;

    const missedCallForMonth = ordersPerMonth.data.filter(
        (order) => order.Status === OrderStatusEnum.missedCall,
    ).length;

    const goBack = () => navigate(-1);
    const goToEditUser = () => navigate(`/editUser/${id}`);

    const firstDay = moment().startOf('month').format('YYYY-MM-DD'); // Отмечаем начало месяца!
    const lastDay = moment().endOf('month').format('YYYY-MM-DD');

    useEffect(() => {
        Telegram.WebApp.ready();
        fetchUserByIdFx({ userId: String(id) });
        fetchAllUserOrdersFx({ userId: +String(id) });
        fetchUserOrdersPerMonthFx({ userId: +String(id), startDate: firstDay, endDate: lastDay });
    }, []);

    return (
        <>
            <BackButton onClick={goBack} />
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
                    <Typography variant="h6">Касса за месяц: {monthTotalFormat}</Typography>
                    <Divider />
                    <Typography variant="h6">Касса за все время: {allTimeTotalFormat}</Typography>
                    <Divider />
                    <Typography variant="h6">Средний чек за месяц: {averageBillFormat}</Typography>
                    <Divider />
                    <Typography variant="h6">Расход за все время: {expensesForAllTimeFormat}</Typography>
                    <Divider />
                    <Typography variant="h6">Расход за месяц: {expensesForMonthFormat}</Typography>
                    <Divider />
                    <Typography variant="h6">Отказов за месяц: {cancelByClientForMonth}</Typography>
                    <Divider />
                    <Typography variant="h6">Недозвонов за месяц: {missedCallForMonth}</Typography>
                    <Divider />
                    <Typography variant="h6">Отклоненных заявок за месяц: {rejectedByClientForMonth}</Typography>
                    <Divider />
                    <Typography variant="h6">Заявок за месяц: {ordersPerMonth.data.length}</Typography>
                    <Divider />
                    <Typography variant="h6">Заявок за все время: {ordersAllTime.meta.total}</Typography>
                    <Divider />

                    {/* <Button onClick={goToEditUser}>Редактировать</Button> */}
                    <MainButton text="Редактировать" onClick={goToEditUser} />
                </Stack>
            ) : (
                <DescLoading />
            )}
        </>
    );
};
