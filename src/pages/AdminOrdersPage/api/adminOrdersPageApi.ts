import { instance } from '../../../config/apiConfig/apiConfig';
import { GetOrdersType, OrderStatusEnum, OrderType } from '../../../types/OrderType';
import { UserType } from '../../../types/UserType';

export const fetchAllOrders = async (
    page: number,
    perPage: number,
    status: OrderStatusEnum | 'all',
    phoneNumber: string | '',
): Promise<GetOrdersType> => {
    const orders = await instance
        .get(`orders?page=${page}&perPage=${perPage}&status=${status}&searchValue=${phoneNumber}`)
        .then((res) => res.data);

    return orders;
};

export const fetchOrderById = (id: string): Promise<OrderType> => {
    const order = instance.get(`orders/${id}`).then((res) => res.data);

    return order;
};

export const getAllUsers = (): Promise<UserType[]> => {
    const users = instance.get('user').then((res) => res.data);

    return users;
};
