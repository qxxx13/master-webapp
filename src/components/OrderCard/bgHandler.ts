import { OrderStatusEnum } from '../../types/OrderType';

/* #9a5ad6
#8774e1
#128a92
#b38f2e
#058d32 */

export const bgHandler = (status: OrderStatusEnum) => {
    switch (status) {
        case 'pending': {
            return '#b36b12';
        }
        case 'fulfilled': {
            return '#058d32';
        }
        case 'awaitingPayment': {
            return '#058d32';
        }
        case 'takeToSD': {
            return '#b36b12';
        }
        case 'active': {
            return '#9a5ad6';
        }
        case 'atWork': {
            return '#128a92';
        }
        case 'masterWentForSparePart': {
            return '#b38f2e';
        }
        default: {
            return '#8774e1';
        }
    }
};
