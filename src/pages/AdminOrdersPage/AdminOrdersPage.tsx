import MenuIcon from '@mui/icons-material/Menu';
import {
    Drawer,
    FormControlLabel,
    IconButton,
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
import { useNavigate, useSearchParams } from 'react-router-dom';

import { CardLoading } from '../../components/CardLoading/CardLoading';
import { OrdersSortForm } from '../../components/OrdersSortForm/OrdersSortForm';
import { RoleEnum, UserType } from '../../types/UserType';
import { $usersGetStatus, fetchUsersFx } from './model/usersStore';
import { OrdersList } from './OrdersList/OrdersList';
import { OrderStatusEnum } from '../../types/OrderType';

export const AdminOrdersPage: React.FC<{ currentUser: UserType }> = ({ currentUser }) => {
    const navigate = useNavigate();
    const { data: users, loading } = useUnit($usersGetStatus);
    const [selectedOrdersUserId, setSelectedOrdersUserId] = useState(
        localStorage.getItem('selectedOrdersUserId') || 'all',
    );
    const [openSortMenu, setOpenSortMenu] = useState(false);
    const [searchParams] = useSearchParams();
    const [phoneNumber, setPhoneNumber] = useState('');
    const [sdStatus, setSDStatus] = useState<OrderStatusEnum | 'all'>('all');

    const typeOfPage = searchParams.get('type');

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

    const handleChange = (event: SelectChangeEvent) => {
        setSelectedOrdersUserId(event.target.value);
        localStorage.setItem('selectedOrdersUserId', event.target.value);
    };

    const handleSDChecked = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            setSDStatus(OrderStatusEnum.takeToSD);
        } else {
            setSDStatus('all');
        }
    };

    const handleSearchByPhoneNumber = debounce((event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const phoneNumber = event.target.value;
        setPhoneNumber(phoneNumber);
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
                    {typeOfPage === 'archive' ? 'Архив' : 'Хронология'}
                </Typography>
                <Stack gap={1}>
                    <TextField size="small" label="Номер телефона" onChange={(e) => handleSearchByPhoneNumber(e)} />
                    <Select value={selectedOrdersUserId} onChange={handleChange} sx={{ height: 45 }}>
                        <MenuItem value="all">All</MenuItem>
                        {!loading && menuItems}
                    </Select>
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
