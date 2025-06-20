import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import dayjs from 'dayjs';
import { FC } from 'react';
import { Control, Controller } from 'react-hook-form';

import { translate } from '../../../common/translate/translate';
import { NewOrderType } from '../../../types/OrderType';

export const DatePickerForForm: FC<{ control: Control<NewOrderType, unknown> }> = ({ control }) => {
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
