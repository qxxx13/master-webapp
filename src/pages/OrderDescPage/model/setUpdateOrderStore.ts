import { createEvent, createStore } from 'effector';

export const $updateOrderStore = createStore(0);

export const setUpdate = createEvent();

$updateOrderStore.on(setUpdate, (state) => state + 1);
