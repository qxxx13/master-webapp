import { FormControl, InputLabel, Select } from '@mui/material';
import { Control, Controller, ValidationValueMessage } from 'react-hook-form';

import { translate } from '../../common/translate/translate';

type Props<T, U> = {
    control: T;
    name: U;
    option: JSX.Element[];
    required?: boolean;
    isLoading?: boolean;
};

export const SelectFieldForForm = <T extends Control<any, unknown>, U extends string>({
    control,
    name,
    option,
    required,
    isLoading,
}: Props<T, U>) => {
    const isRequired = required !== undefined ? required : true;

    return (
        <Controller
            control={control}
            name={name}
            rules={{ required: isRequired }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
                <FormControl fullWidth>
                    <InputLabel id="select-label">{translate(name)}</InputLabel>
                    <Select
                        value={value}
                        onChange={(event) => onChange(event.target.value)}
                        error={!!error}
                        disabled={isLoading}
                    >
                        {option}
                    </Select>
                </FormControl>
            )}
        />
    );
};
