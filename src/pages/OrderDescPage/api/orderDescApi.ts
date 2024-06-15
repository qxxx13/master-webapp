import { instance } from '../../../config/apiConfig/apiConfig';
import { fetchUserByIdFx } from '../model/userStore';

export const fetchOrderById = async (orderId: string) => {
    const order = await instance.get(`/orders/${orderId}`).then((res) => res.data);

    fetchUserByIdFx({ userId: order.MasterId as number });

    return order;
};

export const fetchUserById = (userId: number) => {
    const user = instance.get(`/user/${userId}`).then((res) => res.data);

    return user;
};
