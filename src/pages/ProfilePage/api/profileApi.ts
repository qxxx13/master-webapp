import { instance } from '../../../config/apiConfig/apiConfig';

export const fetchAllOrdersPerMonth = (userId: number, startDate: string, endDate: string) => {
    const ordersPerMonth = instance
        .get(`orders/?page=${1}&perPage=${200}&masterId=${userId}&startDate=${startDate}&endDate=${endDate}`)
        .then((res) => res.data);

    return ordersPerMonth;
};

export const getUserById = (userId: number) => {
    const user = instance.get(`/user/${userId}`).then((res) => res.data);

    return user;
};

export const postAvatar = (userId: number, avatar: File) => {
    const post = instance.post(
        `user/avatar?userId=${userId}`,
        { file: avatar },
        {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        },
    );

    return post;
};
