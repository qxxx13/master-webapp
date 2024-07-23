import { combine, createEffect, createStore, restore } from 'effector';

import { instance } from '../../../config/apiConfig/apiConfig';
import { UserType } from '../../../types/UserType';
import { getUserById } from '../api/profileApi';

export const $userStore = createStore<UserType | Record<string, unknown>>({});

export const fetchUserByIdFx = createEffect<{ userId: number }, UserType>();

fetchUserByIdFx.use((params) => getUserById(params.userId));

$userStore.on(fetchUserByIdFx.doneData, (_, user) => {
    const baseUrl = instance.defaults.baseURL;
    const avatarUrl = user.AvatarId ? `${baseUrl}files/${user.AvatarId}` : '';
    user.AvatarUrl = avatarUrl;
    return user;
});

export const $fetchError = restore<Error>(fetchUserByIdFx.failData, null);

export const $userStoreGetStatus = combine({
    loading: fetchUserByIdFx.pending,
    error: $fetchError,
    data: $userStore,
});
