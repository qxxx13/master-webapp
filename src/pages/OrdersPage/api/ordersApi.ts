import { instance } from '../../../config/apiConfig/apiConfig';
import { GetOrdersType, MasterOrderStatusEnum, OrderType } from '../../../types/OrderType';

export const fetchOrdersByMasterId = async (
    page: number,
    phoneNumber: string | '',
    userId: string,
    status: MasterOrderStatusEnum,
): Promise<GetOrdersType> => {
    const orders = await instance
        .get(`orders/?page=${page}&searchValue=${phoneNumber}&masterId=${userId}&status=${status}`)
        .then((res) => res.data);

    return orders;
};

export const fetchOrderById = (id: string): Promise<OrderType> => {
    const order = instance.get(`orders/${id}`).then((res) => res.data);

    return order;
};
