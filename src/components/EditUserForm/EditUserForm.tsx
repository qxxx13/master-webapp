import { Button, Stack } from '@mui/material';
import { useUnit } from 'effector-react';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { UserType } from '../../types/UserType';
import { CompanySelect, RoleSelectField, TextFields } from './FieldsForForm';
import { $companyListStoresGetStatus, fetchAllCompanyFx } from './model/companyListStore';
import { editUserFx } from './model/editUserFormStore';
import { initialValues } from './model/initialValues';

export const EditUserForm: React.FC<{ user: UserType }> = ({ user }) => {
    const { handleSubmit, control } = useForm<UserType>({
        defaultValues: initialValues(user),
    });

    const handleSave: SubmitHandler<UserType> = (data) => {
        data.InterestRate = +data.InterestRate;
        data.CompanyInterest = Number(data.CompanyInterest);
        editUserFx(data);
    };

    const textFields = TextFields(control, initialValues(user));

    const { data } = useUnit($companyListStoresGetStatus);

    useEffect(() => {
        fetchAllCompanyFx();
    }, []);

    return (
        <form>
            <Stack sx={{ p: 2, gap: 1, mb: '56px' }}>
                {textFields}
                {RoleSelectField(control)}
                {CompanySelect(control, data)}
                <Button variant="outlined" onClick={handleSubmit((editedUser) => handleSave(editedUser))}>
                    Сохранить
                </Button>
            </Stack>
        </form>
    );
};
