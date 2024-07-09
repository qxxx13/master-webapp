import { CircularProgress, Stack } from '@mui/material';
import { useUnit } from 'effector-react';
import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import { OrderCard } from '../../../components/OrderCard/OrderCard';
import { $allOrdersGetStatus, fetchAllOrdersFx } from '../model/ordersStore';

export const OrdersList: React.FC<{ currentPage: number }> = ({ currentPage }) => {
    const [hasMore, setHasMore] = useState(true);
    const [index, setIndex] = useState(2);
    const { data, error, loading } = useUnit($allOrdersGetStatus);

    const allOrdersList = data.data.map((order, index) => <OrderCard order={order} key={index} />);

    const fetchMore = () => {
        fetchAllOrdersFx({ page: index, perPage: 10, phoneNumber: '', status: 'all' });

        index !== data.meta.lastPage && setIndex((prevIndex) => prevIndex + 1);
        index !== data.meta.lastPage ? setHasMore(true) : setHasMore(false);

        console.log(index);
    };

    useEffect(() => {
        fetchAllOrdersFx({ page: 1, perPage: 10, phoneNumber: '', status: 'all' });
    }, []);

    return (
        <Stack
            alignItems="center"
            id="scrollableStack"
            sx={{ height: 'calc(100vh - 169px)', overflowY: 'scroll', mt: '110px' }}
        >
            <InfiniteScroll
                dataLength={data.data.length}
                next={fetchMore}
                hasMore={hasMore}
                loader={<CircularProgress />}
                scrollableTarget="scrollableStack"
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

/* 225px  */

/* 169px */
