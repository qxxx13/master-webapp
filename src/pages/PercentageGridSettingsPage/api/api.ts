import { instance } from '../../../config/apiConfig/apiConfig';

export const fetchAllPercentageGrid = async () => {
    const percentageGridList = await instance.get(`/percentageGrid`).then((res) => res.data);

    return percentageGridList;
};

export const addNewPercentageGrid = async () => {
    const newPercentage = await instance.post(`/percentageGrid`, { Name: '' });

    return newPercentage;
};
