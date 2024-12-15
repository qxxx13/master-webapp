import { Button, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { OrderStatusEnum } from '../../types/OrderType';
import { deliveredOrder } from './api/workOrderApi';
import { setUpdate } from './model/setUpdateOrderStore';

export const AdminButtons: React.FC<{
    chatId: string;
    messageId: string;
    orderId: string;
    status: OrderStatusEnum;
    companyId: string;
}> = ({ chatId, messageId, orderId, status, companyId }) => {
    const navigate = useNavigate();

    const handleEditOrder = () => {
        navigate(`/editOrder/${orderId}`);
    };

    const handleClose = () => {
        navigate(`/closeorder/${chatId}/${messageId}/${orderId}/${companyId}`);
    };

    const handleDelivered = () => {
        deliveredOrder(chatId, messageId, orderId);
        setUpdate();
    };

    return (
        <Stack gap={1}>
            <Button variant="contained" onClick={handleEditOrder}>
                Редактировать
            </Button>
            <Button variant="contained" onClick={handleClose} color="success">
                Перезакрыть заявку
            </Button>
        </Stack>
    );
};
