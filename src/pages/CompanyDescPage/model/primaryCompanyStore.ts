import { combine, createEffect, createStore, restore } from 'effector';

import { CompanyType } from '../../../types/CompanyType';
import { fetchCompanyById } from '../api/companyDescApi';

export const $primaryCompanyStore = createStore<CompanyType | Record<string, unknown>>({});

export const fetchPrimaryCompanyByIdFx = createEffect<{ companyId: string }, CompanyType>();

fetchPrimaryCompanyByIdFx.use((params) => fetchCompanyById(params.companyId));

$primaryCompanyStore.on(fetchPrimaryCompanyByIdFx.doneData, (_, company) => company);

export const $fetchError = restore<Error>(fetchPrimaryCompanyByIdFx.failData, null);

export const $primaryCompanyStoreGetStatus = combine({
    loading: fetchPrimaryCompanyByIdFx.pending,
    error: $fetchError,
    data: $primaryCompanyStore,
});
