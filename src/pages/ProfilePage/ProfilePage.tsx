import LogoutIcon from '@mui/icons-material/Logout';
import { Avatar, Button, CircularProgress, Stack, Typography } from '@mui/material';
import { useUnit } from 'effector-react';
import moment from 'moment';
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import { SalaryCharts } from '../../components/SalaryCharts/SalaryCharts';
import { UserType } from '../../types/UserType';
import { postAvatar } from './api/profileApi';
import { $ordersPerMonthGetStatus, fetchOrdersPerMonthFx } from './model/orderPerMonthStore';
import { $updateProfilePageStore, setUpdateProfilePage } from './model/updateProfilePageStore';
import { $userStoreGetStatus, fetchUserByIdFx } from './model/userStore';

export const ProfilePage: React.FC<{ currentUser: UserType }> = ({ currentUser }) => {
    const navigate = useNavigate();
    const { data, loading, error } = useUnit($ordersPerMonthGetStatus);
    const { data: user, loading: userLoading } = useUnit($userStoreGetStatus);
    const update = useUnit($updateProfilePageStore);

    const inputAvatarRef = useRef<HTMLInputElement>(null);

    const handleUploadAvatar = () => {
        inputAvatarRef.current?.click();
    };

    const handleChangeAvatar = (event: React.ChangeEvent<HTMLInputElement>) => {
        postAvatar(currentUser.Id, event.target.files![0]);
        setUpdateProfilePage();
    };

    const handleLogout = () => {
        navigate('/login');
        localStorage.clear();
    };

    const firstDay = moment().startOf('month').format('YYYY-MM-DD'); // Отмечаем начало месяца!
    const lastDay = moment().endOf('month').format('YYYY-MM-DD');

    useEffect(() => {
        fetchUserByIdFx({ userId: currentUser.Id });
        fetchOrdersPerMonthFx({ userId: currentUser.Id, endDate: lastDay, startDate: firstDay });
        Telegram.WebApp.ready();
    }, [update]);

    return (
        <>
            <Stack sx={{ p: 2, textAlign: 'center', alignItems: 'center', mt: 2 }} gap={1}>
                <input
                    type="file"
                    accept="image/png, image/jpeg"
                    id="file"
                    ref={inputAvatarRef}
                    style={{ display: 'none' }}
                    onChange={(e) => handleChangeAvatar(e)}
                />
                <Button onClick={handleUploadAvatar}>
                    <Avatar
                        sx={{ width: 158, height: 158, border: 'solid', backgroundColor: 'rgba(255, 255, 255, 0.5)' }}
                        src={user.AvatarUrl as string}
                    />
                </Button>
                <Typography variant="h5">Профиль {user.UserName as string}</Typography>
                <Typography variant="h6">Должность: {user.Role as string}</Typography>
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
