import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import dayjs from 'dayjs';
import { Control, Controller } from 'react-hook-form';

import { translate } from '../../../common/translate/translate';
import { NewOrderType, OrderType } from '../../../types/OrderType';

export const EditOrderDatePickerForForm: React.FC<{ control: Control<OrderType, unknown> }> = ({ control }) => {
    return (
        <Controller
            control={control}
            name="Date"
            render={({ field: { onChange, value }, fieldState: { error } }) => (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DateTimePicker']}>
                        <DatePicker
                            label={translate('OrderDate')}
                            value={dayjs(value)}
                            onChange={(newValue) => onChange(dayjs(newValue))}
                            format="DD.MM.YYYY"
                        />
                    </DemoContainer>
                </LocalizationProvider>
            )}
        />
    );
};
