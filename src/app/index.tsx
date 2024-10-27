import { useEffect } from 'react';
import { NavBar } from '../components/NavBar/NavBar';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';
import { WebAppProvider } from '@vkruglikov/react-telegram-web-app';
import { CssBaseline } from '@mui/material';
import { theme } from './theme/themeConfig';
import { AppRouter } from '@pages';

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
