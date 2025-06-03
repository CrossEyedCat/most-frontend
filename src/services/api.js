// src/api.js
import axios from 'axios';

const api = axios.create({
    headers: {
        'Content-Type': 'application/json',
    },
});

// Флаг, что сейчас идёт процесс обновления токена
let isRefreshing = false;
// Очередь запросов, ожидающих обновления токена
let failedQueue = [];

const processQueue = (error, token = null) => {
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });
    failedQueue = [];
};

// Добавляем токен к каждому запросу
api.interceptors.request.use(config => {
    const accessToken = localStorage.getItem('authToken');
    if (accessToken) {
        config.headers['Authorization'] = `${localStorage.getItem('authType')} ${accessToken}`;
    }
    return config;
}, err => Promise.reject(err));

// Перехватчик ответов: ловим 401, пробуем рефреш
api.interceptors.response.use(response => response, error => {
    const originalRequest = error.config;

    // Если 401 и это не вызов /auth/refresh
    if (error.response?.status === 401 && !originalRequest._retry) {
        if (isRefreshing) {
            // Если уже обновляем, добавляем в очередь
            return new Promise(function(resolve, reject) {
                failedQueue.push({ resolve, reject });
            }).then(token => {
                originalRequest.headers['Authorization'] = `${localStorage.getItem('authType')} ${token}`;
                return api(originalRequest);
            }).catch(err => Promise.reject(err));
        }

        originalRequest._retry = true;
        isRefreshing = true;

        const refreshToken = localStorage.getItem('refreshToken');
        return new Promise(function(resolve, reject) {
            axios.post('/auth/refresh', { refreshToken })
                .then(({ data }) => {
                    const { type, accessToken, refreshToken: newRefresh, role } = data;
                    // Сохраняем новые токены
                    localStorage.setItem('authType', type);
                    localStorage.setItem('authToken', accessToken);
                    localStorage.setItem('refreshToken', newRefresh);
                    localStorage.setItem('userRole', role);
                    // Обновляем default header
                    api.defaults.headers.common['Authorization'] = `${type} ${accessToken}`;

                    processQueue(null, accessToken);
                    resolve(api(originalRequest));
                })
                .catch(err => {
                    processQueue(err, null);
                    // при неудаче, например, редирект на логин
                    localStorage.clear();
                    window.location.href = '/';
                    reject(err);
                })
                .finally(() => {
                    isRefreshing = false;
                });
        });
    }

    return Promise.reject(error);
});

export default api;
