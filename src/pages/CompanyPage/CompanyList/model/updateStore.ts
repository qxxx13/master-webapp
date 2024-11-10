import { createEvent, createStore } from 'effector';

export const $updateStore = createStore(0);

export const setUpdate = createEvent();

$updateStore.on(setUpdate, (store) => (store = store + 1));
