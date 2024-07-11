import { combine, createEffect, createStore, restore } from 'effector';
import { NewUserType, UserType } from '../../../types/UserType';
import { createNewUser } from '../api/newUserFormApi';

export const $newUserFormStore = createStore<NewUserType | Record<string, unknown>>({});

export const addNewUserFx = createEffect<NewUserType, UserType>();

addNewUserFx.use((newUser) => createNewUser(newUser));

$newUserFormStore.on(addNewUserFx.doneData, (newUser) => newUser);

export const $fetchError = restore<Error>(addNewUserFx.failData, null);

export const $newUserFormStoreGetStatus = combine({
    loading: addNewUserFx.pending,
    error: $fetchError,
    data: $newUserFormStore,
});
