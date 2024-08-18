import { useMemo } from 'react';

export const useRubFormat = (money: number) => {
    const format = useMemo(
        () => new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB' }).format(money),
        [money],
    );

    return { format };
};
