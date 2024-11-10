import { FC, useEffect } from 'react';
import { UserType } from '../../../types/UserType';
import { Stack, Typography } from '@mui/material';
import { useUnit } from 'effector-react';
import { $usersGetStatus, fetchAllUsersFx } from './model/usersStore';
import { NewCompanyForm } from '../../../components/NewCompanyForm/NewCompanyForm';

type CreateCompanyPageProps = {
    currentUser: UserType;
};

export const CreateCompanyPage: FC<CreateCompanyPageProps> = ({ currentUser }) => {
    const { data, loading } = useUnit($usersGetStatus);

    useEffect(() => {
        Telegram.WebApp.ready();
        fetchAllUsersFx();
    }, []);

    return (
        <Stack sx={{ p: 2 }}>
            <Typography variant="h4" textAlign="center">
                Создание компании
            </Typography>
            <NewCompanyForm users={data} isLoading={loading} />
        </Stack>
    );
};
