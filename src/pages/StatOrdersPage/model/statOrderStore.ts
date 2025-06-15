import { createEffect, createEvent, createStore } from 'effector';
import moment from 'moment';

import { UserType } from '../../../types/UserType';
import { getAllUsers, getOrderStats, OrderStatsParams, OrderStatsResult } from '../api/StatOrderApi';

export const fetchOrderStats = createEvent<OrderStatsParams>();
export const fetchUsers = createEvent();
export const setDateRange = createEvent<{ startDate: string | null; endDate: string | null }>();
export const setTotalRange = createEvent<{ minTotal: number | null; maxTotal: number | null }>();
export const setDispId = createEvent<number | null>();
export const resetFilters = createEvent();

// Эффекты
export const fetchOrderStatsFx = createEffect<OrderStatsParams, OrderStatsResult>(async (params) => {
    return await getOrderStats(params);
});

export const fetchUsersFx = createEffect<void, UserType[]>(async () => {
    return await getAllUsers();
});

// Сторы
export const $orderStats = createStore<OrderStatsResult | null>(null)
    .on(fetchOrderStatsFx.doneData, (_, stats) => stats)
    .reset(resetFilters);

export const $users = createStore<UserType[]>([]).on(fetchUsersFx.doneData, (_, users) => users);

export const $filters = createStore<{
    dispId: number | null;
    startDate: string | null; // Теперь string
    endDate: string | null; // Теперь string
    minTotal: number | null;
    maxTotal: number | null;
}>({
    dispId: null,
    startDate: moment().startOf('month').format('YYYY-MM-DD'), // Форматируем как строку
    endDate: moment().endOf('month').format('YYYY-MM-DD'), // Форматируем как строку
    minTotal: null,
    maxTotal: null,
})
    .on(setDispId, (state, dispId) => ({ ...state, dispId }))
    .on(setDateRange, (state, { startDate, endDate }) => ({ ...state, startDate, endDate }))
    .on(setTotalRange, (state, { minTotal, maxTotal }) => ({ ...state, minTotal, maxTotal }))
    .reset(resetFilters);

// Обработка событий
fetchOrderStats.watch((params) => {
    fetchOrderStatsFx(params);
});

fetchUsers.watch(() => {
    fetchUsersFx();
});
