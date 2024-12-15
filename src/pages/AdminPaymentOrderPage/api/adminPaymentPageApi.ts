import moment from 'moment';

import { instance } from '../../../config/apiConfig/apiConfig';

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

    const orders =
        masterId !== 'all'
            ? await instance
                  .get(
                      `orders?page=1&perPage=150&status=awaitingPayment&masterId=${masterId}&startDate=${startDate}&endDate=${endDate}`,
                  )
                  .then((res) => res.data)
            : await instance
                  .get(`orders?page=1&perPage=150&status=awaitingPayment&startDate=${startDate}&endDate=${endDate}`)
                  .then((res) => res.data);

    return orders;
};

export const getAllUsers = () => {
    const users = instance.get('user').then((res) => res.data);

    return users;
};
