import { OrderType } from '../../types/OrderType';

export const handleTotalSalary = (orders: OrderType[]) => {
    let temp = 0;

    orders.map((order) => (temp += order.MasterSalary || 0));

    return temp;
};
