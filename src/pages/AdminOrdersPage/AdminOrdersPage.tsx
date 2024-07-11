import { Button, Stack, TextField, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { UserType } from '../../types/UserType';
import { OrdersList } from './OrdersList/OrdersList';

export const AdminOrdersPage: React.FC<{ currentUser: UserType }> = ({ currentUser }) => {
    const navigate = useNavigate();

    const goToCreateNewOrderPage = () => navigate('/createNewOrder');

    const BackBTN = Telegram.WebApp.BackButton;
    BackBTN.hide();

    useEffect(() => {
        Telegram.WebApp.ready();
    }, []);

    return (
        <>
            <Stack sx={{ p: 2, gap: 1, position: 'absolute', width: '100%', top: 0 }}>
                <Typography variant="h4" sx={{ textAlign: 'center' }}>
                    Заявки
                </Typography>
                <Button variant="outlined" onClick={goToCreateNewOrderPage}>
                    Создать заявку
                </Button>
                {/* <TextField label="Поиск по номеру" />
                <Button variant="outlined">Поиск</Button> */}
            </Stack>
            <OrdersList currentPage={1} />
        </>
    );
};
