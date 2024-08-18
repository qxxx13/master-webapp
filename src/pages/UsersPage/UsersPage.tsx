import { Button, CircularProgress, Stack, Typography } from '@mui/material';
import { MainButton } from '@vkruglikov/react-telegram-web-app';
import { useUnit } from 'effector-react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { CardLoading } from '../../components/CardLoading/CardLoading';
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
        <Stack gap={1}>
            <Typography sx={{ paddingTop: 2 }} variant="h5" textAlign="center">
                Пользователи
            </Typography>
            <MainButton text="Создать пользователя" onClick={goToCreateNewUser} />
            {!loading ? <UsersList users={data} /> : <CardLoading height={80} />}
        </Stack>
    );
};
