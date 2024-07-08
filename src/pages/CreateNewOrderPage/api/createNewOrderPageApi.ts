import { instance } from '../../../config/apiConfig/apiConfig';

export const getAllUsers = async () => {
    const users = await instance.get(`/user`).then((res) => res.data);

    return users;
};
