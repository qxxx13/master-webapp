const dictionary: Record<string, string> = {
    pending: 'Ожидает',
    fulfilled: 'Закрыта',
    rejectedByClient: 'Отклонена клиентом',
    rejectedByMaster: 'Отклонена мастером',
    atWork: 'В работе',
    active: 'Принята',
    masterWentForSparePart: 'Отъехал за ЗЧ',
    takeToSD: 'Забрал на СД',
    all: 'Все',

    primary: 'Первичный',
    repeated: 'Повторный',
    guarantee: 'Гарантия',
    distribution: 'На распределении',
    transfer: 'ПЕРЕНОС',
    awaitingPayment: 'Ожидает сдачи',
    debt: 'ДОЛГ',
    specialized: 'Профильная',
    notSpecialized: 'Непрофильная',
    airConditioner: 'Кондиционеры',
};

export const translate = (key: string) => {
    return dictionary[key] || key;
};
