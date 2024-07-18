import MenuIcon from '@mui/icons-material/Menu';
import {
    CircularProgress,
    Drawer,
    IconButton,
    MenuItem,
    Select,
    SelectChangeEvent,
    Stack,
    TextField,
    Typography,
} from '@mui/material';
import { MainButton } from '@vkruglikov/react-telegram-web-app';
import { useUnit } from 'effector-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { OrdersSortForm } from '../../components/OrdersSortForm/OrdersSortForm';
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

    const toggleDrawer = (state: boolean) => () => {
        setOpenSortMenu(state);
    };

    const goToCreateNewOrderPage = () => navigate('/createNewOrder');

    const BackBTN = Telegram.WebApp.BackButton;
    BackBTN.hide();

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
                <Drawer open={openSortMenu} onClose={toggleDrawer(false)}>
                    <OrdersSortForm />
                </Drawer>
                <Typography variant="h5" sx={{ textAlign: 'center' }}>
                    Заявки
                </Typography>
                <Select value={selectedOrdersUserId} onChange={handleChange} sx={{ height: 45 }}>
                    <MenuItem value="all">All</MenuItem>
                    {menuItems}
                </Select>
                <MainButton text="Создать заявку" onClick={goToCreateNewOrderPage} />
            </Stack>
            {!loading ? <OrdersList masterId={selectedOrdersUserId} users={users} /> : <CircularProgress />}
        </>
    );
};
