import { Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { MasterOrderStatusEnum } from '../../types/OrderType';
import { UserType } from '../../types/UserType';
import { OrdersList } from './OrdersList/OrdersList';

type OrdersPageProps = {
    currentUser: UserType;
};

export const OrdersPage: React.FC<OrdersPageProps> = ({ currentUser }) => {
    const [status, setStatus] = useState(MasterOrderStatusEnum.active);
    const navigate = useNavigate();

    const MenuItems = Object.values(MasterOrderStatusEnum).map((status, index) => (
        <MenuItem key={index} value={status}>
            {status}
        </MenuItem>
    ));

    const handleChangeStatus = (event: SelectChangeEvent) => {
        setStatus(event.target.value as MasterOrderStatusEnum);
    };

    console.log(currentUser);

    return (
        <Stack gap={2} sx={{ p: 2 }}>
            <Typography variant="h4" sx={{ textAlign: 'center' }}>
                Заявки
            </Typography>
            <FormControl fullWidth>
                <InputLabel id="status-select"></InputLabel>
                <Select labelId="status-select" value={status} onChange={handleChangeStatus}>
                    {MenuItems}
                </Select>
            </FormControl>

            <Button variant="outlined" onClick={() => navigate('/login')}>
                Go to login
            </Button>
            <OrdersList page={1} currentUser={currentUser} status={status} />
        </Stack>
    );
};
