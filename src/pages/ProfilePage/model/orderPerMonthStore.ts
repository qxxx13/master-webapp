import { combine, createEffect, createStore, restore } from 'effector';

import { GetOrdersType, MasterOrderStatusEnum } from '../../../types/OrderType';
import { fetchAllOrdersPerMonth } from '../api/profileApi';

export const $ordersPerMonthStore = createStore<GetOrdersType>({ meta: {} as GetOrdersType['meta'], data: [] });

export const fetchOrdersPerMonthFx = createEffect<
    { userId: number; startDate: string; endDate: string },
    GetOrdersType
>();

fetchOrdersPerMonthFx.use((params) => fetchAllOrdersPerMonth(params.userId, params.startDate, params.endDate));

$ordersPerMonthStore.on(fetchOrdersPerMonthFx.doneData, (_, orders) => orders);

export const $fetchError = restore<Error>(fetchOrdersPerMonthFx.failData, null);

export const $ordersPerMonthGetStatus = combine({
    loading: fetchOrdersPerMonthFx.pending,
    error: $fetchError,
    data: $ordersPerMonthStore,
});
