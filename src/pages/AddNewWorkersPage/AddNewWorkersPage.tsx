import { FC, useEffect } from 'react';
import { UserType } from '../../types/UserType';
import { useParams } from 'react-router-dom';
import { Button, Stack, Typography } from '@mui/material';
import { $newWorkersStoreGetStatus, fetchAllUsersFx } from './model/newWorkersStore';
import { useUnit } from 'effector-react';

type AddNewWorkersPageProps = {
    currentUser: UserType;
};

export const AddNewWorkersPage: FC<AddNewWorkersPageProps> = ({ currentUser }) => {
    const companyId = useParams().id;
    /* const [list] */

    const { data, loading } = useUnit($newWorkersStoreGetStatus);

    useEffect(() => {
        fetchAllUsersFx({ companyId: Number(companyId) });
    }, [companyId]);

    return (
        <Stack sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h5"> Добавление работников в компанию</Typography>
            <Button sx={{ mt: 2 }} variant="contained" disabled={loading}>
                Добавить
            </Button>
        </Stack>
    );
};
