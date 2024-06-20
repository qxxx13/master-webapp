import { instance } from '../../../config/apiConfig/apiConfig';
import { GetOrdersType, MasterOrderStatusEnum, OrderType } from '../../../types/OrderType';

export const fetchOrdersByMasterId = async (
    page: number,
    perPage: number,
    phoneNumber: string | '',
    userId: string,
    status: MasterOrderStatusEnum,
    startDate: Date,
): Promise<GetOrdersType> => {
    const orders = await instance
        .get(
            `orders/?page=${page}&perPage=${perPage}&searchValue=${phoneNumber}&masterId=${userId}&status=${status}&startDate=${startDate}`,
        )
        .then((res) => res.data);

    return orders;
};

export const fetchOrderById = (id: string): Promise<OrderType> => {
    const order = instance.get(`orders/${id}`).then((res) => res.data);

    return order;
};
