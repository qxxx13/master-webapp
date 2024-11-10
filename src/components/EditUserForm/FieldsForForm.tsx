import { MenuItem } from '@mui/material';
import { Control } from 'react-hook-form';

import { translate } from '../../common/translate/translate';
import { CompanyType } from '../../types/CompanyType';
import { RoleEnum, UserType } from '../../types/UserType';
import { SelectFieldForForm } from '../SelectFieldForForm/SelectFieldForForm';
import { TextFieldForForm } from '../TextFieldForForm/TextFieldForForm';

export const TextFields = (control: Control<UserType, unknown>, initialValues: UserType) => {
    const { IsOnline, Status, Id, CompanyId, ...textFields } = initialValues;

    return Object.keys(textFields).map((key, index) => (
        <TextFieldForForm name={key as keyof UserType} control={control} key={index} />
    ));
};

export const RoleOptions = Object.values(RoleEnum).map((value, index) => (
    <MenuItem value={value} key={index}>
        {translate(value)}
    </MenuItem>
));

export const RoleSelectField = (control: Control<UserType, unknown>) => (
    <SelectFieldForForm control={control} name="Role" option={RoleOptions} />
);

export const CompanyOptions = (companies: CompanyType[]) => {
    return companies.map((company) => (
        <MenuItem value={company.Id} key={company.Id}>
            {company.CompanyName}
        </MenuItem>
    ));
};

export const CompanySelect = (control: Control<UserType, unknown>, companies: CompanyType[]) => {
    return <SelectFieldForForm control={control} name="CompanyId" option={CompanyOptions(companies)} />;
};
