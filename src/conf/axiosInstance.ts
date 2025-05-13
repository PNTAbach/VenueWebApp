import axios, { AxiosInstance, AxiosError, AxiosResponse } from 'axios';

const url: string = 'http://localhost:8181/';

const createAxiosClient = (): AxiosInstance => {
    const client = axios.create({
        baseURL: url,
        headers: {
            'Content-Type': 'application/json',
        },
        timeout: 60000,
        withCredentials: false,
    });

    // ✅ fix this logic
    client.interceptors.request.use((config) => {
        // 👉 allow login/register requests without token
        const skipAuthEndpoints = ['/auth/authenticate', '/auth/register'];

        if (
            !skipAuthEndpoints.some((path) =>
                config.url?.includes(path)
            )
        ) {
            const token = localStorage.getItem('token');
            if (token) {
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
            }
            return Promise.reject(error);
        }
    );

    return client;
};
export default createAxiosClient;   