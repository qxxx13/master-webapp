import { useEffect } from 'react';

import { NavBar } from './components/NavBar/NavBar';
import { AppRouter } from './router/AppRouter';

export const App = () => {
    useEffect(() => {
        Telegram.WebApp.ready();
        Telegram.WebApp.expand();
    });

    return (
        <div className="App">
            <AppRouter />
            <NavBar />
        </div>
    );
};
