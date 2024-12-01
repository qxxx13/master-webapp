import axios from 'axios';

export const instance = axios.create({
    baseURL: 'https://initcrm.ru/',
    headers: {
        'Content-Type': 'application/json',
    },
});

/* https://initcrm.ru/ */

/* http://localhost:5555/api/ */
