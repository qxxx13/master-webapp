import { Button, Stack, TextField, Typography } from '@mui/material';
import { MainButton } from '@vkruglikov/react-telegram-web-app';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { loginByTelegramId, loginByUsername } from './api/api';

export const LoginPage = () => {
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [isLoginByUsername, setIsLoginByUsername] = useState(false);

    const isVisible = isLoginByUsername ? 'auto' : 'none';

    const toggleIsLoginByUsername = (isLoginByUsername: boolean) => () => {
        setIsLoginByUsername(isLoginByUsername);
    };

    const loginHandler = async () => {
        if (password !== '' && !isLoginByUsername) {
            await loginByTelegramId(Telegram.WebApp.initDataUnsafe.user!.id, password);
            navigate('/');
        } else if (username !== '' && password !== '' && isLoginByUsername) {
            await loginByUsername(username, password);
            navigate('/');
        }
    };

    const inputPasswordHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setPassword(e.target.value);
    };

    const inputUsernameHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setUsername(e.target.value);
    };

    useEffect(() => {
        Telegram.WebApp.ready();
    }, []);

    return (
        <form>
            <Typography variant="h5" sx={{ textAlign: 'center', mt: 2 }}>
                Привет {Telegram.WebApp.initDataUnsafe.user?.first_name}
            </Typography>
            <Stack sx={{ p: 2 }} gap={1}>
                <TextField
                    variant="outlined"
                    label="Username"
                    value={username}
                    size="small"
                    onChange={(e) => inputUsernameHandler(e)}
                    sx={{ display: isVisible }}
                />
                <TextField
                    variant="outlined"
                    label="Password"
                    value={password}
                    type="password"
                    size="small"
                    onChange={(e) => inputPasswordHandler(e)}
                />
                <Button variant="contained" onClick={toggleIsLoginByUsername(!isLoginByUsername)}>
                    {isLoginByUsername ? 'Вход по telegramId' : 'Вход по логину'}
                </Button>
                <MainButton text="Войти" onClick={loginHandler} />
            </Stack>
        </form>
    );
};
