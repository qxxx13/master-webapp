import { RoleEnum } from '../../types/UserType';

export const bgHandler = (role: RoleEnum) => {
    switch (role) {
        case 'master': {
            return '#128a92';
        }
        case 'admin': {
            return '#058d3e';
        }
        default: {
            return '#8774e1';
        }
    }
};
