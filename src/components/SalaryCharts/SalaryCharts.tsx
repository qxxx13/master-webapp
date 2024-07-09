import { Stack, Typography } from '@mui/material';
import { LineChart } from '@mui/x-charts';
import moment from 'moment';

import { useSalaryCharts } from '../../hooks/useSalaryCharts';
import { OrderType } from '../../types/OrderType';
import { useState } from 'react';
import { handleTotalSalary } from './handleTotalSalary';

type SalaryChartsProps = {
    orders: OrderType[];
};

export const SalaryCharts: React.FC<SalaryChartsProps> = ({ orders }) => {
    const totalSalaryPerMonth = handleTotalSalary(orders);

    /* const pData = [2400, 1398, 9800, 3908, 4800, 3800, 4300];
    const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490];

    const xLabels: string[] = [];

    const lastDay = moment().endOf('month').format('D');

    for (let i = 1; i <= +lastDay; i++) {
        xLabels.push(String(i));
    } */

    /* const {} = useSalaryCharts(orders, +lastDay); */

    return (
        <>
            <Stack sx={{ p: 2 }}>
                <Typography variant="h6">ЗП за месяц: {totalSalaryPerMonth}₽</Typography>
                <Typography variant="h6">Отработано заявок: {orders.length}</Typography>
            </Stack>
            {/* <LineChart
                sx={{ ml: 2 }}
                width={400}
                height={300}
                series={[
                    { data: pData, label: 'Доход' },
                    { data: uData, label: 'Расход' },
                ]}
                xAxis={[{ scaleType: 'point', data: xLabels }]}
            /> */}
        </>
    );
};
