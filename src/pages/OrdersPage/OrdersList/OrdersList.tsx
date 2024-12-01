import { Stack, Typography } from '@mui/material';
import { useUnit } from 'effector-react';
import moment from 'moment';
import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import { CardLoading } from '../../../components/CardLoading/CardLoading';
import { OrderCard } from '../../../components/OrderCard/OrderCard';
import { MasterOrderStatusEnum, OrderStatusEnum, OrderType } from '../../../types/OrderType';
import { UserType } from '../../../types/UserType';
import { $ordersGetStatus, clearOrdersStore, fetchOrdersFx } from '../model/OrdersStore';

type OrderListProps = {
    currentUser: UserType;
    page: number;
    status: MasterOrderStatusEnum;
    type: 'archive' | 'chronology';
};

export const OrdersList: React.FC<OrderListProps> = ({ currentUser, page, status, type }) => {
    const { data, error, loading } = useUnit($ordersGetStatus);
    const [index, setIndex] = useState(2);
    const [hasMore, setHasMore] = useState(true);
    const [orders, setOrders] = useState<OrderType[]>([]);

    const ordersList = orders.map((order) => <OrderCard order={order} key={order.Id} />);

    const fetchMore = () => {
        index <= data.meta.lastPage &&
            fetchOrdersFx({
                page: index,
                userId: String(currentUser.Id),
                status: status,
            });

        index <= data.meta.lastPage && setIndex((prevIndex) => prevIndex + 1);
        index <= data.meta.lastPage ? setHasMore(true) : setHasMore(false);
    };

    useEffect(() => {
        if (currentUser.Id) {
            clearOrdersStore();
            fetchOrdersFx({
                page: 1,
                userId: String(currentUser.Id),
                status: status,
            });
        }
    }, [page, status, currentUser]);

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
                    order.Status !== OrderStatusEnum.debt &&
                    order.Status !== OrderStatusEnum.rejectedByMaster,
            );

            setOrders(list);
        }
    }, [data, type]);

    if (!loading && ordersList.length === 0) {
        return (
            <Typography variant="h6" textAlign={'center'} sx={{ mt: 20 }}>
                Заявок не найдено
            </Typography>
        );
    }

    return (
        <Stack alignItems="center" sx={{ mt: '145px', height: 'calc(100vh - 190px)', overflowY: 'scroll', p: 2 }}>
            <Stack gap={1} sx={{ width: '100%' }}>
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
                    {ordersList}
                </InfiniteScroll>
            </Stack>
        </Stack>
    );
};
