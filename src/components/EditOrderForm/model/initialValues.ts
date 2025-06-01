import { OrderType } from '../../../types/OrderType';

export const initialValues = (order: OrderType): OrderType => {
    const initialOrder = {
        Id: order.Id,
        Price: order.Price,
        Total: order.Total,
        Expenses: order.Expenses,
        Date: order.Date,
        City: order.City,
        Address: order.Address,
        Visit: order.Visit,
        ClientPhoneNumber: order.ClientPhoneNumber,
        ClientName: order.ClientName,
        MasterName: order.MasterName,
        AnnouncedPrice: order.AnnouncedPrice,
        Description: order.Description,
        Latitude: order.Latitude,
        Longitude: order.Longitude,
        MasterId: order.MasterId,
        Status: order.Status,
        TelephoneRecord: order.TelephoneRecord,
        Time: order.Time,
        Type: order.Type,
        Debt: order.Debt,
        DistributionOrderMessageId: order.DistributionOrderMessageId,
        ActiveOrderMessageId: order.ActiveOrderMessageId,
        AllOrdersMessageId: order.AllOrdersMessageId,
        HiddenDescription: order.HiddenDescription,
        Source: order.Source,
    };

    return initialOrder;
};
