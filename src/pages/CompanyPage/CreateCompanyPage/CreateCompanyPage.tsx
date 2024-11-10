import { Stack, Typography } from '@mui/material';
import { useUnit } from 'effector-react';
import { FC, useEffect } from 'react';

import { NewCompanyForm } from '../../../components/NewCompanyForm/NewCompanyForm';
import { UserType } from '../../../types/UserType';
import { $usersGetStatus, fetchAllUsersFx } from './model/usersStore';

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
