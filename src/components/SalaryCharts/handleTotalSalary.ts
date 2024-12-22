import { OrderType } from '../../types/OrderType';

export const handleTotalSalary = (orders: OrderType[]) => {
    let temp = 0;

    orders.map((order) => (temp += order.MasterSalary || 0));

    return temp;
};

export const handleTotalExpenses = (orders: OrderType[]) => {
    let temp = 0;

    orders.map((order) => (temp += order.Expenses || 0));

    return temp;
};

export const handleTotal = (orders: OrderType[]) => {
    let temp = 0;

    orders.map((order) => (temp += order.Total || 0));

    return temp;
};
