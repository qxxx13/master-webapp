import { instance } from '../../../config/apiConfig/apiConfig';
import { UserType } from '../../../types/UserType';

export const getAllUsers = async (companyId: number) => {
    const users = (await instance.get('user').then((res) => res.data)) as UserType[];

    const filtered = users.filter((user) => user.CompanyId !== companyId);

    return filtered;
};
