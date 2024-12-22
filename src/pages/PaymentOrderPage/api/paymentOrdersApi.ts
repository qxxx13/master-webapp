import { instance } from '../../../config/apiConfig/apiConfig';
import { GetOrdersType } from '../../../types/OrderType';

export const fetchOrdersByMasterId = async (userId: string): Promise<GetOrdersType> => {
    let orders: GetOrdersType = {
        data: [],
        meta: { total: 0, lastPage: 0, currentPage: 0, perPage: 0, prev: 0, next: 0 },
    };
    const awaitingPayment: GetOrdersType = await instance
        .get(`orders/?page=1&perPage=50}&masterId=${userId}&status=awaitingPayment`)
        .then((res) => res.data);

    const debt: GetOrdersType = await instance
        .get(`orders/?page=1&perPage=50}&masterId=${userId}&status=debt`)
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
