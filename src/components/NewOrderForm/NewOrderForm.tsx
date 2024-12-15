import { Button, Stack, TextField, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import { FC, MouseEvent, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import InputMask from 'react-input-mask';

import { translate } from '../../common/translate/translate';
import { NewOrderType, OrderStatusEnum } from '../../types/OrderType';
import { UserType } from '../../types/UserType';
import { DatePickerForForm } from './DatePickerForForm/DatePickerForForm';
import {
    MasterSelectField,
    OrderTypeSelectField,
    ReferralSelectField,
    TextFields,
    VisitSelectField,
} from './FieldsForForm';
import { initialValues } from './model/initialValues';
import { addNewOrderFx } from './model/newOrderFormStore';

export const NewOrderForm: FC<{ users: UserType[]; currentUser: UserType }> = ({ users, currentUser }) => {
    const { handleSubmit, reset, control, setValue } = useForm<NewOrderType>({
        defaultValues: initialValues,
    });

    const [orderDay, setOrderDay] = useState<string | null>('today');

    const handleSendToMaster: SubmitHandler<NewOrderType> = (data) => {
        data.DispId = currentUser.Id;
        addNewOrderFx(data)
            .then(() => {
                enqueueSnackbar('Успешно отправлено мастеру', { variant: 'success' });
                reset();
            })
            .catch((e: Error) =>
                enqueueSnackbar(`Ну удалось отправить заявку мастеру ${e.message}`, { variant: 'error' }),
            );
    };

    const handleSendSendToDistribution: SubmitHandler<NewOrderType> = (data) => {
        data.DispId = currentUser.Id;
        data.Status = OrderStatusEnum.distribution;
        addNewOrderFx(data)
            .then(() => {
                enqueueSnackbar('Успешно отправлено на распределение', { variant: 'success' });
                reset();
            })
            .catch((e: Error) =>
                enqueueSnackbar(`Ну удалось отправить заявку на распределение ${e.message}`, { variant: 'error' }),
            );
    };

    const handleOrderDay = (_: MouseEvent<HTMLElement>, newDay: string | null) => {
        const day = new Date();

        switch (newDay) {
            case 'today':
                {
                    day.setDate(day.getDate() + 0);
                }
                break;
            case 'tomorrow':
                {
                    day.setDate(day.getDate() + 1);
                }
                break;
            case 'dayAfterTomorrow': {
                day.setDate(day.getDate() + 2);
            }
        }
        setValue('Date', day);
        setOrderDay(newDay);
    };

    return (
        <form>
            <Stack sx={{ p: 2, gap: 1, mb: '56px' }}>
                <Controller
                    control={control}
                    name="ClientPhoneNumber"
                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                        <InputMask
                            mask="+7-999-999-99-99"
                            value={value}
                            onChange={(event) => onChange(event.target.value)}
                        >
                            <TextField
                                color={!error ? 'primary' : 'error'}
                                label={translate('clientPhoneNumber')}
                                variant="outlined"
                            />
                        </InputMask>
                    )}
                ></Controller>
                {TextFields(control)}
                {VisitSelectField(control)}
                {OrderTypeSelectField(control)}
                {MasterSelectField(control, users)}
                {ReferralSelectField(control, users)}
                <DatePickerForForm control={control} />
                <ToggleButtonGroup
                    value={orderDay}
                    exclusive
                    onChange={handleOrderDay}
                    aria-label="day buttons"
                    sx={{ flex: 1 }}
                >
                    <ToggleButton sx={{ flex: 1 }} value="today">
                        Сегодня
                    </ToggleButton>
                    <ToggleButton sx={{ flex: 1 }} value="tomorrow">
                        Завтра
                    </ToggleButton>
                    <ToggleButton sx={{ flex: 1 }} value="dayAfterTomorrow">
                        Послезавтра
                    </ToggleButton>
                </ToggleButtonGroup>

                <Button
                    variant="contained"
                    type="submit"
                    onClick={handleSubmit((newOrder) => handleSendToMaster(newOrder))}
                >
                    Создать и отправить мастеру
                </Button>
                <Button
                    variant="contained"
                    color="warning"
                    onClick={handleSubmit((newOrder) => handleSendSendToDistribution(newOrder))}
                >
                    На распределение
                </Button>
            </Stack>
        </form>
    );
};
