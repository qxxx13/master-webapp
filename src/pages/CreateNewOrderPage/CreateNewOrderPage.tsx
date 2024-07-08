import { Button, CircularProgress, IconButton, Stack, Typography } from '@mui/material';
import { UserType } from '../../types/UserType';
import { useNavigate } from 'react-router-dom';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { NewOrderForm } from '../../components/NewOrderForm/NewOrderForm';
import { useEffect } from 'react';
import { $usersGetStatus, fetchAllUsersFx } from './model/usersStore';
import { useUnit } from 'effector-react';

export const CreateNewOrderPage: React.FC<{ currentUser: UserType }> = ({ currentUser }) => {
    const navigate = useNavigate();

    const goBack = () => navigate(-1);

    const { data, loading } = useUnit($usersGetStatus);

    useEffect(() => {
        fetchAllUsersFx();
    }, []);

    return (
        <Stack>
            <IconButton sx={{ position: 'absolute', left: 8, top: 11 }} onClick={goBack}>
                <ArrowBackIosNewIcon />
            </IconButton>
            <Typography variant="h5" sx={{ textAlign: 'center', p: 2 }}>
                Создание новой заявки
            </Typography>
            {!loading ? <NewOrderForm users={data} /> : <CircularProgress />}
        </Stack>
    );
};
