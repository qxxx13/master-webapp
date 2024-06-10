import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PaidIcon from '@mui/icons-material/Paid';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import { BottomNavigation, BottomNavigationAction, Box, Button, Divider, Paper, Stack } from '@mui/material';
import { useState } from 'react';

export const NavBar = () => {
    const [value, setValue] = useState(0);

    return (
        <Box sx={{ position: 'fixed', bottom: 0, width: '100%' }}>
            <Divider />
            <BottomNavigation
                showLabels
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
            >
                <BottomNavigationAction label="Заявки" icon={<TaskAltIcon />} />
                <BottomNavigationAction label="Сдача" icon={<PaidIcon />} />
                <BottomNavigationAction label="Профиль" icon={<AccountCircleIcon />} />
            </BottomNavigation>
        </Box>
    );
};
