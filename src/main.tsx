import './index.css';

import { WebAppProvider } from '@vkruglikov/react-telegram-web-app';
import { ConfigProvider } from 'antd';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { App } from './App';
import { themeConfig } from './config/themeConfig/themeConfig';

const container = document.getElementById('root') as HTMLDivElement;
const root = createRoot(container);

root.render(
    <React.StrictMode>
        <BrowserRouter>
            <ConfigProvider theme={themeConfig}>
                <WebAppProvider
                    options={{
                        smoothButtonsTransition: true,
                    }}
                >
                    <App />
                </WebAppProvider>
            </ConfigProvider>
        </BrowserRouter>
    </React.StrictMode>,
);
