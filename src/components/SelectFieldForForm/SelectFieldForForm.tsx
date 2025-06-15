import { FormControl, InputLabel, Select, SelectProps } from '@mui/material';
import { Control, Controller, ValidationValueMessage } from 'react-hook-form';

import { translate } from '../../common/translate/translate';

interface Props<T extends Control<any, unknown>, U extends string> {
    control: T;
    name: U;
    option: React.ReactNode;
    required?: boolean;
    isLoading?: boolean;
    disabled?: boolean;
    selectProps?: SelectProps;
}

export const SelectFieldForForm = <T extends Control<any, unknown>, U extends string>({
    control,
    name,
    option,
    required,
    isLoading,
    disabled = false,
    selectProps = {},
}: Props<T, U>) => {
    const isRequired = required !== undefined ? required : true;

    return (
        <Controller
            control={control}
            name={name}
            rules={{ required: isRequired }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
                <FormControl fullWidth>
                    <InputLabel id={`${name}-label`}>{translate(name)}</InputLabel>
                    <Select
                        labelId={`${name}-label`}
                        value={value || ''}
                        onChange={onChange}
                        error={!!error}
                        disabled={isLoading || disabled}
                        MenuProps={{
                            PaperProps: {
                                sx: {
                                    '& .MuiMenuItem-root': {
                                        margin: 0.5,
                                        borderRadius: 1,
                                    },
                                },
                            },
                        }}
                        {...selectProps}
                    >
                        {option}
                    </Select>
                </FormControl>
            )}
        />
    );
};
