import { instance } from '../../../config/apiConfig/apiConfig';
import { CloseOrderType, OrderStatusEnum } from '../../../types/OrderType';

export const getInterestRate = (masterId: string) => {
    const interestRate = instance.get(`user/interest/${masterId}`).then((res) => res.data);

    return interestRate;
};

export const getMasterId = (orderId: string) => {
    const masterId = instance.get(`orders/masterId/${orderId}`).then((res) => res.data);

    return masterId;
};

export const closeOrder = (
    orderId: string,
    closeData: CloseOrderType,
    chatId: string,
    messageId: string,
    closerId: string,
    status: OrderStatusEnum,
) => {
    const closeOrder = instance
        .post(
            `/orders/closeOrder/${orderId}?chatId=${chatId}&messageId=${messageId}&closerId=${closerId}&status=${status}`,
            closeData,
        )
        .then((res) => res.data);

    return closeOrder;
};

export const getOrderById = async (orderId: string) => {
    const order = await instance.get(`/orders/${orderId}`).then((res) => res.data);

    return order;
};
