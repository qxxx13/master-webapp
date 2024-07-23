import { NewOrderType, OrderStatusEnum, OrderTypeEnum, VisitEnum } from '../../../types/OrderType';

export const initialValues: NewOrderType = {
    Date: new Date(),
    City: '',
    Address: '',
    Visit: VisitEnum.primary,
    ClientPhoneNumber: '',
    ClientName: '',
    MasterName: '',
    AnnouncedPrice: '0',
    Description: '',
    Latitude: 0,
    Longitude: 0,
    MasterId: 1,
    Status: OrderStatusEnum.pending,
    TelephoneRecord: 'url',
    Time: '13:00',
    Type: OrderTypeEnum.notSpecialized,
    Debt: 0,
    MasterSalary: 0,
    ReferralId: 14,
};
