import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary, Stack, Typography } from '@mui/material';
import { BackButton } from '@vkruglikov/react-telegram-web-app';
import { useUnit } from 'effector-react';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { DescLoading } from '../../components/CardLoading/DescLoading';
import { OrderStatusEnum, OrderType } from '../../types/OrderType';
import { UserType } from '../../types/UserType';
import { AdminButtons } from './AdminButtons';
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

    useEffect(() => {
        Telegram.WebApp.ready();
        fetchOrderByIdFx({ orderId: id });
    }, [update]);

    return (
        <Stack sx={{ mb: '60px' }}>
            <BackButton onClick={goBack} />
            {!loading && !masterLoading && Object.keys(order).length !== 0 ? (
                <>
                    <Stack>
                        <OrderDesc
                            order={order as OrderType}
                            master={master as UserType}
                            isAdmin={currentUser.Role === 'admin' || currentUser.Role === 'disp'}
                        />
                        {currentUser.Role === 'admin' || currentUser.Role === 'disp' ? (
                            <Accordion defaultExpanded={true}>
                                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                    <Typography>ADMIN tools</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <AdminButtons
                                        chatId={String(master.TelegramChatId)}
                                        messageId={String(order.MessageId)}
                                        orderId={String(order.Id)}
                                        status={order.Status as OrderStatusEnum}
                                        companyId={String(master.CompanyId)}
                                        userRole={currentUser.Role}
                                    />
                                </AccordionDetails>
                            </Accordion>
                        ) : null}
                    </Stack>
                    <OrderWorksButton
                        chatId={String(master.TelegramChatId)}
                        messageId={String(order.MessageId)}
                        orderId={String(order.Id)}
                        companyId={String(master.CompanyId)}
                        status={order.Status as OrderStatusEnum}
                    />
                </>
            ) : (
                <DescLoading />
            )}
        </Stack>
    );
};
