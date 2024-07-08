import { instance } from '../../../config/apiConfig/apiConfig';
import { NewOrderType } from '../../../types/OrderType';

export const postNewOrder = (newOrder: NewOrderType): Promise<NewOrderType> => {
    const addNewOrder = instance.post('orders', newOrder).then((res) => res.data);

    return addNewOrder;
};
