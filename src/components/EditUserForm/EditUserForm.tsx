import { SubmitHandler, useForm } from 'react-hook-form';
import { UserType } from '../../types/UserType';
import { initialValues } from './model/initialValues';
import { editUserFx } from './model/editUserFormStore';
import { Button, Stack } from '@mui/material';
import { RoleSelectField, TextFields } from './FieldsForForm';

export const EditUserForm: React.FC<{ user: UserType }> = ({ user }) => {
    const { handleSubmit, control } = useForm<UserType>({
        defaultValues: initialValues(user),
    });

    const handleSave: SubmitHandler<UserType> = (data) => {
        data.InterestRate = +data.InterestRate;
        editUserFx(data);
    };

    const textFields = TextFields(control, initialValues(user));

    return (
        <form>
            <Stack sx={{ p: 2, gap: 1, mb: '56px' }}>
                {textFields}
                {RoleSelectField(control)}
                <Button variant="outlined" onClick={handleSubmit((editedUser) => handleSave(editedUser))}>
                    Сохранить
                </Button>
            </Stack>
        </form>
    );
};
