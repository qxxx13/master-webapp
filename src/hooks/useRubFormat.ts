export const useRubFormat = (money: number) => {
    const format = new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB' }).format(money);

    return { format };
};
