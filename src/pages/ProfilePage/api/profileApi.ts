import { instance } from '../../../config/apiConfig/apiConfig';

export const fetchAllOrdersPerMonth = (userId: number, startDate: string, endDate: string) => {
    const ordersPerMonth = instance
        .get(`orders/?page=${1}&perPage=${200}&masterId=${userId}&startDate=${startDate}&endDate=${endDate}`)
        .then((res) => res.data);

    return ordersPerMonth;
};
