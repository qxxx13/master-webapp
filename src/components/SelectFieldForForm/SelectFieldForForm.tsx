import { FormControl, Select } from '@mui/material';
import { Control, Controller } from 'react-hook-form';
import { translate } from '../../common/translate/translate';

type Props<T, U> = {
    control: T;
    name: U;
    option: JSX.Element[];
};

export const SelectFieldForForm = <T extends Control<any, unknown>, U extends string>({
    control,
    name,
    option,
}: Props<T, U>) => {
    return (
        <Controller
            control={control}
            name={name}
            rules={{ required: true }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
                <FormControl fullWidth>
                    <Select
                        value={value}
                        onChange={(event) => onChange(event.target.value)}
                        error={!!error}
                        placeholder={translate(name)}
                    >
                        {option}
                    </Select>
                </FormControl>
            )}
        />
    );
};
