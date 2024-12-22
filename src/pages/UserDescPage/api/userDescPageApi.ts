import { instance } from '../../../config/apiConfig/apiConfig';

export const fetchUserById = (userId: string) => {
    const user = instance.get(`/user/${userId}`).then((res) => res.data);

    return user;
};

export const fetchAllOrdersPerMonth = (userId: number, startDate: string, endDate: string) => {
    const ordersPerMonth = instance
        .get(`orders/?page=${1}&perPage=${200}&masterId=${userId}&startDate=${startDate}&endDate=${endDate}&status=all`)
        .then((res) => res.data);

    return ordersPerMonth;
};

export const fetchAllOrders = (userId: number) => {
    const allOrders = instance
        .get(`orders/?page=${1}&perPage=${500}&masterId=${userId}&status=all`)
        .then((res) => res.data);

    return allOrders;
};
