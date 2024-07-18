import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { CircularProgress, IconButton, Stack, Typography } from '@mui/material';
import { useUnit } from 'effector-react';
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { EditOrderForm } from '../../components/EditOrderForm/EditOrderForm';
import { $updateOrderStore } from '../../components/EditOrderForm/model/setUpdateOrderStore';
import { OrderType } from '../../types/OrderType';
import { UserType } from '../../types/UserType';
import { $editOrderStoreGetStatus, fetchOrderFx } from './model/editOrderStore';
import { $editOrderUsersStoreGetStatus, fetchUsersFx } from './model/editOrderUsersStore';

export const EditOrderPage: React.FC<{ currentUser: UserType }> = ({ currentUser }) => {
    const navigate = useNavigate();
    const id = useParams().id;

    const goBack = () => navigate(-1);

    const { data, error, loading } = useUnit($editOrderStoreGetStatus);
    const { data: users, error: usersError, loading: usersLoading } = useUnit($editOrderUsersStoreGetStatus);

    const update = useUnit($updateOrderStore);

    const BackBTN = Telegram.WebApp.BackButton;
    BackBTN.show();
    BackBTN.onClick(goBack);

    useEffect(() => {
        Telegram.WebApp.ready();
        fetchOrderFx({ orderId: id as string });
        fetchUsersFx();
    }, [update]);

    return (
        <Stack>
            <Typography variant="h6" sx={{ textAlign: 'center', p: 2 }}>
                Редактирование заявки №{id}
            </Typography>
            {!loading && !error ? <EditOrderForm order={data as OrderType} users={users} /> : <CircularProgress />}
        </Stack>
    );
};
