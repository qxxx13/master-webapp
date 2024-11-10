import { Button, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { OrderStatusEnum } from '../../types/OrderType';
import { atWorkOrder, rejectOrder, returnToOrder, takeOrder, takeToSDOrder, wentOrder } from './api/workOrderApi';
import { setUpdate } from './model/setUpdateOrderStore';

export const OrderWorksButton: React.FC<{
    chatId: string;
    messageId: string;
    orderId: string;
    companyId: string;
    status: OrderStatusEnum;
}> = ({ chatId, messageId, orderId, status, companyId }) => {
    const navigate = useNavigate();

    const handleTake = async () => {
        await takeOrder(chatId, messageId, orderId);
        await setUpdate();
    };

    const handleCancel = async () => {
        await rejectOrder(chatId, messageId, orderId);
        await setUpdate();
        navigate('/');
    };

    const handleAtWork = async () => {
        await atWorkOrder(chatId, messageId, orderId);
        await setUpdate();
    };

    const handleWent = async () => {
        await wentOrder(chatId, messageId, orderId);
        await setUpdate();
    };

    const handleSD = async () => {
        await takeToSDOrder(chatId, messageId, orderId);
        navigate(`/`);
    };

    const handleClose = () => {
        navigate(`/closeorder/${chatId}/${messageId}/${orderId}/${companyId}`);
    };

    const handleReturn = async () => {
        await returnToOrder(chatId, messageId, orderId);
        await setUpdate();
    };

    switch (status) {
        case 'pending':
            return (
                <Stack sx={{ p: 2 }} gap={1}>
                    <Button onClick={handleTake} variant="contained">
                        Принять
                    </Button>
                    <Button onClick={handleCancel} color="error" variant="contained">
                        Отказаться
                    </Button>
                </Stack>
            );
        case 'atWork':
            return (
                <Stack sx={{ p: 2 }} gap={1}>
                    <Button onClick={handleWent} color="warning" variant="contained">
                        Отъехал за ЗЧ
                    </Button>
                    <Button onClick={handleSD} color="warning" variant="contained">
                        Забрал на СД
                    </Button>
                    <Button onClick={handleClose} color="success" variant="contained">
                        Закрыть заявку
                    </Button>
                </Stack>
            );
        case 'active':
            return (
                <Stack sx={{ p: 2 }} gap={1}>
                    <Button onClick={handleAtWork} variant="contained">
                        В работе
                    </Button>
                    <Button onClick={handleWent} color="warning" variant="contained">
                        Отъехал за ЗЧ
                    </Button>
                    <Button onClick={handleSD} color="warning" variant="contained">
                        Забрал на СД
                    </Button>
                    <Button onClick={handleClose} color="success" variant="contained">
                        Закрыть заявку
                    </Button>
                </Stack>
            );
        case 'masterWentForSparePart':
            return (
                <Stack sx={{ p: 2 }} gap={1}>
                    <Button onClick={handleReturn} variant="contained">
                        Вернулся
                    </Button>
                </Stack>
            );
        case 'takeToSD':
            return (
                <Stack sx={{ p: 2 }} gap={1}>
                    <Button onClick={handleReturn} variant="contained">
                        Вернулся
                    </Button>
                </Stack>
            );
        case 'debt':
            return (
                <Button onClick={handleClose} variant="contained">
                    Закрыть
                </Button>
            );
        case 'awaitingPayment':
            return <></>;
        case 'distribution':
            return <></>;
        default: {
            return <></>;
        }
    }
};
