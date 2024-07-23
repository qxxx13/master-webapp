import { instance } from '../../../config/apiConfig/apiConfig';
import { OrderStatusEnum } from '../../../types/OrderType';

export const closingOrderAtZero = (orderId: string, image: File) => {
    const reasonImage = instance.patch(
        `orders/reasonImage?orderId=${orderId}`,
        { file: image },
        {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        },
    );

    return reasonImage;
};

export const closeOrder = async (
    orderId: string,
    chatId: string,
    messageId: string,
    closerId: string,
    status: OrderStatusEnum,
) => {
    const closeOrder = await instance
        .post(`/orders/closeOrder/${orderId}?chatId=${chatId}&messageId=${messageId}&closerId=${closerId}`, {
            MasterSalary: '0',
            TotalPrice: '0',
            Expenses: '0',
            CompanyShare: '0',
            Price: '0',
            Debt: '0',
        })
        .then((res) => res.data);

    const patchStatus = await instance.patch(`/orders/status?id=${orderId}&status=${status}`);

    return { closeOrder, patchStatus };
};
