import LogoutIcon from '@mui/icons-material/Logout';
import { Avatar, Button, CircularProgress, Stack, Typography } from '@mui/material';
import { useUnit } from 'effector-react';
import moment from 'moment';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { SalaryCharts } from '../../components/SalaryCharts/SalaryCharts';
import { UserType } from '../../types/UserType';
import { $ordersPerMonthGetStatus, fetchOrdersPerMonthFx } from './model/orderPerMonthStore';

export const ProfilePage: React.FC<{ currentUser: UserType }> = ({ currentUser }) => {
    const navigate = useNavigate();
    const { data, loading, error } = useUnit($ordersPerMonthGetStatus);

    const handleLogout = () => {
        navigate('/login');
        localStorage.clear();
    };

    const firstDay = moment().startOf('month').format('YYYY-MM-DD'); // Отмечаем начало месяца!
    const lastDay = moment().endOf('month').format('YYYY-MM-DD');

    const BackBTN = Telegram.WebApp.BackButton;
    BackBTN.hide();

    useEffect(() => {
        fetchOrdersPerMonthFx({ userId: currentUser.Id, endDate: lastDay, startDate: firstDay });
        Telegram.WebApp.ready();
    }, []);

    return (
        <>
            <Stack sx={{ p: 2, textAlign: 'center', alignItems: 'center', mt: 2 }} gap={1}>
                <Avatar sx={{ width: 158, height: 158 }} />
                <Typography variant="h5">Профиль {currentUser.UserName}</Typography>
                <Typography variant="h6">Должность: {currentUser.Role}</Typography>
            </Stack>
            <Button
                sx={{ position: 'absolute', top: 8, right: 8 }}
                variant="outlined"
                onClick={handleLogout}
                startIcon={<LogoutIcon />}
            >
                Выход
            </Button>
            {!loading ? <SalaryCharts orders={data.data} /> : <CircularProgress />}
        </>
    );
};
