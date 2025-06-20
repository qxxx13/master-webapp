export enum OrderStatusEnum {
    pending = 'pending', // Ожидает
    fulfilled = 'fulfilled', // Успешно
    rejectedByClient = 'rejectedByClient', // Отказ клиента
    rejectedByMaster = 'rejectedByMaster', // Отказ мастера
    atWork = 'atWork', // В работе
    active = 'active', //активная заявка
    masterWentForSparePart = 'masterWentForSparePart', // Мастер отъехал за зч
    awaitingPayment = 'awaitingPayment', // ожидает оплаты
    takeToSD = 'takeToSD', //забрал на сд
    debt = 'debt', //Долг
    distribution = 'distribution', // На распределении
    transfer = 'transfer', // Перенос
    missedCall = 'missedCall', // Недозвон
    cancelByClient = 'cancelByClient',
}

export enum MasterOrderStatusEnum {
    all = 'all',
    takeToSD = 'takeToSD',
}

export enum IsWorkingOrderEnum {
    isWorking = 'isWorking',
    close = 'close',
}

export enum OrderTypeEnum {
    specialized = 'specialized',
    notSpecialized = 'notSpecialized',
    airConditioner = 'airConditioner',
}

export enum UserStatusEnum {
    atWork = 'atWork', // Работает
    waitForWork = 'waitForWork', // Ждет заказ
    wentForSparePart = 'wentForSparePart', // Уехал за ЗЧ
    dayOff = 'dayOff', // Выходной
}

export enum VisitEnum {
    primary = 'primary', // Первичный
    repeated = 'repeated', // Повторный
    guarantee = 'guarantee', //Гарантия
    primaryUrgent = 'primaryUrgent', // Первичный срочный
}

export enum RoleEnum {
    master = 'master',
    admin = 'admin',
    disp = 'disp',
    regional = 'regional',
    promouter = 'promouter',
    fired = 'fired', //уволен
    all = 'all',
}

export type OrderType = {
    Id: number;
    Description: string;
    Address: string;
    City: string;
    Date: Date;
    Time?: string;
    Visit: VisitEnum;
    ClientPhoneNumber: string;
    ClientName?: string;
    MasterId: number;
    AnnouncedPrice: string;
    Status: OrderStatusEnum;
    Price: string;
    TelephoneRecord: string;
    Latitude: number;
    Longitude: number;
    Total: number;
    Expenses: number;
    Debt: number;
    MasterName?: string;
    Comments?: string;
    MessageId?: string;
    AllOrdersMessageId?: string;
    ActiveOrderMessageId?: string;
    DistributionOrderMessageId?: string;
    MasterSalary?: number;
    CompanyShare?: number;
    ClosingOrderId?: number;
    IsWorking?: IsWorkingOrderEnum;
    Type: OrderTypeEnum;
    ReferralId?: number;
    OrderCloserId?: number;
    DispId?: number;
    HiddenDescription?: string;
    Source?: OrderSourceEnum;
};

export enum OrderSourceEnum {
    PaperAdvertising = 'PaperAdvertising',
    Newspaper = 'Newspaper',
    Avito = 'Avito',
}

export type GetOrdersType = {
    meta: {
        total: number;
        lastPage: number;
        currentPage: number;
        perPage: number;
        prev: number;
        next: number;
    };
    data: OrderType[];
};

export type CloseOrderType = {
    MasterSalary: string;
    TotalPrice: string;
    Expenses: string;
    CompanyShare: string;
    Price: string;
    Comments?: string;
    Debt?: string;
};

export enum OrderVisitEnum {
    primary = 'primary',
    repeated = 'repeated',
    guarantee = 'guarantee',
    primaryUrgent = 'primaryUrgent',
}

type OmitType = {
    Id: string;
    Price: number;
    Total: number;
    Expenses: number;
    BotMessageArr: string[];
};

export type NewOrderType = Omit<OrderType, keyof OmitType>;
