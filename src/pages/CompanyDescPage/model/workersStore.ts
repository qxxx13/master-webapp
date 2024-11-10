import { combine, createEffect, createStore, restore } from 'effector';

import { UserType } from '../../../types/UserType';
import { fetchUserById, fetchWorkers } from '../api/companyDescApi';

export const $companyWorkersStore = createStore<UserType[]>([]);

export const fetchCompanyWorkersByIdFx = createEffect<{ companyId: number }, UserType[]>();

fetchCompanyWorkersByIdFx.use((params) => fetchWorkers(params.companyId));

$companyWorkersStore.on(fetchCompanyWorkersByIdFx.doneData, (_, user) => user);

export const $fetchError = restore<Error>(fetchCompanyWorkersByIdFx.failData, null);

export const $companyWorkersStoreGetStatus = combine({
    loading: fetchCompanyWorkersByIdFx.pending,
    error: $fetchError,
    data: $companyWorkersStore,
});
