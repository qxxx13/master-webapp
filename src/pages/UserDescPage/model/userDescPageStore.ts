import { combine, createEffect, createStore, restore } from 'effector';
import { UserType } from '../../../types/UserType';
import { fetchUserById } from '../api/userDescPageApi';

export const $userDescPageStore = createStore<UserType | Record<string, unknown>>({});

export const fetchUserByIdFx = createEffect<{ userId: string }, UserType>();

fetchUserByIdFx.use((params) => fetchUserById(params.userId));

$userDescPageStore.on(fetchUserByIdFx.doneData, (_, user) => user);

export const $fetchError = restore<Error>(fetchUserByIdFx.failData, null);

export const $userDescPageStoreGetStatus = combine({
    loading: fetchUserByIdFx.pending,
    error: $fetchError,
    data: $userDescPageStore,
});
