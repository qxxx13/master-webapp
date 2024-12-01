import { combine, createEffect, createEvent, createStore, restore } from 'effector';

import { GetOrdersType, MasterOrderStatusEnum, OrderType } from '../../../types/OrderType';
import { fetchOrdersByMasterId } from '../api/ordersApi';

export const $ordersStore = createStore<GetOrdersType>({ meta: {} as GetOrdersType['meta'], data: [] });

export const fetchOrdersFx = createEffect<
    { page: number; userId: string; status: MasterOrderStatusEnum },
    GetOrdersType
>();

fetchOrdersFx.use((params) => fetchOrdersByMasterId(params.page, '', params.userId, params.status));

const uniqueOrders = (orders: OrderType[]) => {
    return orders.reduce((res, cur) => {
        if (res.find((find) => JSON.stringify(find) === JSON.stringify(cur))) {
            return res;
        } else return [...res, cur];
    }, [] as OrderType[]);
};

$ordersStore.on(
    fetchOrdersFx.doneData,
    (store, newOrders) => (store = { data: uniqueOrders([...store.data, ...newOrders.data]), meta: newOrders.meta }),
);

export const clearOrdersStore = createEvent();

$ordersStore.on(clearOrdersStore, (store) => (store = { meta: {} as GetOrdersType['meta'], data: [] }));

export const $fetchError = restore<Error>(fetchOrdersFx.failData, null);

export const $ordersGetStatus = combine({
    loading: fetchOrdersFx.pending,
    error: $fetchError,
    data: $ordersStore,
});
