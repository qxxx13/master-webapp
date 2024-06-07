import { Stack, TextField, Typography } from '@mui/material';
import { MainButton } from '@vkruglikov/react-telegram-web-app';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { login } from './api/api';

export const LoginPage = () => {
    const navigate = useNavigate();
    const [password, setPassword] = useState('');

    const loginHandler = async () => {
        if (password !== '') {
            await login(Telegram.WebApp.initDataUnsafe.user!.id, password);
            navigate('/');
        }
    };

    const inputHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setPassword(e.target.value);
    };

    useEffect(() => {
        Telegram.WebApp.ready();
    }, []);

    return (
        <form>
            <Typography variant="h5" sx={{ textAlign: 'center', mt: 2 }}>
                Привет {Telegram.WebApp.initDataUnsafe.user?.first_name}
            </Typography>
            <Stack sx={{ p: 2 }}>
                <TextField
                    variant="outlined"
                    placeholder="Password"
                    value={password}
                    size="small"
                    onChange={(e) => inputHandler(e)}
                />
                <MainButton text="Войти" onClick={loginHandler} />
            </Stack>
        </form>
    );
};
