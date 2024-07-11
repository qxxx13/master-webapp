import { Stack, Typography } from '@mui/material';
import { UserType } from '../../types/UserType';
import { useEffect } from 'react';
import { NewUserForm } from '../../components/NewUserForm/NewUserForm';

export const CreateNewUserPage: React.FC<{ currentUser: UserType }> = ({ currentUser }) => {
    useEffect(() => {
        Telegram.WebApp.ready();
    }, []);
    return (
        <Stack>
            <Typography variant="h5" sx={{ textAlign: 'center', p: 2 }}>
                Создание нового пользователя
            </Typography>
            <NewUserForm />
        </Stack>
    );
};
