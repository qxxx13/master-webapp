import { Button, FormControl, InputLabel, MenuItem, Select, Stack, TextField, Typography } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { useShowPopup } from '@vkruglikov/react-telegram-web-app';

import { OrderStatusEnum } from '../../types/OrderType';

const MenuProps = {
    PaperProps: {
        style: {
            height: 300,
            overflow: 'scroll',
        },
    },
};

enum SearchByEnum {
    phoneNumber = 'phoneNumber',
    orderId = 'orderId',
    city = 'city',
    address = 'address',
}

export const OrdersSortForm = () => {
    const showPopup = useShowPopup();

    const StatusMenuItems = Object.values(OrderStatusEnum).map((status, index) => (
        <MenuItem value={status} key={index}>
            {status}
        </MenuItem>
    ));

    const SearchByMenuItems = Object.values(SearchByEnum).map((searchBy, index) => (
        <MenuItem value={searchBy} key={index}>
            {searchBy}
        </MenuItem>
    ));

    const handleClick = () => {
        showPopup({ message: 'В разработке', buttons: [{ type: 'ok' }] });
    };

    return (
        <Stack sx={{ width: 250, p: 2 }} gap={1}>
            <Typography variant="body1">Поиск и фильтрация</Typography>
            <TextField label="Поиск" />
            <FormControl fullWidth>
                <InputLabel id="searchBy-select">Искать по</InputLabel>
                <Select id="searchBy-select">{SearchByMenuItems}</Select>
            </FormControl>
            <FormControl fullWidth>
                <InputLabel id="status-select">Статус</InputLabel>
                <Select id="status-select" MenuProps={MenuProps} label="test">
                    <MenuItem value="all">All</MenuItem>
                    {StatusMenuItems}
                </Select>
            </FormControl>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker']}>
                    <DatePicker label="Дата заявок" />
                </DemoContainer>
            </LocalizationProvider>
            <Button variant="contained" color="secondary">
                Сбросить дату
            </Button>
            <Button variant="contained" onClick={handleClick}>
                Применить
            </Button>
        </Stack>
    );
};
