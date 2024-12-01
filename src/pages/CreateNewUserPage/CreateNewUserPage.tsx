import { Stack, Typography } from '@mui/material';
import { BackButton } from '@vkruglikov/react-telegram-web-app';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { NewUserForm } from '../../components/NewUserForm/NewUserForm';
import { UserType } from '../../types/UserType';

export const CreateNewUserPage: React.FC<{ currentUser: UserType }> = ({ currentUser }) => {
    const navigate = useNavigate();

    const goBack = () => navigate(-1);

    return (
        <Stack>
            <BackButton onClick={goBack} />
            <Typography variant="h5" sx={{ textAlign: 'center', p: 2 }}>
                Создание нового пользователя
            </Typography>
            <NewUserForm />
        </Stack>
    );
};
