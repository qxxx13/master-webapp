import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { OrderStatusEnum, OrderType } from '../../types/OrderType';
import { UserType } from '../../types/UserType';
import { initialValues } from './model/initialValues';
import { editOrderFx } from './model/editOrderFormStore';
import { sendToMaster, transferOrder } from './api/editOrderFormApi';
import { MasterSelectField, OrderTypeSelectField, TextFields, VisitSelectField } from './FieldsForForm';
import { Button, Stack, TextField } from '@mui/material';
import InputMask from 'react-input-mask';
import { translate } from '../../common/translate/translate';
import { setUpdate } from './model/setUpdateOrderStore';
import { EditOrderDatePickerForForm } from './EditOrderDatePickerForForm/EditOrderDatePickerForForm';

export const EditOrderForm: React.FC<{ users: UserType[]; order: OrderType }> = ({ order, users }) => {
    const { handleSubmit, control } = useForm<OrderType>({
        defaultValues: initialValues(order),
    });

    const handleSave: SubmitHandler<OrderType> = (data) => {
        editOrderFx(data);
        setUpdate();
    };

    const handleSendToMaster: SubmitHandler<OrderType> = (data) => {
        data.Status = OrderStatusEnum.pending;
        sendToMaster(data);
        setUpdate();
    };

    const handleTransfer: SubmitHandler<OrderType> = (data) => {
        data.Status = OrderStatusEnum.transfer;
        transferOrder(data);
        setUpdate();
    };

    const textFields = TextFields(control, initialValues(order));

    return (
        <form>
            <Stack sx={{ p: 2, gap: 1, mb: '56px' }}>
                <EditOrderDatePickerForForm control={control} />
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
                {textFields}
                {VisitSelectField(control)}
                {OrderTypeSelectField(control)}
                {MasterSelectField(control, users)}

                <Button variant="outlined" onClick={handleSubmit((editedOrder) => handleSave(editedOrder))}>
                    {translate('Save')}
                </Button>
                {order.Status === 'distribution' && (
                    <Button
                        variant="outlined"
                        color="info"
                        onClick={handleSubmit((editedOrder) => handleSendToMaster(editedOrder))}
                    >
                        Выслать мастеру
                    </Button>
                )}
                {order.Status === 'transfer' && (
                    <Button
                        variant="outlined"
                        color="warning"
                        onClick={handleSubmit((editedOrder) => handleSendToMaster(editedOrder))}
                    >
                        Выслать мастеру
                    </Button>
                )}
                <Button
                    variant="outlined"
                    onClick={handleSubmit((editedOrder) => handleTransfer(editedOrder))}
                    color="secondary"
                >
                    Перенос
                </Button>
            </Stack>
        </form>
    );
};
