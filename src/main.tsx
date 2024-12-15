import './index.css';

import { CssBaseline, ThemeProvider } from '@mui/material';
import { WebAppProvider } from '@vkruglikov/react-telegram-web-app';
import { SnackbarProvider } from 'notistack';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { App } from './App';
import { theme } from './config/themeConfig/themeConfig';

const container = document.getElementById('root') as HTMLDivElement;
const root = createRoot(container);

root.render(
    <React.StrictMode>
        <BrowserRouter>
            <ThemeProvider theme={theme}>
                <WebAppProvider
                    options={{
                        smoothButtonsTransition: true,
                    }}
                >
                    <SnackbarProvider autoHideDuration={1500}>
                        <CssBaseline />
                        <App />
                    </SnackbarProvider>
                </WebAppProvider>
            </ThemeProvider>
        </BrowserRouter>
    </React.StrictMode>,
);
