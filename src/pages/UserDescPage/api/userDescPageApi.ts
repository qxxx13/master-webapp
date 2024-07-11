import { instance } from '../../../config/apiConfig/apiConfig';

export const fetchUserById = (userId: string) => {
    const user = instance.get(`/user/${userId}`).then((res) => res.data);

    return user;
};
