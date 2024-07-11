import { instance } from '../../../config/apiConfig/apiConfig';
import { UserType } from '../../../types/UserType';

export const editUser = (user: UserType) => {
    const edit = instance.post('user/edit', user).then((res) => res.data);

    return edit;
};
