import { createEvent, createStore } from 'effector';

export const $navBarStore = createStore(0);

export const setNavBar = createEvent<number>();

$navBarStore.on(setNavBar, (state, pageNum) => (state = pageNum));
