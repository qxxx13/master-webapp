import { MenuItem } from '@mui/material';
import { Control } from 'react-hook-form';

import { translate } from '../../common/translate/translate';
import { OrderType, OrderTypeEnum, OrderVisitEnum } from '../../types/OrderType';
import { RoleEnum, UserType } from '../../types/UserType';
import { SelectFieldForForm } from '../SelectFieldForForm/SelectFieldForForm';
import { TextFieldForForm } from '../TextFieldForForm/TextFieldForForm';

export const TextFields = (control: Control<OrderType, unknown>, initialValues: OrderType) => {
    const {
        Visit,
        MasterId,
        Status,
        Date,
        Latitude,
        Longitude,
        TelephoneRecord,
        Type,
        Id,
        ClientPhoneNumber,
        ActiveOrderMessageId,
        AllOrdersMessageId,
        DistributionOrderMessageId,
        Total,
        Price,
        CompanyShare,
        MasterSalary,
        Debt,
        Expenses,
        ...textFields
    } = initialValues;

    return Object.keys(textFields).map((key, index) => (
        <TextFieldForForm name={key as keyof OrderType} control={control} key={index} />
    ));
};

export const VisitOptions = Object.values(OrderVisitEnum).map((value, index) => (
    <MenuItem value={value} key={index}>
        {translate(value)}
    </MenuItem>
));

export const TypeOptions = Object.values(OrderTypeEnum).map((value, index) => (
    <MenuItem value={value} key={index}>
        {translate(value)}
    </MenuItem>
));

export const MasterOptions = (users: UserType[]) => {
    const masters = [...users].filter((user) => user.Role === RoleEnum.master);
    return masters.map((user, index) => (
        <MenuItem value={user.Id} key={index}>
            {user.UserName} ({user.Region})
        </MenuItem>
    ));
};

export const VisitSelectField = (control: Control<OrderType, unknown>) => (
    <SelectFieldForForm control={control} name="Visit" option={VisitOptions} />
);
export const MasterSelectField = (control: Control<OrderType, unknown>, users: UserType[]) => (
    <SelectFieldForForm control={control} name="MasterId" option={MasterOptions(users)} />
);
export const OrderTypeSelectField = (control: Control<OrderType, unknown>) => (
    <SelectFieldForForm control={control} name="Type" option={TypeOptions} />
);
