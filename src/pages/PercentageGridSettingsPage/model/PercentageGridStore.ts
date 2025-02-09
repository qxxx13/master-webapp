import { combine, createEffect, createStore, restore } from 'effector';

import { PercentageGrid } from '../../../types/PercentageGridType';
import { fetchAllPercentageGrid } from '../api/api';

export const $percentageGridList = createStore<PercentageGrid[]>([]);

export const fetchAllPercentageGridFx = createEffect<void, PercentageGrid[]>();

fetchAllPercentageGridFx.use(() => fetchAllPercentageGrid());

$percentageGridList.on(fetchAllPercentageGridFx.doneData, (_, list) => list);

export const $fetchError = restore<Error>(fetchAllPercentageGridFx.failData, null);

export const $percentageGridListGetStatus = combine({
    loading: fetchAllPercentageGridFx.pending,
    error: $fetchError,
    data: $percentageGridList,
});
