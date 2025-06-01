import { UserType } from '../../../types/UserType';

export const initialValues = (user: UserType): UserType => {
    const initialUser = {
        Id: user.Id,
        UserName: user.UserName,
        Password: user.Password,
        TelegramChatId: user.TelegramChatId,
        MessageThreadId: user.MessageThreadId,
        Role: user.Role,
        InterestRate: user.InterestRate,
        Region: user.Region,
        TelegramId: user.TelegramId,
        CompanyId: user.CompanyId,
        CompanyInterest: user.CompanyInterest,
        ContestStars: user.ContestStars,
    };

    return initialUser;
};
