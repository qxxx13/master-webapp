import { combine, createEffect, createStore, restore } from 'effector';

import { UserType } from '../../../../types/UserType';
import { getAllUsers } from '../api/createNewOrderPageApi';

export const $usersStore = createStore<UserType[]>([]);

export const fetchAllUsersFx = createEffect<void, UserType[]>();

fetchAllUsersFx.use(() => getAllUsers());

$usersStore.on(fetchAllUsersFx.doneData, (_, users) => users);

export const $fetchError = restore<Error>(fetchAllUsersFx.failData, null);

export const $usersGetStatus = combine({
    loading: fetchAllUsersFx.pending,
    error: $fetchError,
    data: $usersStore,
});
