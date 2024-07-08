import { Button, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const AdminButtons: React.FC<{ chatId: string; messageId: string; orderId: string }> = ({
    chatId,
    messageId,
    orderId,
}) => {
    const navigate = useNavigate();

    const handleEditOrder = () => {
        navigate(`/editOrder/${orderId}`);
    };

    const handleClose = () => {
        navigate(`/closeorder/${chatId}/${messageId}/${orderId}`);
    };

    return (
        <Stack gap={1}>
            <Button variant="outlined" onClick={handleEditOrder}>
                Редактировать
            </Button>
            <Button variant="outlined" onClick={handleClose}>
                Закрыть
            </Button>
        </Stack>
    );
};
