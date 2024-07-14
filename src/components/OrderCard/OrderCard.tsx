import { Card, CardActionArea, CardContent, Chip, Stack, Typography } from '@mui/material';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

import { OrderType } from '../../types/OrderType';
import { StatusChip } from '../StatusChip/StatusChip';
import { bgHandler } from './bgHandler';
import { UserType } from '../../types/UserType';

export const OrderCard: React.FC<{ order: OrderType; user?: UserType }> = ({ order, user }) => {
    const navigate = useNavigate();

    const goToOrderDescPage = () => navigate(`/${order.Id}`);

    const bgColor = bgHandler(order.Status);

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
                            {user && <Chip variant="outlined" label={user?.UserName} />}
                        </Stack>
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
