import { useEffect } from 'react';

import { AppRouter } from './router/AppRouter';

export const App = () => {
    useEffect(() => {
        Telegram.WebApp.ready();
    });

    return (
        <div className="App">
            <AppRouter />
        </div>
    );
};
