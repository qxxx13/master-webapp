import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PaidIcon from '@mui/icons-material/Paid';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import { BottomNavigation, BottomNavigationAction, Box, Divider } from '@mui/material';
import { useUnit } from 'effector-react';
import { useNavigate } from 'react-router-dom';

import { $navBarStore, setNavBar } from './model/navBarStore';

export const NavBar = () => {
    const pageNum = useUnit($navBarStore);
    const navigate = useNavigate();

    const handleChangePage = (pageNum: number) => {
        setNavBar(pageNum);

        switch (pageNum) {
            case 0: {
                navigate('/');
                break;
            }
            case 1: {
                navigate('/paymentOrder');
                break;
            }
            case 2: {
                navigate('/profile');
                break;
            }
        }
    };

    return (
        <Box sx={{ position: 'fixed', bottom: 0, width: '100%' }}>
            <Divider />
            <BottomNavigation
                showLabels
                value={pageNum}
                onChange={(event, newValue) => {
                    handleChangePage(newValue);
                }}
            >
                <BottomNavigationAction label="Заявки" icon={<TaskAltIcon />} />
                <BottomNavigationAction label="Сдача" icon={<PaidIcon />} />
                <BottomNavigationAction label="Профиль" icon={<AccountCircleIcon />} />
            </BottomNavigation>
        </Box>
    );
};
