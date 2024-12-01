import { CircularProgress, Stack } from '@mui/material';
import { useUnit } from 'effector-react';
import { FC, useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import { CardLoading } from '../../../components/CardLoading/CardLoading';
import { OrderCard } from '../../../components/OrderCard/OrderCard';
import { OrderStatusEnum, OrderType } from '../../../types/OrderType';
import { UserType } from '../../../types/UserType';
import { $allOrdersGetStatus, clearOrdersStore, fetchAllOrdersFx } from '../model/ordersStore';

type OrdersListProps = {
    masterId: string | 'all';
    users: UserType[];
    type: 'archive' | 'chronology';
    phoneNumber: string;
    status: OrderStatusEnum | 'all';
};

export const OrdersList: FC<OrdersListProps> = ({ masterId, users, type, phoneNumber = '', status }) => {
    const [hasMore, setHasMore] = useState(true);
    const [index, setIndex] = useState(2);
    const { data } = useUnit($allOrdersGetStatus);
    const [orders, setOrders] = useState<OrderType[]>([]);

    const allOrdersList = orders.map((order, index) => {
        const user = users.find((user) => user.Id === order.MasterId);
        return <OrderCard order={order} key={index} user={user as UserType} />;
    });

    const fetchMore = () => {
        index <= data.meta.lastPage &&
            fetchAllOrdersFx({ page: index, phoneNumber: phoneNumber, status: status || 'all', masterId: masterId });

        index <= data.meta.lastPage && setIndex((prevIndex) => prevIndex + 1);
        index <= data.meta.lastPage ? setHasMore(true) : setHasMore(false);
    };

    useEffect(() => {
        clearOrdersStore();
        fetchAllOrdersFx({ page: 1, phoneNumber: phoneNumber, status: status || 'all', masterId: masterId });
    }, [masterId, phoneNumber, status]);

    useEffect(() => {
        if (type === 'archive') {
            const list = data.data.filter(
                (order) =>
                    order.Status !== OrderStatusEnum.active &&
                    order.Status !== OrderStatusEnum.atWork &&
                    order.Status !== OrderStatusEnum.pending &&
                    order.Status !== OrderStatusEnum.awaitingPayment &&
                    order.Status !== OrderStatusEnum.distribution &&
                    order.Status !== OrderStatusEnum.masterWentForSparePart &&
                    order.Status !== OrderStatusEnum.debt &&
                    order.Status !== OrderStatusEnum.takeToSD,
            );

            setOrders(list);
        } else if (type === 'chronology' || type === null) {
            const list = data.data.filter(
                (order) =>
                    order.Status !== OrderStatusEnum.awaitingPayment &&
                    order.Status !== OrderStatusEnum.distribution &&
                    order.Status !== OrderStatusEnum.fulfilled &&
                    order.Status !== OrderStatusEnum.missedCall &&
                    order.Status !== OrderStatusEnum.rejectedByClient &&
                    order.Status !== OrderStatusEnum.rejectedByMaster,
            );

            setOrders(list);
        }
    }, [data, type]);

    return (
        <Stack alignItems="center" sx={{ mb: '60px' }}>
            <InfiniteScroll
                dataLength={data.data.length}
                next={fetchMore}
                hasMore={hasMore}
                loader={<CardLoading height={160} />}
                style={{
                    display: 'flex',
                    gap: 8,
                    flexDirection: 'column',
                    width: 'calc(100vw - 17px)',
                    padding: '16px',
                }}
            >
                {allOrdersList}
            </InfiniteScroll>
        </Stack>
    );
};
