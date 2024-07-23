import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SendIcon from '@mui/icons-material/Send';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Button,
    CircularProgress,
    IconButton,
    Link,
    Stack,
    Typography,
} from '@mui/material';
import { useUnit } from 'effector-react';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { OrderStatusEnum, OrderType } from '../../types/OrderType';
import { UserType } from '../../types/UserType';
import { AdminButtons } from './AdminButtons';
import { $dispStoreGetStatus, fetchDispByIdFx } from './model/dispStore';
import { $ordersGetStatus, fetchOrderByIdFx } from './model/orderDescStore';
import { $updateOrderStore } from './model/setUpdateOrderStore';
import { $userGetStatus } from './model/userStore';
import { OrderDesc } from './OrderDesc';
import { OrderWorksButton } from './OrderWorkButtons';

export const OrderDescPage: React.FC<{ currentUser: UserType }> = ({ currentUser }) => {
    const navigate = useNavigate();
    const id = useParams().id as string;

    const { data: order, error, loading } = useUnit($ordersGetStatus);
    const { data: master, loading: masterLoading } = useUnit($userGetStatus);
    const update = useUnit($updateOrderStore);

    const goBack = () => navigate(-1);

    const BackBTN = Telegram.WebApp.BackButton;
    BackBTN.show();
    BackBTN.onClick(goBack);

    useEffect(() => {
        Telegram.WebApp.ready();
        fetchOrderByIdFx({ orderId: id });
    }, [update]);

    return (
        <>
            {!loading && !masterLoading && Object.keys(order).length !== 0 ? (
                <>
                    <OrderDesc order={order as OrderType} master={master as UserType} />
                    <OrderWorksButton
                        chatId={String(master.TelegramChatId)}
                        messageId={String(order.MessageId)}
                        orderId={String(order.Id)}
                        status={order.Status as OrderStatusEnum}
                    />
                    {currentUser.Role === 'admin' && (
                        <Accordion>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography>ADMIN tools</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <AdminButtons
                                    chatId={String(master.TelegramChatId)}
                                    messageId={String(order.MessageId)}
                                    orderId={String(order.Id)}
                                    status={order.Status as OrderStatusEnum}
                                />
                            </AccordionDetails>
                        </Accordion>
                    )}
                </>
            ) : (
                <CircularProgress />
            )}
        </>
    );
};
