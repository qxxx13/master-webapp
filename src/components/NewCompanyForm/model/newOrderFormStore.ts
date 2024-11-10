import { combine, createEffect, createStore, restore } from 'effector';
import { NewCompanyType } from '../../../types/CompanyType';
import { postNewCompany } from '../api/addNewCompanyApi';

export const $newCompanyFormStore = createStore<NewCompanyType | Record<string, unknown>>({});

export const addNewCompanyFx = createEffect<NewCompanyType, NewCompanyType>();

addNewCompanyFx.use((newCompany) => postNewCompany(newCompany));

$newCompanyFormStore.on(addNewCompanyFx.doneData, (newCompany) => newCompany);

export const $fetchError = restore<Error>(addNewCompanyFx.failData, null);

export const $newCompanyGetStatus = combine({
    loading: addNewCompanyFx.pending,
    error: $fetchError,
    data: $newCompanyFormStore,
});
