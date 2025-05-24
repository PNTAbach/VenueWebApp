import axios, { AxiosInstance, AxiosError, AxiosResponse } from 'axios';

const url: string =
    process.env.REACT_APP_BACKEND_URL || 'http://localhost:8181';
// process.env.REACT_APP_BACKEND_URL || || 'http://localhost:8080'
const createAxiosClient = (): AxiosInstance => {
    const client = axios.create({
        baseURL: url,
        headers: {
            'Content-Type': 'application/json',
        },
        timeout: 60000,
        withCredentials: false,
    });

    client.interceptors.request.use((config) => {
        const skipAuthEndpoints = ['/auth/authenticate', '/auth/register'];

        const isAuthEndpoint = skipAuthEndpoints.some((path) =>
            config.url?.includes(path)
        );

        if (!isAuthEndpoint) {
            const token = localStorage.getItem('token');
            if (token && config.headers) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }

        return config;
    });

    client.interceptors.response.use(
        (response) => response,
        (error) => {
            if (error.response?.status === 401) {
                localStorage.removeItem('token');
                window.location.href = '/login';
            }
            return Promise.reject(error);
        }
    );

    return client;
};

export default createAxiosClient;
