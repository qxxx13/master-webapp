import { instance } from '../../../config/apiConfig/apiConfig';

export const getOrderById = async (orderId: string) => {
    const order = await instance.get(`/orders/${orderId}`).then((res) => res.data);

    return order;
};

export const takeOrder = async (chatId: string, messageId: string, orderId: string) => {
    await instance.patch(`orders/isWorking?id=${orderId}&isWorking=isWorking`).then((res) => res.data);
    await instance
        .patch(`/bot/take?chatId=${chatId}&messageId=${messageId}&orderId=${orderId}`)
        .then((res) => res.data);
};

export const rejectOrder = async (chatId: string, messageId: string, orderId: string) => {
    await instance.patch(`orders/isWorking?id=${orderId}&isWorking=close`).then((res) => res.data);
    await instance
        .patch(`/bot/rejectMaster?chatId=${chatId}&messageId=${messageId}&orderId=${orderId}`)
        .then((res) => res.data);
};

export const atWorkOrder = async (chatId: string, messageId: string, orderId: string) => {
    await instance
        .patch(`/bot/atWork?chatId=${chatId}&messageId=${messageId}&orderId=${orderId}`)
        .then((res) => res.data);
};

export const wentOrder = async (chatId: string, messageId: string, orderId: string) => {
    await instance.patch(`/bot/went?chatId=${chatId}&messageId=${messageId}&orderId=${orderId}`);
};

export const takeToSDOrder = async (chatId: string, messageId: string, orderId: string) => {
    await instance.patch(`/orders/isWorking?id=${orderId}&isWorking=close`);
    await instance.patch(`/bot/sd?chatId=${chatId}&messageId=${messageId}&orderId=${orderId}`);
};

export const returnToOrder = async (chatId: string, messageId: string, orderId: string) => {
    instance.patch(`/bot/atWork?chatId=${chatId}&messageId=${messageId}&orderId=${orderId}`).then((res) => res.data);
};
