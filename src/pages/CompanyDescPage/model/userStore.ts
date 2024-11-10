import { combine, createEffect, createStore, restore } from 'effector';
import { UserType } from '../../../types/UserType';
import { fetchUserById } from '../api/companyDescApi';

export const $companyOwnerStore = createStore<UserType | Record<string, unknown>>({});

export const fetchCompanyOwnerByIdFx = createEffect<{ userId: number }, UserType>();

fetchCompanyOwnerByIdFx.use((params) => fetchUserById(params.userId));

$companyOwnerStore.on(fetchCompanyOwnerByIdFx.doneData, (_, user) => user);

export const $fetchError = restore<Error>(fetchCompanyOwnerByIdFx.failData, null);

export const $companyOwnerStoreGetStatus = combine({
    loading: fetchCompanyOwnerByIdFx.pending,
    error: $fetchError,
    data: $companyOwnerStore,
});
