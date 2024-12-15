import { Dayjs } from 'dayjs';
import { combine, createEffect, createStore, restore } from 'effector';

import { GetOrdersType } from '../../../types/OrderType';
import { fetchAllOrders } from '../api/adminPaymentPageApi';

export const $ordersPaymentStore = createStore<GetOrdersType>({ meta: {} as GetOrdersType['meta'], data: [] });

export const fetchOrdersFx = createEffect<{ userId: string; ordersDate: Dayjs | null }, GetOrdersType>();

fetchOrdersFx.use((params) => fetchAllOrders(params.userId, params.ordersDate?.format('YYYY-MM-DD')));

$ordersPaymentStore.on(fetchOrdersFx.doneData, (_, orders) => orders);

export const $fetchError = restore<Error>(fetchOrdersFx.failData, null);

export const $ordersPaymentStoreGetStatus = combine({
    loading: fetchOrdersFx.pending,
    error: $fetchError,
    data: $ordersPaymentStore,
});
