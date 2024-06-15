import { combine, createEffect, createStore, restore } from 'effector';

import { GetOrdersType } from '../../../types/OrderType';
import { fetchOrdersByMasterId } from '../api/paymentOrdersApi';

export const $paymentOrdersStore = createStore<GetOrdersType>({ meta: {} as GetOrdersType['meta'], data: [] });

export const fetchOrdersFx = createEffect<{ userId: string }, GetOrdersType>();

fetchOrdersFx.use((params) => fetchOrdersByMasterId(params.userId));

$paymentOrdersStore.on(fetchOrdersFx.doneData, (_, orders) => orders);

export const $fetchError = restore<Error>(fetchOrdersFx.failData, null);

export const $paymentOrdersGetStatus = combine({
    loading: fetchOrdersFx.pending,
    error: $fetchError,
    data: $paymentOrdersStore,
});
