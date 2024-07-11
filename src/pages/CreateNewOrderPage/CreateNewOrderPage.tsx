import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { Button, CircularProgress, IconButton, Stack, Typography } from '@mui/material';
import { useUnit } from 'effector-react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { NewOrderForm } from '../../components/NewOrderForm/NewOrderForm';
import { UserType } from '../../types/UserType';
import { $usersGetStatus, fetchAllUsersFx } from './model/usersStore';

export const CreateNewOrderPage: React.FC<{ currentUser: UserType }> = ({ currentUser }) => {
    const navigate = useNavigate();

    const goBack = () => navigate(-1);

    const { data, loading } = useUnit($usersGetStatus);

    const BackBTN = Telegram.WebApp.BackButton;
    BackBTN.isVisible = true;
    BackBTN.onClick(goBack);

    useEffect(() => {
        Telegram.WebApp.ready();
        fetchAllUsersFx();
    }, []);

    return (
        <Stack>
            {/* <IconButton sx={{ position: 'absolute', left: 8, top: 11 }} onClick={goBack}>
                <ArrowBackIosNewIcon />
            </IconButton> */}
            <Typography variant="h5" sx={{ textAlign: 'center', p: 2 }}>
                Создание новой заявки
            </Typography>
            {!loading ? <NewOrderForm users={data} /> : <CircularProgress />}
        </Stack>
    );
};
