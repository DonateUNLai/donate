import axios from 'axios';

const request = axios.create({
    baseURL: process.env.NEXT_PUBLIC_AXIOS_BASE_URL,
    withCredentials: true,
    timeout: 1000 * 60,
    headers: {
        get: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
        },
        post: {
            'Content-Type': 'application/json;charset=utf-8'
        }
    }
});

request.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.authorization = `Bearer ${token}`;
            return config;
        }
        return config;
    },
    error => Promise.reject(error)
)

export {
    request
}