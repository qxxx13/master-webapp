import { combine, createEffect, createStore, restore } from 'effector';

import { UserType } from '../../../types/UserType';
import { getAllUsers } from '../api/EditOrderPageApi';

export const $editOrderUsersStore = createStore<UserType[]>([]);

export const fetchUsersFx = createEffect<void, UserType[]>();

fetchUsersFx.use(() => getAllUsers());

$editOrderUsersStore.on(fetchUsersFx.doneData, (_, users) => users);

export const $fetchError = restore<Error>(fetchUsersFx.failData, null);

export const $editOrderUsersStoreGetStatus = combine({
    loading: fetchUsersFx.pending,
    error: $fetchError,
    data: $editOrderUsersStore,
});
