import axios from 'axios';

export const instance = axios.create({
    baseURL: 'http://77.91.84.85:5555/api/',
    headers: {
        'Content-Type': 'application/json',
    },
});

/* http://77.91.84.85:5555/api/ */

/* http://localhost:5555/api/ */
