import { Box, FormControlLabel, MenuItem, Switch } from '@mui/material';
import { Control, Controller } from 'react-hook-form';

import { TextFieldForForm } from '../TextFieldForForm/TextFieldForForm';
import { CompanyType, NewCompanyType } from '../../types/CompanyType';
import { RoleEnum, UserType } from '../../types/UserType';
import { SelectFieldForForm } from '../SelectFieldForForm/SelectFieldForForm';

export const CompanyTextField = (control: Control<NewCompanyType, unknown>, isLoading: boolean) => (
    <TextFieldForForm name={'CompanyName'} control={control} isLoading={isLoading} />
);

export const PrimaryCompanySwitch = (control: Control<NewCompanyType, unknown>, isLoading: boolean) => {
    return (
        <Controller
            control={control}
            name={'Primary'}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
                <FormControlLabel
                    control={<Switch onChange={onChange} disabled={isLoading} color={error ? 'error' : 'default'} />}
                    label="Основная компания"
                />
            )}
        />
    );
};

export const MasterOptions = (users: UserType[]) => {
    const masters = [...users].filter((user) => user.Role !== RoleEnum.fired);
    return masters.map((user, index) => (
        <MenuItem value={user.Id} key={index}>
            {user.UserName} ({user.Region})
        </MenuItem>
    ));
};

export const OwnerSelect = (control: Control<NewCompanyType, unknown>, users: UserType[], isLoading: boolean) => {
    return (
        <SelectFieldForForm
            control={control}
            name="CompanyOwnerId"
            option={MasterOptions(users)}
            isLoading={isLoading}
        />
    );
};

export const CompanyOptions = (companies: CompanyType[]) => {
    return companies.map((company) => (
        <MenuItem value={company.Id} key={company.Id}>
            {company.CompanyName}
        </MenuItem>
    ));
};

export const CompanySelect = (
    control: Control<NewCompanyType, unknown>,
    companies: CompanyType[],
    isLoading: boolean,
) => {
    return (
        <SelectFieldForForm
            control={control}
            name="PrimaryCompanyId"
            option={CompanyOptions(companies)}
            isLoading={isLoading}
        />
    );
};
