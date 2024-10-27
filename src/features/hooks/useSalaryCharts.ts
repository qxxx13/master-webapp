import moment from 'moment';

import { OrderType } from '../../shared/types';

export const useSalaryCharts = (orders: OrderType[], lastDay: number) => {
    const pData: number[] = [];
    const uData: number[] = [];

    let i = 1;

    /*     orders.map((order) => console.log(moment(order.Date).format('D'))); */

    while (i <= +lastDay) {
        let temp = [...orders];
        temp.filter((order) => +moment(order.Date).format('D') === i);

        let salary = 0;
        let expenses = 0;

        /* temp.map((order) => {
            salary += order.MasterSalary;
            expenses += order.Expenses;
        }); */

        pData.push(salary);
        uData.push(expenses);
        salary = 0;
        expenses = 0;
        temp = [];
        i++;
    }

    console.log(pData);

    return { pData, uData };
};
