import { instance } from '../../../config/apiConfig/apiConfig';

export const getUserById = (userId: string) => {
    const user = instance.get(`/user/${userId}`).then((res) => res.data);

    return user;
};
