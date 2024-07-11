import { combine, createEffect, createStore, restore } from 'effector';

import { UserType } from '../../../types/UserType';
import { getAllUsers } from '../api/adminPaymentPageApi';

export const $usersPaymentStore = createStore<UserType[]>([]);

export const fetchAllUsersFx = createEffect<void, UserType[]>();

fetchAllUsersFx.use(() => getAllUsers());

$usersPaymentStore.on(fetchAllUsersFx.doneData, (_, users) => users);

export const $fetchError = restore<Error>(fetchAllUsersFx.failData, null);

export const $usersPaymentStoreGetStatus = combine({
    loading: fetchAllUsersFx.pending,
    error: $fetchError,
    data: $usersPaymentStore,
});
