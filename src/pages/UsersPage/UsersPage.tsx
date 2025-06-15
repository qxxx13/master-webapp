import EqualizerIcon from '@mui/icons-material/Equalizer';
import SettingsAccessibilityIcon from '@mui/icons-material/SettingsAccessibility';
import { IconButton, Stack, Typography } from '@mui/material';
import { MainButton } from '@vkruglikov/react-telegram-web-app';
import { useUnit } from 'effector-react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { CardLoading } from '../../components/CardLoading/CardLoading';
import { UserType } from '../../types/UserType';
import { $usersPageStoreGetStatus, fetchAllUsersFx } from './model/usersPageStore';
import { UsersList } from './UsersList/UsersList';

export const UsersPage: React.FC<{ currentUser: UserType }> = ({ currentUser }) => {
    const navigate = useNavigate();
    const { data, loading } = useUnit($usersPageStoreGetStatus);

    const goToCreateNewUser = () => {
        navigate('/createNewUser');
    };

    const goToPercentageGridSettings = () => {
        navigate('/percentageGridSettings');
    };

    const goToPercentageOrderStats = () => {
        navigate('/ordersStats');
    };

    useEffect(() => {
        fetchAllUsersFx();
        Telegram.WebApp.ready();
    }, []);

    return (
        <Stack gap={1}>
            <Typography sx={{ paddingTop: 2 }} variant="h5" textAlign="center">
                Пользователи
            </Typography>
            <IconButton sx={{ position: 'absolute', top: 8, left: 16 }} onClick={goToPercentageOrderStats}>
                <EqualizerIcon fontSize="large" />
            </IconButton>
            <IconButton sx={{ position: 'absolute', top: 8, right: 16 }} onClick={goToPercentageGridSettings}>
                <SettingsAccessibilityIcon fontSize="large" />
            </IconButton>
            <MainButton text="Создать пользователя" onClick={goToCreateNewUser} />
            {!loading ? <UsersList users={data} /> : <CardLoading height={80} />}
        </Stack>
    );
};
