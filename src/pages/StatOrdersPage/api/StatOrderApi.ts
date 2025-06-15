import { instance } from '../../../config/apiConfig/apiConfig';
import { RoleEnum, UserType } from '../../../types/UserType';

export interface OrderStatsParams {
    dispId?: number | null;
    startDate?: string | null; // Изменено с Date на string
    endDate?: string | null; // Изменено с Date на string
    minTotal?: number | null;
    maxTotal?: number | null;
}

export interface OrderStatsResult {
    count: number;
    totalSum: number;
    totalExpenses: number;
    totalCompanyShare: number;
}

export const getAllUsers = async () => {
    const users = await instance.get(`/user`).then((res) => res.data as UserType[]);

    return users.filter((user) => user.Role === RoleEnum.admin || user.Role === RoleEnum.disp);
};

export const getOrderStats = async (params: OrderStatsParams) => {
    const queryParams = new URLSearchParams();

    if (params.dispId) queryParams.append('dispId', params.dispId.toString());
    if (params.startDate) queryParams.append('startDate', params.startDate);
    if (params.endDate) queryParams.append('endDate', params.endDate);
    if (params.minTotal) queryParams.append('minTotal', params.minTotal.toString());
    if (params.maxTotal) queryParams.append('maxTotal', params.maxTotal.toString());

    const orderStats = await instance
        .get(`/orders/orderStats?${queryParams.toString()}`)
        .then((res) => res.data as OrderStatsResult);

    return orderStats;
};
