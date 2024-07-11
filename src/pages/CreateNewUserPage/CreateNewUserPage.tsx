import { Stack, Typography } from '@mui/material';
import { useEffect } from 'react';

import { NewUserForm } from '../../components/NewUserForm/NewUserForm';
import { UserType } from '../../types/UserType';
import { useNavigate } from 'react-router-dom';

export const CreateNewUserPage: React.FC<{ currentUser: UserType }> = ({ currentUser }) => {
    const navigate = useNavigate();

    const goBack = () => navigate(-1);

    const BackBTN = Telegram.WebApp.BackButton;
    BackBTN.show();
    BackBTN.onClick(goBack);

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
