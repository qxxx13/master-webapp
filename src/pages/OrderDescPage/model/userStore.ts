import { combine, createEffect, createStore, restore } from 'effector';

import { UserType } from '../../../types/UserType';
import { fetchUserById } from '../api/orderDescApi';

export const $userStore = createStore<UserType | Record<string, unknown>>({});

export const fetchUserByIdFx = createEffect<{ userId: number }, UserType>();

fetchUserByIdFx.use((params) => fetchUserById(params.userId));

$userStore.on(fetchUserByIdFx.doneData, (_, user) => user);

export const $fetchError = restore<Error>(fetchUserByIdFx.failData, null);

export const $userGetStatus = combine({
    loading: fetchUserByIdFx.pending,
    error: $fetchError,
    data: $userStore,
});
