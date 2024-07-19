import { combine, createEffect, createStore, restore } from 'effector';

import { GetOrdersType } from '../../../types/OrderType';
import { fetchAllOrders } from '../api/userDescPageApi';

export const $userAllOrdersStore = createStore<GetOrdersType>({ meta: {} as GetOrdersType['meta'], data: [] });

export const fetchAllUserOrdersFx = createEffect<{ userId: number }, GetOrdersType>();

fetchAllUserOrdersFx.use((params) => fetchAllOrders(params.userId));

$userAllOrdersStore.on(fetchAllUserOrdersFx.doneData, (_, orders) => orders);

export const $fetchError = restore<Error>(fetchAllUserOrdersFx.failData, null);

export const $userAllOrdersStoreGetStatus = combine({
    loading: fetchAllUserOrdersFx.pending,
    error: $fetchError,
    data: $userAllOrdersStore,
});
