import { instance } from '../../../config/apiConfig/apiConfig';
import { NewUserType } from '../../../types/UserType';

export const createNewUser = (newUser: NewUserType) => {
    const create = instance.post('/user', newUser).then((res) => res.data);

    return create;
};
