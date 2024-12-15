import { instance } from '../../../config/apiConfig/apiConfig';
import { OrderStatusEnum } from '../../../types/OrderType';

export const closeOrder = async (
    orderId: string,
    chatId: string,
    messageId: string,
    closerId: string,
    status: OrderStatusEnum,
) => {
    const closeOrder = await instance
        .post(
            `/orders/closeOrder/${orderId}?chatId=${chatId}&messageId=${messageId}&closerId=${closerId}&status=${status}`,
            {
                MasterSalary: '0',
                TotalPrice: '0',
                Expenses: '0',
                CompanyShare: '0',
                Price: '0',
                Debt: '0',
            },
        )
        .then((res) => res.data);

    return { closeOrder };
};
