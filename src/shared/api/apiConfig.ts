import axios from 'axios';

export const instance = axios.create({
    baseURL: 'http://localhost:5555/api/',
    headers: {
        'Content-Type': 'application/json',
    },
});

/* https://initcrm.ru/ */

/* http://localhost:5555/api/ */
