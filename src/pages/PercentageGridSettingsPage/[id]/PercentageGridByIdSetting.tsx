import AddIcon from '@mui/icons-material/Add';
import { IconButton, Stack, TextField, Typography } from '@mui/material';
import { useUnit } from 'effector-react';
import { debounce } from 'lodash';
import { enqueueSnackbar } from 'notistack';
import { ChangeEvent, FC, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

import { UserType } from '../../../types/UserType';
import { createNewItem, editPercentageGrid, editPercentageGridItem } from './api';
import { $percentageGridGetStatus, fetchPercentageGridFx } from './store';

type Item = {
    Id: number;
    From: string;
    To: string;
    CheckAmount: string;
    PercentageGridId: number;
};

const PercentageGridItemForm = (gridItem: Item) => {
    const [from, setFrom] = useState(gridItem.From || '');
    const [to, setTo] = useState(gridItem.To || '');
    const [checkAmount, setCheckAmount] = useState(gridItem.CheckAmount || '');

    const onFromChange = useMemo(
        () =>
            debounce((from, to, checkAmount) => {
                console.log(from, to, checkAmount);
                editPercentageGridItem(gridItem.Id, from, to, checkAmount, gridItem.PercentageGridId)
                    .then(() => enqueueSnackbar(`Сетка №${gridItem.Id} изменена`, { variant: 'success' }))
                    .catch((e) =>
                        enqueueSnackbar(`Сетка №${gridItem.Id} не изменена ${e.message}`, { variant: 'error' }),
                    );
            }, 900),

        [],
    );

    const handleChangeFrom = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFrom(event.target.value);
        onFromChange(event.target.value, to, checkAmount);
    };

    const handleChangeTo = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setTo(event.target.value);
        onFromChange(from, event.target.value, checkAmount);
    };

    const handleChangeCheckAmount = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setCheckAmount(event.target.value);
        onFromChange(from, to, event.target.value);
    };

    useEffect(() => {
        if (gridItem.From) {
            setFrom(gridItem.From);
        }

        if (gridItem.To) {
            setTo(gridItem.To);
        }

        if (gridItem.CheckAmount) {
            setCheckAmount(gridItem.CheckAmount);
        }
    }, [gridItem.From, gridItem.To, gridItem.CheckAmount]);

    return (
        <form>
            <Stack gap={1}>
                <Typography variant="body1" textAlign={'center'}>
                    Процентовка №{gridItem.Id}
                </Typography>
                <TextField type="number" label="Сумма от" value={from} onChange={handleChangeFrom} />
                <TextField type="number" label="Сумма до" value={to} onChange={handleChangeTo} />
                <TextField type="number" label="Процент" value={checkAmount} onChange={handleChangeCheckAmount} />
            </Stack>
        </form>
    );
};

type PercentageGridSettingsPageProps = {
    currentUser: UserType;
};

export const PercentageGridByIdSetting: FC<PercentageGridSettingsPageProps> = ({ currentUser }) => {
    const { id } = useParams();

    const { data, error, loading } = useUnit($percentageGridGetStatus);

    const [name, setName] = useState('');

    const handleAddNewItem = () => {
        createNewItem(+String(id)).then(() => fetchPercentageGridFx({ id: String(id) }));
    };

    const onNameChange = useMemo(
        () =>
            debounce((event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
                editPercentageGrid(event.target.value, +String(id))
                    .then(() => enqueueSnackbar('Имя сетки процентов изменено', { variant: 'success' }))
                    .catch((e) => enqueueSnackbar(`Имя сетки не изменено ${e.message}`, { variant: 'error' }));
            }, 900),
        [],
    );

    const handleChangePercentageName = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setName(event.target.value);
        onNameChange(event);
    };

    useEffect(() => {
        fetchPercentageGridFx({ id: String(id) });
    }, []);

    useEffect(() => {
        if (data?.Name) {
            setName(data?.Name);
        }
    }, [data?.Name]);

    return (
        <Stack sx={{ p: 2 }}>
            <form>
                <Stack gap={1}>
                    <TextField label="Название сетки" value={name} onChange={handleChangePercentageName} />
                    {data?.Items.sort((a, b) => a.Id - b.Id).map((item) => (
                        <PercentageGridItemForm {...item} key={item.Id} />
                    ))}
                    <IconButton onClick={handleAddNewItem}>
                        <AddIcon />
                    </IconButton>
                </Stack>
            </form>
        </Stack>
    );
};
