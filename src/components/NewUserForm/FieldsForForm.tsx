import { MenuItem } from '@mui/material';
import { Control } from 'react-hook-form';

import { translate } from '../../common/translate/translate';
import { NewUserType, RoleEnum } from '../../types/UserType';
import { SelectFieldForForm } from '../SelectFieldForForm/SelectFieldForForm';
import { TextFieldForForm } from '../TextFieldForForm/TextFieldForForm';
import { InitialValues } from './model/initialValues';

const { Role, IsOnline, Status, ...textFields } = InitialValues;

export const TextFields = (control: Control<NewUserType, unknown>) =>
    Object.keys(textFields).map((key, index) => (
        <TextFieldForForm name={key as keyof NewUserType} control={control} key={index} />
    ));

export const RoleOptions = Object.values(RoleEnum).map((value, index) => (
    <MenuItem value={value} key={index}>
        {translate(value)}
    </MenuItem>
));

export const RoleSelectField = (control: Control<NewUserType, unknown>) => (
    <SelectFieldForForm control={control} name="Role" option={RoleOptions} />
);
