import { combine, createEffect, createStore, restore } from 'effector';

import { OrderType } from '../../../types/OrderType';
import { editOrder } from '../api/editOrderFormApi';

export const $editOrderFormStore = createStore<OrderType | Record<string, unknown>>({});

export const editOrderFx = createEffect<OrderType, OrderType>();

editOrderFx.use((newOrder) => editOrder(newOrder));

$editOrderFormStore.on(editOrderFx.doneData, (newOrder) => newOrder);

export const $fetchError = restore<Error>(editOrderFx.failData, null);

export const $editOrderFormStoreGetStatus = combine({
    loading: editOrderFx.pending,
    error: $fetchError,
    data: $editOrderFormStore,
});
