import { combine, createEffect, createStore, restore } from 'effector';

import { OrderType } from '../../../types/OrderType';
import { fetchOrderById } from '../api/orderDescApi';

export const $orderStore = createStore<OrderType | Record<string, unknown>>({});

export const fetchOrderByIdFx = createEffect<{ orderId: string }, OrderType>();

fetchOrderByIdFx.use((params) => fetchOrderById(params.orderId));

$orderStore.on(fetchOrderByIdFx.doneData, (_, order) => order);

export const $fetchError = restore<Error>(fetchOrderByIdFx.failData, null);

export const $ordersGetStatus = combine({
    loading: fetchOrderByIdFx.pending,
    error: $fetchError,
    data: $orderStore,
});
