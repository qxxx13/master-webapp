import moment from 'moment';

import { instance } from '../../../config/apiConfig/apiConfig';
import { GetOrdersType } from '../../../types/OrderType';

export const fetchAllOrders = async (masterId: string, ordersDate: string | undefined) => {
    let startDate;
    let endDate;

    if (ordersDate === undefined) {
        startDate = 'all';
        endDate = 'all';
    } else {
        startDate = ordersDate;
        const temp = new Date(ordersDate);

        temp.setDate(temp.getDate() + 1);

        temp.toDateString();

        endDate = moment(temp).format('YYYY-MM-DD');
    }

    let orders: GetOrdersType = {
        data: [],
        meta: { total: 0, lastPage: 0, currentPage: 0, perPage: 0, prev: 0, next: 0 },
    };

    const awaitingPayment: GetOrdersType =
        masterId !== 'all'
            ? await instance
                  .get(
                      `orders?page=1&perPage=150&status=awaitingPayment&masterId=${masterId}&startDate=${startDate}&endDate=${endDate}`,
                  )
                  .then((res) => res.data)
            : await instance
                  .get(`orders?page=1&perPage=150&status=awaitingPayment&startDate=${startDate}&endDate=${endDate}`)
                  .then((res) => res.data);

    const debt: GetOrdersType =
        masterId !== 'all'
            ? await instance
                  .get(
                      `orders?page=1&perPage=150&status=debt&masterId=${masterId}&startDate=${startDate}&endDate=${endDate}`,
                  )
                  .then((res) => res.data)
            : await instance
                  .get(`orders?page=1&perPage=150&status=debt&startDate=${startDate}&endDate=${endDate}`)
                  .then((res) => res.data);

    orders = {
        meta: {
            total: awaitingPayment.meta.total + debt.meta.total,
            currentPage: awaitingPayment.meta.currentPage,
            lastPage: awaitingPayment.meta.lastPage,
            next: awaitingPayment.meta.next,
            perPage: awaitingPayment.meta.perPage,
            prev: awaitingPayment.meta.prev,
        },
        data: [...awaitingPayment.data, ...debt.data],
    };

    return orders;
};

export const getAllUsers = () => {
    const users = instance.get('user').then((res) => res.data);

    return users;
};
