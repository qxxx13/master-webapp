import MenuIcon from '@mui/icons-material/Menu';
import {
    Drawer,
    FormControl,
    FormControlLabel,
    IconButton,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    Stack,
    Switch,
    TextField,
    Typography,
} from '@mui/material';
import { MainButton } from '@vkruglikov/react-telegram-web-app';
import { useUnit } from 'effector-react';
import { debounce } from 'lodash';
import { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { CardLoading } from '../../components/CardLoading/CardLoading';
import { OrdersSortForm } from '../../components/OrdersSortForm/OrdersSortForm';
import { OrderStatusEnum } from '../../types/OrderType';
import { RoleEnum, UserType } from '../../types/UserType';
import { $usersGetStatus, fetchUsersFx } from './model/usersStore';
import { OrdersList } from './OrdersList/OrdersList';

export const AdminOrdersPage: React.FC<{ currentUser: UserType }> = ({ currentUser }) => {
    const navigate = useNavigate();
    const { data: users, loading } = useUnit($usersGetStatus);
    const [selectedOrdersUserId, setSelectedOrdersUserId] = useState(
        localStorage.getItem('selectedOrdersUserId') || 'all',
    );
    const [openSortMenu, setOpenSortMenu] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [sdStatus, setSDStatus] = useState<OrderStatusEnum | 'all'>('all');
    const [typeOfPage, setTypeOfPage] = useState('archive');

    const toggleDrawer = (state: boolean) => () => {
        setOpenSortMenu(state);
    };

    const goToCreateNewOrderPage = () => navigate('/createNewOrder');

    const menuItems = users.map((user) => {
        if (user.Role === RoleEnum.master) {
            return (
                <MenuItem value={user.Id} key={user.Id}>
                    {user.UserName}
                </MenuItem>
            );
        }
    });

    const handleChangeMaster = (event: SelectChangeEvent) => {
        setSelectedOrdersUserId(event.target.value);
        localStorage.setItem('selectedOrdersUserId', event.target.value);
    };

    const handleChangeTypeOfPage = (event: SelectChangeEvent) => {
        setTypeOfPage(event.target.value);
    };

    const handleSDChecked = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            setSDStatus(OrderStatusEnum.takeToSD);
            setTypeOfPage('chronology');
        } else {
            setSDStatus('all');
        }
    };

    const handleSearchByPhoneNumber = debounce((event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const phoneNumber = event.target.value.replace(/[\s\-()]/g, '');
        let correctPhoneNumber = phoneNumber;

        if (correctPhoneNumber[0] === '+') {
            correctPhoneNumber = correctPhoneNumber.replace(/(\+7)(\d{3})(\d{3})(\d{2})(\d{2})/, '+7-$2-$3-$4-$5');
        } else if (correctPhoneNumber[0] === '8') {
            correctPhoneNumber = '+7' + correctPhoneNumber.substring(1);
            correctPhoneNumber = correctPhoneNumber.replace(/(\+7)(\d{3})(\d{3})(\d{2})(\d{2})/, '+7-$2-$3-$4-$5');
        } else if (correctPhoneNumber[0] === '7') {
            correctPhoneNumber = '+' + correctPhoneNumber;
            correctPhoneNumber = correctPhoneNumber.replace(/(\+7)(\d{3})(\d{3})(\d{2})(\d{2})/, '+7-$2-$3-$4-$5');
        }

        setPhoneNumber(correctPhoneNumber);
    }, 1500);

    useEffect(() => {
        Telegram.WebApp.ready();
        fetchUsersFx();
    }, []);

    return (
        <>
            <Stack sx={{ p: 2 }}>
                <IconButton sx={{ position: 'absolute', top: 8, left: 8 }} onClick={toggleDrawer(true)}>
                    <MenuIcon />
                </IconButton>
                <FormControlLabel
                    sx={{ position: 'absolute', top: 8, right: 8 }}
                    control={
                        <Switch checked={sdStatus !== 'all' ? true : false} onChange={(e) => handleSDChecked(e)} />
                    }
                    label="СД"
                />
                <Drawer open={openSortMenu} onClose={toggleDrawer(false)} elevation={1}>
                    <OrdersSortForm />
                </Drawer>
                <Typography variant="h5" sx={{ textAlign: 'center', mb: 1 }}>
                    Заявки
                </Typography>
                <Stack gap={1}>
                    <TextField size="small" label="Номер телефона" onChange={(e) => handleSearchByPhoneNumber(e)} />
                    <FormControl>
                        <InputLabel id="master-select">Мастер</InputLabel>
                        <Select
                            labelId="master-select"
                            value={selectedOrdersUserId}
                            onChange={handleChangeMaster}
                            sx={{ height: 45 }}
                            label="Мастер"
                        >
                            <MenuItem value="all">All</MenuItem>
                            {!loading && menuItems}
                        </Select>
                    </FormControl>
                    <FormControl>
                        <InputLabel id="typeSelect">Тип</InputLabel>
                        <Select
                            labelId="typeSelect"
                            value={typeOfPage}
                            onChange={handleChangeTypeOfPage}
                            sx={{ height: 45 }}
                            label="Тип"
                        >
                            <MenuItem value="chronology">Хронология</MenuItem>
                            <MenuItem value="archive">Архив</MenuItem>
                        </Select>
                    </FormControl>
                </Stack>
                <MainButton text="Создать заявку" onClick={goToCreateNewOrderPage} />
            </Stack>
            {!loading ? (
                <OrdersList
                    masterId={selectedOrdersUserId}
                    users={users}
                    type={typeOfPage as 'archive' | 'chronology'}
                    phoneNumber={phoneNumber}
                    status={sdStatus}
                />
            ) : (
                <CardLoading height={160} />
            )}
        </>
    );
};
