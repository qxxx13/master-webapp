import { MenuItem } from '@mui/material';
import { Control } from 'react-hook-form';

import { translate } from '../../common/translate/translate';
import { NewOrderType, OrderTypeEnum, OrderVisitEnum } from '../../types/OrderType';
import { RoleEnum, UserType } from '../../types/UserType';
import { SelectFieldForForm } from '../SelectFieldForForm/SelectFieldForForm';
import { TextFieldForForm } from '../TextFieldForForm/TextFieldForForm';
import { initialValues } from './model/initialValues';

export const {
    Visit,
    MasterId,
    Status,
    Date,
    Latitude,
    Longitude,
    TelephoneRecord,
    ClientPhoneNumber,
    Type,
    Debt,
    MasterSalary,
    ReferralId,
    ...textFields
} = initialValues;

export const TextFields = (control: Control<NewOrderType, unknown>) =>
    Object.keys(textFields).map((key, index) => (
        <TextFieldForForm name={key as keyof NewOrderType} control={control} key={index} />
    ));

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

export const ReferralOptions = (users: UserType[]) =>
    users.map((user, index) => (
        <MenuItem value={user.Id} key={index}>
            {user.UserName} ({user.Region})
        </MenuItem>
    ));

export const VisitSelectField = (control: Control<NewOrderType, unknown>) => (
    <SelectFieldForForm control={control} name="Visit" option={VisitOptions} />
);
export const MasterSelectField = (control: Control<NewOrderType, unknown>, users: UserType[]) => (
    <SelectFieldForForm control={control} name="MasterId" option={MasterOptions(users)} />
);
export const OrderTypeSelectField = (control: Control<NewOrderType, unknown>) => (
    <SelectFieldForForm control={control} name="Type" option={TypeOptions} />
);

export const ReferralSelectField = (control: Control<NewOrderType, unknown>, users: UserType[]) => (
    <SelectFieldForForm
        control={control}
        name="ReferralId"
        option={ReferralOptions(users)}
        required={false}
        disabled={true}
    />
);
