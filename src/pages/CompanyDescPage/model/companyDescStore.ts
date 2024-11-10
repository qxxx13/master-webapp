import { combine, createEffect, createEvent, createStore, restore } from 'effector';

import { CompanyType } from '../../../types/CompanyType';
import { fetchCompanyById } from '../api/companyDescApi';

export const $companyDescStore = createStore<CompanyType | Record<string, unknown>>({});

export const fetchCompanyByIdFx = createEffect<{ orderId: string }, CompanyType>();

fetchCompanyByIdFx.use((params) => fetchCompanyById(params.orderId));

$companyDescStore.on(fetchCompanyByIdFx.doneData, (_, order) => order);

export const $fetchError = restore<Error>(fetchCompanyByIdFx.failData, null);

export const $companyDescStoreGetStatus = combine({
    loading: fetchCompanyByIdFx.pending,
    error: $fetchError,
    data: $companyDescStore,
});
