import { UserType } from '@shared/types';

export type OrdersListProps = {
    masterId: string | 'all';
    users: UserType[];
};
