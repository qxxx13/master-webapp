import {
    Avatar,
    Button,
    Card,
    CardActionArea,
    CardContent,
    Chip,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Stack,
    Typography,
} from '@mui/material';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

import { deliveredOrder } from '../../pages/OrderDescPage/api/workOrderApi';
import { setUpdate } from '../../pages/OrderDescPage/model/setUpdateOrderStore';
import { OrderType } from '../../types/OrderType';
import { UserType } from '../../types/UserType';
import { StatusChip } from '../StatusChip/StatusChip';
import { bgHandler } from './bgHandler';
import { useState } from 'react';
import { instance } from '../../config/apiConfig/apiConfig';
import { UserChip } from '../UserChip/UserChip';

export const OrderCard: React.FC<{
    order: OrderType;
    user?: UserType;
    currentUserRole?: 'admin' | 'disp' | 'master';
}> = ({ order, user, currentUserRole }) => {
    const navigate = useNavigate();
    const [showDialog, setShowDialog] = useState(false);

    const toggleShowDialog = (showDialog: boolean) => () => {
        setShowDialog(showDialog);
    };

    const avatarUrl = user && user.AvatarId ? `${instance.defaults.baseURL}files/${user.AvatarId}` : '';

    const goToOrderDescPage = () => navigate(`/${order.Id}`);

    const bgColor = bgHandler(order.Status);

    const handleDelivered = () => {
        deliveredOrder(user!.TelegramChatId, String(order.MessageId), String(order.Id));
        setUpdate();
        toggleShowDialog(false);
    };

    return (
        <Card sx={{ width: '100%', borderRadius: 2 }}>
            <CardActionArea onClick={goToOrderDescPage}>
                <CardContent sx={{ backgroundColor: bgColor }}>
                    <Stack justifyContent="space-between" flexDirection="row">
                        <Stack alignItems="flex-start">
                            <Typography variant="body1">Заявка №{order.Id}</Typography>
                            <Typography variant="body1">{moment(order.Date).format('DD.MM.YY')}</Typography>
                            <Typography variant="body1">{order.City}</Typography>
                            <Typography variant="body1">{order.Address}</Typography>
                        </Stack>
                        <Stack alignItems="flex-end" gap={1}>
                            <StatusChip status={order.Status} />
                            <Typography variant="body1">{order.Time}</Typography>
                            {user && <UserChip user={user} />}
                        </Stack>
                    </Stack>
                    <Typography variant="body1">{order.Description}</Typography>
                </CardContent>
            </CardActionArea>
            {currentUserRole === 'admin' && (
                <Button variant="contained" sx={{ width: '100%' }} color="success" onClick={toggleShowDialog(true)}>
                    Закрыть
                </Button>
            )}

            <Dialog open={showDialog} onClose={toggleShowDialog(false)}>
                <DialogTitle>Закрыть все заявки</DialogTitle>
                <DialogContent>
                    <DialogContentText>Вы уверены, что хотите закрыть заявку №{order.Id}?</DialogContentText>
                </DialogContent>
                <DialogActions sx={{ justifyContent: 'space-between', p: 2 }}>
                    <Button variant="outlined" color="warning" onClick={toggleShowDialog(false)}>
                        Нет
                    </Button>
                    <Button variant="outlined" color="success" onClick={handleDelivered}>
                        Да
                    </Button>
                </DialogActions>
            </Dialog>
        </Card>
    );
};

/* 
#9a5ad6
#8774e1
#128a92
#b38f2e
#058d32
*/
