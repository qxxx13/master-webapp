import { Button, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { UserType } from '../../types/UserType';

export const ProfilePage: React.FC<{ currentUser: UserType }> = ({ currentUser }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        navigate('/login');
        localStorage.clear();
    };

    return (
        <>
            <Stack sx={{ p: 2, textAlign: 'center' }} gap={1}>
                <Typography variant="h5">Профиль {currentUser.UserName}</Typography>
                <Typography variant="h6">Должность: {currentUser.Role}</Typography>
                <Typography variant="h6">Аналитика доходов</Typography>
                <Typography variant="h6">Скоро...</Typography>
            </Stack>
            <Button sx={{ position: 'absolute', bottom: 120, width: '100%' }} variant="outlined" onClick={handleLogout}>
                Выход
            </Button>
        </>
    );
};
