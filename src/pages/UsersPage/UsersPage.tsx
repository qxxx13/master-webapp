import { Button, CircularProgress, Stack, Typography } from '@mui/material';
import { useUnit } from 'effector-react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { UserType } from '../../types/UserType';
import { $usersPageStoreGetStatus, fetchAllUsersFx } from './model/usersPageStore';
import { UsersList } from './UsersList/UsersList';

export const UsersPage: React.FC<{ currentUser: UserType }> = ({ currentUser }) => {
    const navigate = useNavigate();
    const { data, loading } = useUnit($usersPageStoreGetStatus);

    const goToCreateNewUser = () => {
        navigate('/createNewUser');
    };

    const BackBTN = Telegram.WebApp.BackButton;
    BackBTN.hide();

    useEffect(() => {
        fetchAllUsersFx();
        Telegram.WebApp.ready();
    }, []);
    return (
        <Stack sx={{ p: 2 }} gap={1}>
            <Typography variant="h5" textAlign="center">
                Пользователи
            </Typography>
            <Button variant="outlined" onClick={goToCreateNewUser}>
                Создать пользователя
            </Button>
            {!loading ? <UsersList users={data} /> : <CircularProgress />}
        </Stack>
    );
};
