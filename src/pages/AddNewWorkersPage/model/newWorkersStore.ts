import { combine, createEffect, createStore, restore } from 'effector';

import { UserType } from '../../../types/UserType';
import { getAllUsers } from '../api/newWorkersApi';

export const $newWorkersStore = createStore<UserType[]>([]);

export const fetchAllUsersFx = createEffect<{ companyId: number }, UserType[]>();

fetchAllUsersFx.use((params) => getAllUsers(params.companyId));

$newWorkersStore.on(fetchAllUsersFx.doneData, (_, users) => users);

export const $fetchError = restore<Error>(fetchAllUsersFx.failData, null);

export const $newWorkersStoreGetStatus = combine({
    loading: fetchAllUsersFx.pending,
    error: $fetchError,
    data: $newWorkersStore,
});
