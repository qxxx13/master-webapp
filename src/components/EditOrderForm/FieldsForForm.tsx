import {
    AssignmentLate as GuaranteeIcon,
    CheckCircleOutline as PrimaryIcon,
    PriorityHigh as UrgentIcon,
    Replay as RepeatedIcon,
} from '@mui/icons-material';
import { Box, MenuItem } from '@mui/material';
import { Control } from 'react-hook-form';

import { translate } from '../../common/translate/translate';
import { OrderSourceEnum, OrderType, OrderTypeEnum, OrderVisitEnum } from '../../types/OrderType';
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
        Source,
        ...textFields
    } = initialValues;

    return Object.keys(textFields).map((key, index) => (
        <TextFieldForForm name={key as keyof OrderType} control={control} key={index} />
    ));
};

export const getColorForVisitType = (type: OrderVisitEnum) => {
    switch (type) {
        case OrderVisitEnum.primary:
            return 'success.main';
        case OrderVisitEnum.repeated:
            return 'info.main';
        case OrderVisitEnum.guarantee:
            return 'warning.main';
        case OrderVisitEnum.primaryUrgent:
            return 'error.main';
        default:
            return 'text.primary';
    }
};

const getIconForVisitType = (type: OrderVisitEnum) => {
    switch (type) {
        case OrderVisitEnum.primary:
            return <PrimaryIcon />;
        case OrderVisitEnum.repeated:
            return <RepeatedIcon />;
        case OrderVisitEnum.guarantee:
            return <GuaranteeIcon />;
        case OrderVisitEnum.primaryUrgent:
            return <UrgentIcon />;
        default:
            return null;
    }
};

export const VisitOptions = Object.values(OrderVisitEnum).map((value, index) => (
    <MenuItem value={value} key={index} sx={{ color: getColorForVisitType(value) }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {getIconForVisitType(value)}
            {translate(value)}
        </Box>
    </MenuItem>
));

export const TypeOptions = Object.values(OrderTypeEnum).map((value, index) => (
    <MenuItem value={value} key={index}>
        {translate(value)}
    </MenuItem>
));

export const SourceOptions = Object.values(OrderSourceEnum).map((value, index) => (
    <MenuItem value={value} key={index}>
        {translate(value)}
    </MenuItem>
));

export const MasterOptions = (users: UserType[]) => {
    const masters = [...users].filter((user) => user.Role === RoleEnum.master);
    return masters
        .sort((a, b) => a.UserName.localeCompare(b.UserName)) // Alphabetical sort
        .map((user, index) => (
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

export const OrderSourceSelectField = (control: Control<OrderType, unknown>) => {
    return <SelectFieldForForm control={control} name="Source" option={SourceOptions} />;
};
