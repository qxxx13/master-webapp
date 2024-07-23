import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import GroupIcon from '@mui/icons-material/Group';
import PaidIcon from '@mui/icons-material/Paid';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import { BottomNavigation, BottomNavigationAction, Box, Divider } from '@mui/material';
import { useUnit } from 'effector-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { UserType } from '../../types/UserType';
import { $navBarStore, setNavBar } from './model/navBarStore';

export const NavBar = () => {
    const [currentUser, setCurrentUser] = useState<UserType | Record<string, unknown>>({});
    const pageNum = useUnit($navBarStore);
    const navigate = useNavigate();

    useEffect(() => {
        setCurrentUser(JSON.parse(localStorage.getItem('user') || '{}'));
    }, []);

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
                currentUser.Role === 'admin' ? navigate('/users') : navigate('/profile');
                break;
            }
            case 3: {
                navigate('/profile');
                break;
            }
        }
    };

    return (
        <Box sx={{ position: 'fixed', bottom: 0, width: '100%', zIndex: 100 }}>
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
                {currentUser.Role === 'admin' && <BottomNavigationAction label="Пользователи" icon={<GroupIcon />} />}
                <BottomNavigationAction label="Профиль" icon={<AccountCircleIcon />} />
            </BottomNavigation>
        </Box>
    );
};
