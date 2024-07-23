import { combine, createEffect, createStore, restore } from 'effector';

import { UserType } from '../../../types/UserType';
import { fetchUserById } from '../api/orderDescApi';

export const $dispStore = createStore<UserType | Record<string, unknown>>({});

export const fetchDispByIdFx = createEffect<{ userId: number }, UserType>();

fetchDispByIdFx.use((params) => fetchUserById(params.userId));

$dispStore.on(fetchDispByIdFx.doneData, (_, user) => user);

export const $fetchError = restore<Error>(fetchDispByIdFx.failData, null);

export const $dispStoreGetStatus = combine({
    loading: fetchDispByIdFx.pending,
    error: $fetchError,
    data: $dispStore,
});
