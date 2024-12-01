import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import GroupIcon from '@mui/icons-material/Group';
import InventoryIcon from '@mui/icons-material/Inventory';
import PaidIcon from '@mui/icons-material/Paid';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import WorkIcon from '@mui/icons-material/Work';
import { BottomNavigation, BottomNavigationAction, Box, Divider } from '@mui/material';
import { useUnit } from 'effector-react';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

import { UserType } from '../../types/UserType';
import { $navBarStore, setNavBar } from './model/navBarStore';

export const NavBar = () => {
    const [currentUser, setCurrentUser] = useState<UserType | Record<string, unknown>>({});
    const pageNum = useUnit($navBarStore);
    const navigate = useNavigate();
    const location = useLocation();
    const [searchParams] = useSearchParams();
    const typeOfPage = searchParams.get('type');
    const { pathname } = location;

    console.log(pathname);

    const display = Object.keys(currentUser).length > 0 ? 'flex' : 'none';

    useEffect(() => {
        setCurrentUser(JSON.parse(localStorage.getItem('user') || '{}'));
    }, []);

    const handleChangePage = (pageNum: number) => {
        setNavBar(pageNum);
        switch (pageNum) {
            case 0: {
                navigate('/?type=chronology');
                break;
            }
            case 1: {
                navigate('/?type=archive');
                break;
            }
            case 2: {
                navigate('/paymentOrder');
                break;
            }
            case 3: {
                currentUser.Role === 'admin' ? navigate('/users') : navigate('/profile');
                break;
            }
            case 4: {
                currentUser.Role === 'admin' ? navigate('/company') : navigate('/profile');
                break;
            }
            case 5: {
                navigate('/profile');
                break;
            }
        }
    };

    useEffect(() => {
        if (pathname === '/' && typeOfPage === 'archive') {
            setNavBar(1);
        } else if (pathname === '/' && typeOfPage === 'chronology') {
            setNavBar(0);
        } else if (pathname === '/paymentOrder') {
            setNavBar(2);
        } else if (pathname === '/users') {
            currentUser.Role === 'admin' && setNavBar(3);
        } else if (pathname === '/company') {
            currentUser.Role === 'admin' && setNavBar(4);
        } else if (pathname === '/profile') {
            currentUser.Role === 'admin' ? setNavBar(5) : setNavBar(4);
        }
    }, [pathname, typeOfPage]);

    return (
        <Box sx={{ position: 'fixed', bottom: 0, width: '100%', zIndex: 100 }}>
            <Divider />
            <BottomNavigation
                showLabels
                value={pageNum}
                onChange={(_, newValue) => {
                    handleChangePage(newValue);
                }}
                sx={{ display: display, overflow: 'auto', justifyContent: 'space-between' }}
            >
                <BottomNavigationAction label="Хронология" icon={<TaskAltIcon />} />
                <BottomNavigationAction label="Архив" icon={<InventoryIcon />} />
                <BottomNavigationAction label="Сдача" icon={<PaidIcon />} />
                {currentUser.Role === 'admin' && <BottomNavigationAction label="Пользователи" icon={<GroupIcon />} />}
                {currentUser.Role === 'admin' && <BottomNavigationAction label="Компании" icon={<WorkIcon />} />}
                <BottomNavigationAction label="Профиль" icon={<AccountCircleIcon />} />
            </BottomNavigation>
        </Box>
    );
};
