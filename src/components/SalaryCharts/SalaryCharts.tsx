import StarIcon from '@mui/icons-material/Star';
import { Divider, Stack, Typography } from '@mui/material';
import { LineChart } from '@mui/x-charts';
import { useUnit } from 'effector-react';
import moment from 'moment';
import { useEffect, useState } from 'react';

import { useSalaryCharts } from '../../hooks/useSalaryCharts';
import {
    $userOrdersPerMonthStoreGetStatus,
    fetchUserOrdersPerMonthFx,
} from '../../pages/UserDescPage/model/userOrdersPerMonthStore';
import { OrderStatusEnum, OrderType } from '../../types/OrderType';
import { handleTotal, handleTotalExpenses, handleTotalSalary } from './handleTotalSalary';

type SalaryChartsProps = {
    orders: OrderType[];
    userId: number;
    userStars: number;
    seasonOrders: OrderType[];
};

export const SalaryCharts: React.FC<SalaryChartsProps> = ({ orders, userId, userStars = 0, seasonOrders }) => {
    const totalSalaryPerMonth = handleTotalSalary(orders);

    const totalSalaryPerMonthFormat = new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB' }).format(
        totalSalaryPerMonth,
    );

    const { data: ordersPerMonth } = useUnit($userOrdersPerMonthStoreGetStatus);

    const salaryForMonth = handleTotalSalary(ordersPerMonth.data);

    const averageBill = Math.round(salaryForMonth / ordersPerMonth.data.length);

    const averageBillFormat = new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB' }).format(
        averageBill || 0,
    );

    const expensesForMonth = handleTotalExpenses(ordersPerMonth.data);

    const expensesForMonthFormat = new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB' }).format(
        expensesForMonth,
    );

    const cancelByClientForMonth = ordersPerMonth.data.filter(
        (order) => order.Status === OrderStatusEnum.cancelByClient,
    ).length;

    const totalSeason = handleTotal(seasonOrders);

    const totalSeasonFormat = new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB' }).format(
        totalSeason,
    );

    const firstDay = moment().startOf('month').format('YYYY-MM-DD'); // Отмечаем начало месяца!
    const lastDay = moment().endOf('month').format('YYYY-MM-DD');

    useEffect(() => {
        fetchUserOrdersPerMonthFx({ userId: userId, startDate: firstDay, endDate: lastDay });
    }, []);

    return (
        <>
            <Stack sx={{ p: 2, mb: '56px' }} gap={1}>
                <Typography variant="h6">ЗП за месяц: {totalSalaryPerMonthFormat}</Typography>
                <Divider />
                <Typography variant="h6">Отработано заявок: {orders.length}</Typography>
                <Divider />
                <Typography variant="h6">Средний чек за месяц: {averageBillFormat}</Typography>
                <Divider />
                <Typography variant="h6">Расход за месяц: {expensesForMonthFormat}</Typography>
                <Divider />
                <Typography variant="h6">Отказов за месяц: {cancelByClientForMonth}</Typography>
                <Divider />

                <Typography variant="h6" sx={{ mt: 2 }}>
                    Чемпион сезона:
                </Typography>
                <Typography variant="h6">Касса июнь-август: {totalSeasonFormat}</Typography>
                <Typography variant="h6">Конкурс за отзыв:</Typography>
                <Typography variant="h6">
                    <Stack flexDirection={'row'} alignItems={'center'}>
                        Баланс: {userStars} <StarIcon />
                    </Stack>
                </Typography>
            </Stack>
        </>
    );
};
