import { combine, createEffect, createStore, restore } from 'effector';

import { OrderType } from '../../../types/OrderType';
import { getOrderById } from '../api/EditOrderPageApi';

export const $editOrderStore = createStore<OrderType | Record<string, unknown>>({});

export const fetchOrderFx = createEffect<{ orderId: string }, OrderType>();

fetchOrderFx.use((params) => getOrderById(params.orderId));

$editOrderStore.on(fetchOrderFx.doneData, (_, order) => order);

export const $fetchError = restore<Error>(fetchOrderFx.failData, null);

export const $editOrderStoreGetStatus = combine({
    loading: fetchOrderFx.pending,
    error: $fetchError,
    data: $editOrderStore,
});
