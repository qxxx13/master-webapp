import { combine, createEffect, createStore, restore } from 'effector';
import { CompanyType } from '../../../types/CompanyType';
import { getAllCompanies } from '../api/companyListApi';

export const $companyListStore = createStore<CompanyType[]>([]);

export const fetchAllCompanyFx = createEffect<void, CompanyType[]>();

fetchAllCompanyFx.use(() => getAllCompanies());

$companyListStore.on(fetchAllCompanyFx.doneData, (_, users) => users);

export const $fetchError = restore<Error>(fetchAllCompanyFx.failData, null);

export const $companyListStoresGetStatus = combine({
    loading: fetchAllCompanyFx.pending,
    error: $fetchError,
    data: $companyListStore,
});
