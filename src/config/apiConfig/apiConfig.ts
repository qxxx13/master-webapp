import axios from 'axios';

export const instance = axios.create({
    baseURL: 'https://initcrm.ru/',
    headers: {
        'Content-Type': 'application/json',
    },
});

/* http://77.91.84.85:5555/api/ */

/* http://localhost:5555/api/ */
