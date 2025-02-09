import { instance } from '../../../config/apiConfig/apiConfig';
import { UserType } from '../../../types/UserType';

export const fetchUserById = (userId: string) => {
    const user = instance.get(`/user/${userId}`).then((res) => res.data);

    return user;
};

export const fetchAllOrdersPerMonth = (userId: number, startDate: string, endDate: string) => {
    const ordersPerMonth = instance
        .get(`orders/?page=${1}&perPage=${200}&masterId=${userId}&startDate=${startDate}&endDate=${endDate}&status=all`)
        .then((res) => res.data);

    return ordersPerMonth;
};

export const fetchAllOrders = (userId: number) => {
    const allOrders = instance
        .get(`orders/?page=${1}&perPage=${500}&masterId=${userId}&status=all`)
        .then((res) => res.data);

    return allOrders;
};

export const fetchAllPercentageGrid = async () => {
    const percentageGridList = await instance.get(`/percentageGrid`).then((res) => res.data);

    return percentageGridList;
};

export const editUser = (user: UserType, percentageId: number) => {
    const edit = instance
        .post('user/edit', {
            Id: user.Id,
            UserName: user.UserName,
            Password: user.Password,
            TelegramChatId: user.TelegramChatId,
            MessageThreadId: user.MessageThreadId,
            Role: user.Role,
            IsOnline: user.IsOnline,
            InterestRate: user.InterestRate, // Процентная ставка
            Status: user.Status,
            Region: user.Region,
            TelegramId: user.TelegramId,
            AvatarId: user.AvatarId,
            AvatarUrl: user.AvatarUrl,
            CompanyInterest: user.CompanyInterest,
            CompanyId: user.CompanyId,
            PercentageGridId: percentageId,
        })
        .then((res) => res.data);

    return edit;
};
