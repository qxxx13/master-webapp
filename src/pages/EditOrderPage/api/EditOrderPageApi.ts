import { instance } from '../../../config/apiConfig/apiConfig';

export const getOrderById = async (orderId: string) => {
    const order = await instance.get(`/orders/${orderId}`);

    return order.data;
};

export const getAllUsers = async () => {
    const users = await instance.get(`/user`).then((res) => res.data);

    return users;
};
