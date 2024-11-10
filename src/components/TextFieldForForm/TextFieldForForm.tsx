import { TextField } from '@mui/material';
import { Control, Controller } from 'react-hook-form';

import { translate } from '../../common/translate/translate';

type Props<T, U> = {
    name: U;
    control: T;
    isLoading?: boolean;
};

export const TextFieldForForm = <T extends Control<any, unknown>, U extends string>({
    name,
    control,
    isLoading,
}: Props<T, U>): JSX.Element => {
    return (
        <Controller
            control={control}
            name={name}
            rules={{ required: true }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
                <TextField
                    value={value}
                    onChange={(event) => onChange(event.target.value)}
                    placeholder={translate(name)}
                    type={typeof value}
                    label={translate(name)}
                    error={!!error}
                    disabled={isLoading}
                />
            )}
        />
    );
};
