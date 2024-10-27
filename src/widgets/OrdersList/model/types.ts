import { MasterOrderStatusEnum, OrderType, UserType } from '@shared/types';

export type OrdersListProps = {
    currentUser: UserType;
    page: number;
    status: MasterOrderStatusEnum;
    orders: OrderType;
    masterId: string | 'all';
    users: UserType[];
};
