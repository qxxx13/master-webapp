import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import SendIcon from '@mui/icons-material/Send';
import { Button, CircularProgress, IconButton, Link } from '@mui/material';
import { useUnit } from 'effector-react';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { OrderStatusEnum, OrderType } from '../../types/OrderType';
import { $ordersGetStatus, fetchOrderByIdFx } from './model/orderDescStore';
import { $updateOrderStore } from './model/setUpdateOrderStore';
import { $userGetStatus } from './model/userStore';
import { OrderDesc } from './OrderDesc';
import { OrderWorksButton } from './OrderWorkButtons';

export const OrderDescPage = () => {
    const navigate = useNavigate();
    const id = useParams().id as string;

    const { data: order, error, loading } = useUnit($ordersGetStatus);
    const { data: user, loading: userLoading } = useUnit($userGetStatus);
    const update = useUnit($updateOrderStore);

    const goBack = () => navigate(-1);

    useEffect(() => {
        fetchOrderByIdFx({ orderId: id });
    }, [update]);

    return (
        <>
            {!loading && Object.keys(order).length !== 0 ? (
                <>
                    <IconButton onClick={goBack} sx={{ position: 'absolute', left: 2, top: 2 }} size="large">
                        <ArrowBackIosNewIcon />
                    </IconButton>
                    <Button
                        startIcon={<SendIcon />}
                        variant="outlined"
                        sx={{ position: 'absolute', top: 10, right: 10 }}
                    >
                        <Link href="https://t.me/dirrnd" sx={{ textDecoration: 'none' }}>
                            Связать с диспом
                        </Link>
                    </Button>

                    <OrderDesc order={order as OrderType} />
                    <OrderWorksButton
                        chatId={String(user.TelegramChatId)}
                        messageId={String(order.MessageId)}
                        orderId={String(order.Id)}
                        status={order.Status as OrderStatusEnum}
                    />
                </>
            ) : (
                <CircularProgress />
            )}
        </>
    );
};
