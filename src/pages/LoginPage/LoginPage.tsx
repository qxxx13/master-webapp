import { MainButton } from '@vkruglikov/react-telegram-web-app';
import { Input, Typography } from 'antd';

const { Title } = Typography;

import { useState } from 'react';

import { login } from './api/api';
import styles from './styles.module.css';

export const LoginPage = () => {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const loginHandler = () => {
        login(Telegram.WebApp.initDataUnsafe.user!.id, password);
    };

    const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    return (
        <form>
            <Title level={3}>
                Привет{' '}
                {(Telegram.WebApp.initDataUnsafe.user?.first_name, Telegram.WebApp.initDataUnsafe.user?.last_name)}
            </Title>
            <div className={styles.formContainer}>
                <Input placeholder="Password" value={password} onChange={(e) => inputHandler(e)} />
                <MainButton text="Войти" onClick={loginHandler} />
            </div>
        </form>
    );
};
