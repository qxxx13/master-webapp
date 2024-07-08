import { combine, createEffect, createStore, restore } from 'effector';

import { NewOrderType } from '../../../types/OrderType';
import { postNewOrder } from '../api/addNewOrderApi';

export const $newOrderFormStore = createStore<NewOrderType | Record<string, unknown>>({});

export const addNewOrderFx = createEffect<NewOrderType, NewOrderType>();

addNewOrderFx.use((newOrder) => postNewOrder(newOrder));

$newOrderFormStore.on(addNewOrderFx.doneData, (newOrder) => newOrder);

export const $fetchError = restore<Error>(addNewOrderFx.failData, null);

export const $ordersGetStatus = combine({
    loading: addNewOrderFx.pending,
    error: $fetchError,
    data: $newOrderFormStore,
});
