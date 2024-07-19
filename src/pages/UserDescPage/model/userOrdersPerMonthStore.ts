import { combine, createEffect, createStore, restore } from 'effector';

import { GetOrdersType, MasterOrderStatusEnum } from '../../../types/OrderType';
import { fetchAllOrdersPerMonth } from '../api/userDescPageApi';

export const $userOrdersPerMonthStore = createStore<GetOrdersType>({ meta: {} as GetOrdersType['meta'], data: [] });

export const fetchUserOrdersPerMonthFx = createEffect<
    { userId: number; startDate: string; endDate: string },
    GetOrdersType
>();

fetchUserOrdersPerMonthFx.use((params) => fetchAllOrdersPerMonth(params.userId, params.startDate, params.endDate));

$userOrdersPerMonthStore.on(fetchUserOrdersPerMonthFx.doneData, (_, orders) => orders);

export const $fetchError = restore<Error>(fetchUserOrdersPerMonthFx.failData, null);

export const $userOrdersPerMonthStoreGetStatus = combine({
    loading: fetchUserOrdersPerMonthFx.pending,
    error: $fetchError,
    data: $userOrdersPerMonthStore,
});
