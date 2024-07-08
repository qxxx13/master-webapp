import React, { useEffect } from 'react';
import { UserType } from '../../types/UserType';
import { useNavigate, useParams } from 'react-router-dom';
import { $editOrderStoreGetStatus, fetchOrderFx } from './model/editOrderStore';
import { $editOrderUsersStoreGetStatus, fetchUsersFx } from './model/editOrderUsersStore';
import { CircularProgress, IconButton, Stack, Typography } from '@mui/material';
import { useUnit } from 'effector-react';
import { EditOrderForm } from '../../components/EditOrderForm/EditOrderForm';
import { OrderType } from '../../types/OrderType';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { $updateOrderStore } from '../OrderDescPage/model/setUpdateOrderStore';

export const EditOrderPage: React.FC<{ currentUser: UserType }> = ({ currentUser }) => {
    const navigate = useNavigate();
    const id = useParams().id;

    const goBack = () => navigate(-1);

    const { data, error, loading } = useUnit($editOrderStoreGetStatus);
    const { data: users, error: usersError, loading: usersLoading } = useUnit($editOrderUsersStoreGetStatus);

    const update = useUnit($updateOrderStore);

    useEffect(() => {
        fetchOrderFx({ orderId: id as string });
        fetchUsersFx();
    }, [update]);

    return (
        <Stack>
            <IconButton sx={{ position: 'absolute', left: 8, top: 11 }} onClick={goBack}>
                <ArrowBackIosNewIcon />
            </IconButton>
            <Typography variant="h6" sx={{ textAlign: 'center', p: 2 }}>
                Редактирование заявки №{id}
            </Typography>
            {!loading && !error ? <EditOrderForm order={data as OrderType} users={users} /> : <CircularProgress />}
        </Stack>
    );
};
