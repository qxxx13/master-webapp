import { createTheme } from '@mui/material';

export const theme = createTheme({
    palette: {
        mode: 'dark',
        background: {
            default: '#17212b',
            paper: '#141d25',
        },
        primary: {
            main: '#5288c1',
        },
        error: {
            main: '#ec3942',
        },
        secondary: {
            main: '#6ab3f3',
        },
    },
});
