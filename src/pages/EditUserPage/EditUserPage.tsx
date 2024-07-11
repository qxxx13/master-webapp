import { CircularProgress, Stack, Typography } from '@mui/material';
import { useUnit } from 'effector-react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { EditUserForm } from '../../components/EditUserForm/EditUserForm';
import { UserType } from '../../types/UserType';
import { $editUserStoreGetStatus, fetchUserFx } from './model/editUserStore';

export const EditUserPage: React.FC<{ currentUser: UserType }> = ({ currentUser }) => {
    const id = useParams().id;

    const { data, loading } = useUnit($editUserStoreGetStatus);

    useEffect(() => {
        Telegram.WebApp.ready();
        fetchUserFx({ userId: String(id) });
    }, []);

    return (
        <>
            {!loading ? (
                <Stack>
                    <Typography variant="h5" sx={{ textAlign: 'center', p: 2 }}>
                        Редактирование {data.UserName as string}
                    </Typography>
                    <EditUserForm user={data as UserType} />
                </Stack>
            ) : (
                <CircularProgress />
            )}
        </>
    );
};
