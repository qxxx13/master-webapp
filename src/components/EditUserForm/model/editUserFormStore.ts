import { combine, createEffect, createStore, restore } from 'effector';

import { UserType } from '../../../types/UserType';
import { editUser } from '../api/editUserFormApi';

export const $editUserFormStore = createStore<UserType | Record<string, unknown>>({});

export const editUserFx = createEffect<UserType, UserType>();

editUserFx.use((editedUser) => editUser(editedUser));

$editUserFormStore.on(editUserFx.doneData, (editedUser) => editedUser);

export const $fetchError = restore<Error>(editUserFx.failData, null);

export const $editUserFormStoreGetStatus = combine({
    loading: editUserFx.pending,
    error: $fetchError,
    data: $editUserFormStore,
});
