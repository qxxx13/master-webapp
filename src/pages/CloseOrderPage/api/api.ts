import { instance } from '../../../config/apiConfig/apiConfig';
import { PercentageGridItem } from '../../../types/PercentageGridType';

export const fetchPercentageGridById = async (id: string): Promise<PercentageGridItem> => {
    const percentageGrid = await instance
        .get(`/user/percentageGrid/${id}`)
        .then((res) => {
            return instance.get(`/percentageGrid/${res.data}`);
        })
        .then((res) => {
            return res.data;
        });

    return percentageGrid;
};

export const createNewItem = async (gridId: number) => {
    const newItem = await instance.post('/percentageGrid/item', {
        From: '',
        To: '',
        CheckAmount: '',
        PercentageGridId: gridId,
    });

    return newItem;
};

export const editPercentageGrid = async (name: string, id: number) => {
    const edit = await instance.post('/percentageGrid/edit', { Name: name, Id: id });

    return edit;
};

export const editPercentageGridItem = async (
    id: number,
    from: string,
    to: string,
    checkAmount: string,
    percentageGridId: number,
) => {
    const edit = await instance.post('/percentageGrid/edit/item', {
        Id: id,
        From: from,
        To: to,
        CheckAmount: checkAmount,
        PercentageGridId: percentageGridId,
    });

    return edit;
};
