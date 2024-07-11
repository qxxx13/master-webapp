import { instance } from '../../../config/apiConfig/apiConfig';
import { UserType } from '../../../types/UserType';

export const getAllUsers = (): Promise<UserType[]> => {
    const users = instance.get('user').then((res) => res.data);

    return users;
};
