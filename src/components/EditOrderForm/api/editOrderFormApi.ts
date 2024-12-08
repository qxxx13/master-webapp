import { instance } from '../../../config/apiConfig/apiConfig';
import { OrderType } from '../../../types/OrderType';

export const editOrder = (editedOrder: OrderType): Promise<OrderType> => {
    const order = instance.post('orders/edit', editedOrder).then((res) => res.data);

    return order;
};

export const sendToMaster = async (editedOrder: OrderType) => {
    await instance
        .post('orders/edit', editedOrder)
        .then((res) => res.data)
        .catch((e) => console.log(e));
    await instance
        .post('bot/create', editedOrder)
        .then((res) => res.data)
        .catch((e) => console.log(e));
    return await instance
        .patch(`bot/deleteDistribution?messageId=${editedOrder.DistributionOrderMessageId}`)
        .catch((e) => console.log(e));
};

export const transferOrder = async (editedOrder: OrderType) => {
    await instance
        .post(`orders/edit`, editedOrder)
        .then((res) => res.data)
        .catch((e) => console.log(e));
    return await instance
        .patch(`bot/transfer?orderId=${editedOrder.Id}`)
        .then((res) => res.data)
        .catch((e) => console.log(e));
};
