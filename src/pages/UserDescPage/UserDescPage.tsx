import { useNavigate, useParams } from 'react-router-dom';
import { UserType } from '../../types/UserType';
import { useEffect } from 'react';
import { $userDescPageStoreGetStatus, fetchUserByIdFx } from './model/userDescPageStore';
import { useUnit } from 'effector-react';
import { Box, Button, CircularProgress, Divider, Stack, Typography } from '@mui/material';
import { StatusChip } from '../../components/StatusChip/StatusChip';
import { OrderStatusEnum } from '../../types/OrderType';

export const UserDescPage: React.FC<{ currentUser: UserType }> = ({ currentUser }) => {
    const navigate = useNavigate();
    const id = useParams().id;

    const { data, loading } = useUnit($userDescPageStoreGetStatus);

    const goBack = () => navigate(-1);
    const goToEditUser = () => navigate(`/editUser/${id}`);

    const BackBTN = Telegram.WebApp.BackButton;
    BackBTN.isVisible = true;
    BackBTN.onClick(goBack);

    useEffect(() => {
        Telegram.WebApp.ready();
        fetchUserByIdFx({ userId: String(id) });
    }, []);

    return (
        <>
            {!loading ? (
                <Stack sx={{ p: 2 }}>
                    <Typography variant="h5" sx={{ mb: 1 }}>
                        Пользователь: {data.UserName as string}
                    </Typography>
                    <StatusChip status={data.Status as OrderStatusEnum} />
                    <Typography variant="h6" sx={{ mt: 1 }}>
                        Роль: {data.Role as string}
                    </Typography>
                    <Divider />
                    <Typography variant="h6">Пароль: {data.Password as string}</Typography>
                    <Divider />
                    <Typography variant="h6">Процент: {data.InterestRate as string}%</Typography>
                    <Box sx={{ position: 'absolute', bottom: 70, width: '100%', left: 0, p: 2 }}>
                        <Button variant="outlined" sx={{ width: '100%' }} onClick={goToEditUser}>
                            Редактировать
                        </Button>
                    </Box>
                </Stack>
            ) : (
                <CircularProgress />
            )}
        </>
    );
};
