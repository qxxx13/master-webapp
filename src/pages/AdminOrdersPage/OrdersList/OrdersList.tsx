import { CircularProgress, Stack } from '@mui/material';
import { useUnit } from 'effector-react';
import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import { OrderCard } from '../../../components/OrderCard/OrderCard';
import { UserType } from '../../../types/UserType';
import { $allOrdersGetStatus, clearOrdersStore, fetchAllOrdersFx } from '../model/ordersStore';
import { CardLoading } from '../../../components/CardLoading/CardLoading';

export const OrdersList: React.FC<{ masterId: string | 'all'; users: UserType[] }> = ({ masterId, users }) => {
    const [hasMore, setHasMore] = useState(true);
    const [index, setIndex] = useState(2);
    const { data } = useUnit($allOrdersGetStatus);

    const allOrdersList = data.data.map((order, index) => {
        const user = users.find((user) => user.Id === order.MasterId);
        return <OrderCard order={order} key={index} user={user as UserType} />;
    });

    const fetchMore = () => {
        index <= data.meta.lastPage &&
            fetchAllOrdersFx({ page: index, perPage: 10, phoneNumber: '', status: 'all', masterId: masterId });

        index <= data.meta.lastPage && setIndex((prevIndex) => prevIndex + 1);
        index <= data.meta.lastPage ? setHasMore(true) : setHasMore(false);
    };

    useEffect(() => {
        clearOrdersStore();
        fetchAllOrdersFx({ page: 1, perPage: 10, phoneNumber: '', status: 'all', masterId: masterId });
    }, [masterId]);

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
                    width: 'calc(100vw - 8px)',
                    padding: '16px',
                }}
            >
                {allOrdersList}
            </InfiniteScroll>
        </Stack>
    );
};
