export enum RoleEnum {
    master = 'master',
    admin = 'admin',
    disp = 'disp',
    regional = 'regional',
    promouter = 'promouter',
}

export enum UserStatusEnum {
    atWork = 'atWork', // Работает
    waitForWork = 'waitForWork', // Свободен
    wentForSparePart = 'wentForSparePart', // Уехал за ЗЧ
    dayOff = 'dayOff', //Выходной
}

export type UserType = {
    Id: number;
    UserName: string;
    Password: string;
    TelegramChatId: string;
    MessageThreadId: string;
    Role: RoleEnum;
    IsOnline: boolean;
    InterestRate: number; // Процентная ставка
    Status: UserStatusEnum;
    Region: string;
    TelegramId: string;
};

export type LoginedUserType = {
    Id: number;
    UserName: string;
    TelegramChatId: string;
    MessageId: string;
    Role: RoleEnum;
    IsOnline: boolean;
    InterestRate: number; // Процентная ставка
    Status: UserStatusEnum;
    accessToken: string;
    refreshToken: string;
};
