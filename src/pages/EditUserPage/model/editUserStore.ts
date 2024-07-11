import { combine, createEffect, createStore, restore } from 'effector';

import { UserType } from '../../../types/UserType';
import { getUserById } from '../api/editUserPageApi';

export const $editUserStore = createStore<UserType | Record<string, unknown>>({});

export const fetchUserFx = createEffect<{ userId: string }, UserType>();

fetchUserFx.use((params) => getUserById(params.userId));

$editUserStore.on(fetchUserFx.doneData, (_, user) => user);

export const $fetchError = restore<Error>(fetchUserFx.failData, null);

export const $editUserStoreGetStatus = combine({
    loading: fetchUserFx.pending,
    error: $fetchError,
    data: $editUserStore,
});
