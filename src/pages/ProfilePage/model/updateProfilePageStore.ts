import { createEvent, createStore } from 'effector';

export const $updateProfilePageStore = createStore(0);

export const setUpdateProfilePage = createEvent();

$updateProfilePageStore.on(setUpdateProfilePage, (state) => state + 1);
