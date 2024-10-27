import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import { AppRouter } from '@pages';
import { WebAppProvider } from '@vkruglikov/react-telegram-web-app';
import { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';

import { NavBar } from '../components/NavBar/NavBar';
import { theme } from './theme/themeConfig';

export const App = () => {
    useEffect(() => {
        Telegram.WebApp.ready();
        Telegram.WebApp.expand();
    });

    return (
        <div className="App">
            <BrowserRouter>
                <ThemeProvider theme={theme}>
                    <WebAppProvider
                        options={{
                            smoothButtonsTransition: true,
                        }}
                    >
                        <CssBaseline />
                        <AppRouter />
                        <NavBar />
                    </WebAppProvider>
                </ThemeProvider>
            </BrowserRouter>
        </div>
    );
};
