import { Card, CardActionArea, CardContent, Stack, Typography } from '@mui/material';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

import { OrderType } from '../../types/OrderType';
import { StatusChip } from '../StatusChip/StatusChip';
import { bgHandler } from './bgHandler';

export const OrderCard: React.FC<{ order: OrderType }> = ({ order }) => {
    const navigate = useNavigate();

    const goToOrderDescPage = () => navigate(`/${order.Id}`);

    const bgColor = bgHandler(order.Status);

    return (
        <Card sx={{ width: '100%', borderRadius: 2 }}>
            <CardActionArea onClick={goToOrderDescPage}>
                <CardContent sx={{ backgroundColor: bgColor }}>
                    <Stack flexDirection="row" alignItems="center" justifyContent="space-between">
                        <Typography variant="body1">Заявка №{order.Id}</Typography>
                        <StatusChip status={order.Status} />
                    </Stack>
                    <Stack flexDirection="row" alignItems="center" justifyContent="space-between">
                        <Typography variant="body1">{moment(order.Date).format('DD.MM.YY')}</Typography>
                        <Typography variant="body1">{order.Time}</Typography>
                    </Stack>
                    <Stack flexDirection="row" alignItems="center" justifyContent="space-between">
                        <Typography variant="body1">{order.Address}</Typography>
                    </Stack>
                    <Typography variant="body1">{order.Description}</Typography>
                </CardContent>
            </CardActionArea>
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
