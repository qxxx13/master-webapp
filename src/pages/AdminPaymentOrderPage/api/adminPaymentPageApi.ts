import { instance } from '../../../config/apiConfig/apiConfig';

export const fetchAllOrders = async (masterId: string) => {
    const orders = await instance
        .get(`orders?page=1&perPage=150&status=awaitingPayment&masterId=${masterId}`)
        .then((res) => res.data);

    return orders;
};

export const getAllUsers = () => {
    const users = instance.get('user').then((res) => res.data);

    return users;
};
