import { Button, CircularProgress, Stack, Typography } from '@mui/material';
import { UserType } from '../../types/UserType';
import { UsersList } from './UsersList/UsersList';
import { useEffect } from 'react';
import { $usersPageStoreGetStatus, fetchAllUsersFx } from './model/usersPageStore';
import { useUnit } from 'effector-react';
import { useNavigate } from 'react-router-dom';

export const UsersPage: React.FC<{ currentUser: UserType }> = ({ currentUser }) => {
    const navigate = useNavigate();
    const { data, loading } = useUnit($usersPageStoreGetStatus);

    const goToCreateNewUser = () => {
        navigate('/createNewUser');
    };

    useEffect(() => {
        fetchAllUsersFx();
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
