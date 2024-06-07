import { Stack, TextField, Typography } from '@mui/material';
import { MainButton } from '@vkruglikov/react-telegram-web-app';
import { useState } from 'react';

import { login } from './api/api';

export const LoginPage = () => {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const loginHandler = () => {
        login(Telegram.WebApp.initDataUnsafe.user!.id, password);
    };

    const inputHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setPassword(e.target.value);
    };

    return (
        <form>
            <Typography variant="h5" sx={{ textAlign: 'center', mt: 2 }}>
                Привет{' '}
                {(Telegram.WebApp.initDataUnsafe.user?.first_name, Telegram.WebApp.initDataUnsafe.user?.last_name)}
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
