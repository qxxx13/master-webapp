import { Button, Stack, TextField } from '@mui/material';
import React from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import InputMask from 'react-input-mask';

import { translate } from '../../common/translate/translate';
import { NewOrderType, OrderStatusEnum } from '../../types/OrderType';
import { UserType } from '../../types/UserType';
import { DatePickerForForm } from './DatePickerForForm/DatePickerForForm';
import { MasterSelectField, OrderTypeSelectField, TextFields, VisitSelectField } from './FieldsForForm';
import { initialValues } from './model/initialValues';
import { addNewOrderFx } from './model/newOrderFormStore';

export const NewOrderForm: React.FC<{ users: UserType[] }> = ({ users }) => {
    const { handleSubmit, reset, control } = useForm<NewOrderType>({
        defaultValues: initialValues,
    });

    const handleSendToMaster: SubmitHandler<NewOrderType> = (data) => {
        addNewOrderFx(data);
        reset();
    };

    const handleSendSendToDistribution: SubmitHandler<NewOrderType> = (data) => {
        data.Status = OrderStatusEnum.distribution;
        addNewOrderFx(data);
        reset();
    };

    return (
        <form>
            <Stack sx={{ p: 2, gap: 1, mb: '56px' }}>
                <DatePickerForForm control={control} />
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

                <Button
                    variant="outlined"
                    type="submit"
                    onClick={handleSubmit((newOrder) => handleSendToMaster(newOrder))}
                >
                    Создать и отправить мастеру
                </Button>
                <Button
                    variant="outlined"
                    color="warning"
                    onClick={handleSubmit((newOrder) => handleSendSendToDistribution(newOrder))}
                >
                    На распределение
                </Button>
            </Stack>
        </form>
    );
};
