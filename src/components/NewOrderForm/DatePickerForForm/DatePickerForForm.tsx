import { Control, Controller } from 'react-hook-form';
import { NewOrderType } from '../../../types/OrderType';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { translate } from '../../../common/translate/translate';
import dayjs from 'dayjs';

export const DatePickerForForm: React.FC<{ control: Control<NewOrderType, unknown> }> = ({ control }) => {
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
