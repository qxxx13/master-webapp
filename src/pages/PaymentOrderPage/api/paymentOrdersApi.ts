import { instance } from '../../../config/apiConfig/apiConfig';
import { GetOrdersType } from '../../../types/OrderType';

export const fetchOrdersByMasterId = async (userId: string): Promise<GetOrdersType> => {
    const orders = await instance
        .get(`orders/?page=1&perPage=50}&masterId=${userId}&status=awaitingPayment`)
        .then((res) => res.data);

    return orders;
};
