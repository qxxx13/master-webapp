import { RoleEnum } from '../../../shared/types';

export type ProtectedRouteProps = {
    children: React.ReactNode;
    admitLevel?: RoleEnum;
};
