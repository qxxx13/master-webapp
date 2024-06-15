import { combine, createEffect, createStore, restore } from 'effector';

import { OrderType } from '../../../types/OrderType';
import { getOrderById } from '../api/CloseOrderApi';

export const $closeOrderStore = createStore<OrderType | Record<string, unknown>>({});

export const fetchOrderFx = createEffect<{ orderId: string }, OrderType>();

fetchOrderFx.use((params) => getOrderById(params.orderId));

$closeOrderStore.on(fetchOrderFx.doneData, (_, order) => order);

export const $fetchError = restore<Error>(fetchOrderFx.failData, null);

export const $closeOrderGetStatus = combine({
    loading: fetchOrderFx.pending,
    error: $fetchError,
    data: $closeOrderStore,
});
