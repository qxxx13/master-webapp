import { Control } from 'react-hook-form';
import { RoleEnum, UserType } from '../../types/UserType';
import { TextFieldForForm } from '../TextFieldForForm/TextFieldForForm';
import { MenuItem } from '@mui/material';
import { translate } from '../../common/translate/translate';
import { SelectFieldForForm } from '../SelectFieldForForm/SelectFieldForForm';

export const TextFields = (control: Control<UserType, unknown>, initialValues: UserType) => {
    const { IsOnline, Status, Id, ...textFields } = initialValues;

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
