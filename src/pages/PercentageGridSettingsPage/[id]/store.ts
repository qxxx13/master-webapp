import { combine, createEffect, createStore, restore } from 'effector';

import { PercentageGridItem } from '../../../types/PercentageGridType';
import { fetchPercentageGridById } from './api';

export const $percentageGrid = createStore<PercentageGridItem | null>(null);

export const fetchPercentageGridFx = createEffect<{ id: string }, PercentageGridItem>();

fetchPercentageGridFx.use((params) => fetchPercentageGridById(params.id));

$percentageGrid.on(fetchPercentageGridFx.doneData, (_, item) => item);

export const $fetchError = restore<Error>(fetchPercentageGridFx.failData, null);

export const $percentageGridGetStatus = combine({
    loading: fetchPercentageGridFx.pending,
    error: $fetchError,
    data: $percentageGrid,
});
