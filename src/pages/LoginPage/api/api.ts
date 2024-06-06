import { instance } from '../../../config/apiConfig/apiConfig';

export const login = (telegramId: number, password: string) => {
    const user = instance
        .post('auth/login', { telegramId: telegramId, username: '', password: password })
        .then((res) => res.data)
        .catch((error) => {
            return error;
        });

    return user;
};
