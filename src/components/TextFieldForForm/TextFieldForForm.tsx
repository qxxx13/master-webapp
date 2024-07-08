import { FormControl, FormLabel, Input, TextField } from '@mui/material';
import React from 'react';
import { Control, Controller } from 'react-hook-form';
import { translate } from '../../common/translate/translate';

type Props<T, U> = {
    name: U;
    control: T;
};

export const TextFieldForForm = <T extends Control<any, unknown>, U extends string>({
    name,
    control,
}: Props<T, U>): JSX.Element => {
    return (
        <Controller
            control={control}
            name={name}
            rules={{ required: true }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
                <TextField
                    value={value as string}
                    onChange={(event) => onChange(event.target.value)}
                    placeholder={translate(name)}
                    type={typeof value}
                    label={name}
                    error={!!error}
                />
            )}
        />
    );
};
