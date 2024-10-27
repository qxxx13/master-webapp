export const $ordersStore = createStore<GetOrdersType>({ meta: {} as GetOrdersType['meta'], data: [] });

export const fetchOrdersFx = createEffect<
    { page: number; perPage: number; userId: string; status: MasterOrderStatusEnum; startDate: Date },
    GetOrdersType
>();

fetchOrdersFx.use((params) =>
    fetchOrdersByMasterId(params.page, params.perPage, '', params.userId, params.status, params.startDate),
);

$ordersStore.on(fetchOrdersFx.doneData, (_, orders) => orders);

export const $fetchError = restore<Error>(fetchOrdersFx.failData, null);

export const $ordersGetStatus = combine({
    loading: fetchOrdersFx.pending,
    error: $fetchError,
    data: $ordersStore,
});
