import { NewUserType, RoleEnum } from '../../../types/UserType';

export const InitialValues: NewUserType = {
    UserName: '',
    InterestRate: 50,
    MessageThreadId: '',
    Password: '',
    Region: '',
    Role: RoleEnum.master,
    TelegramChatId: '',
    TelegramId: '',
};
