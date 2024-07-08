import { combine, createEffect, createStore, restore } from 'effector';

import { UserType } from '../../../types/UserType';
import { getAllUsers } from '../api/adminOrdersPageApi';

export const $getUsersStore = createStore<UserType[]>([]);

export const fetchUsersFx = createEffect<void, UserType[]>();

fetchUsersFx.use(() => getAllUsers());

$getUsersStore.on(fetchUsersFx.doneData, (_, users) => users);

export const $fetchError = restore<Error>(fetchUsersFx.failData, null);

export const $usersGetStatus = combine({
    loading: fetchUsersFx.pending,
    error: $fetchError,
    data: $getUsersStore,
});
