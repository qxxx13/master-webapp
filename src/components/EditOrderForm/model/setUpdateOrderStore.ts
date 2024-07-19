import { createEvent, createStore } from 'effector';

export const $updateOrderStore = createStore(0);

export const setUpdateOrderStore = createEvent();

$updateOrderStore.on(setUpdateOrderStore, (state) => state + 1);
