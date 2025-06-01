import { Button, Stack } from '@mui/material';
import { MainButton } from '@vkruglikov/react-telegram-web-app';
import { enqueueSnackbar } from 'notistack';
import { SubmitHandler, useForm } from 'react-hook-form';

import { NewUserType } from '../../types/UserType';
import { RoleSelectField, TextFields } from './FieldsForForm';
import { InitialValues } from './model/initialValues';
import { addNewUserFx } from './model/newUserFormStore';

export const NewUserForm = () => {
    const { handleSubmit, reset, control } = useForm<NewUserType>({
        defaultValues: InitialValues,
    });

    const handleCreateNewUser: SubmitHandler<NewUserType> = (data) => {
        data.InterestRate = +data.InterestRate;
        addNewUserFx(data)
            .then(() => enqueueSnackbar('Создание пользователя завершено', { variant: 'success' }))
            .catch((e) => () => enqueueSnackbar(`Произошла ошибка ${e.message}`, { variant: 'error' }));
        reset();
    };

    return (
        <form>
            <Stack sx={{ p: 2, gap: 1, mb: '56px' }}>
                {TextFields(control)}
                {RoleSelectField(control)}
                <MainButton text="Создать" onClick={handleSubmit((newUser) => handleCreateNewUser(newUser))} />
                {/* <Button variant="outlined" onClick={handleSubmit((newUser) => handleCreateNewUser(newUser))}>
                    Создать
                </Button> */}
            </Stack>
        </form>
    );
};
