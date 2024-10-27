import { GetOrdersType, OrderStatusEnum, OrderType } from '@shared/types';
import { combine, createEffect, createEvent, createStore, restore } from 'effector';

import { fetchAllOrders } from '../api/adminOrdersPageApi';

export const $allOrders = createStore<GetOrdersType>({ meta: {} as GetOrdersType['meta'], data: [] });

export const fetchAllOrdersFx = createEffect<
    {
        page: number;
        perPage: number;
        status: OrderStatusEnum | 'all';
        phoneNumber: string | 'all';
        masterId: string | 'all';
    },
    GetOrdersType
>();

fetchAllOrdersFx.use((params) =>
    fetchAllOrders(params.page, params.perPage, params.status, params.phoneNumber, params.masterId),
);

const uniqueOrders = (orders: OrderType[]) => {
    return orders.reduce((res, cur) => {
        if (res.find((find) => JSON.stringify(find) === JSON.stringify(cur))) {
            return res;
        } else return [...res, cur];
    }, [] as OrderType[]);
};

$allOrders.on(
    fetchAllOrdersFx.doneData,
    (store, newOrders) => (store = { data: uniqueOrders([...store.data, ...newOrders.data]), meta: newOrders.meta }),
);

export const clearOrdersStore = createEvent();

$allOrders.on(clearOrdersStore, (store) => (store = { meta: {} as GetOrdersType['meta'], data: [] }));

export const $fetchError = restore<Error>(fetchAllOrdersFx.failData, null);

export const $allOrdersGetStatus = combine({
    loading: fetchAllOrdersFx.pending,
    error: $fetchError,
    data: $allOrders,
});
