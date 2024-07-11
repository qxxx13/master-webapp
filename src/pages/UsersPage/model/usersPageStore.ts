import { combine, createEffect, createStore, restore } from 'effector';

import { UserType } from '../../../types/UserType';
import { getAllUsers } from '../api/usersPageApi';

export const $usersPageStore = createStore<UserType[]>([]);

export const fetchAllUsersFx = createEffect<void, UserType[]>();

fetchAllUsersFx.use(() => getAllUsers());

$usersPageStore.on(fetchAllUsersFx.doneData, (_, users) => users);

export const $fetchError = restore<Error>(fetchAllUsersFx.failData, null);

export const $usersPageStoreGetStatus = combine({
    loading: fetchAllUsersFx.pending,
    error: $fetchError,
    data: $usersPageStore,
});
