import axios, { AxiosRequestConfig } from 'axios';
import { store } from 'store/appstore';

const apiBaseUrl = 'http://localhost:9300';

const axiosConfig: AxiosRequestConfig = {
    baseURL: apiBaseUrl,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
    responseType: 'json',
};

export const unauthenticatedApiClient = axios.create(axiosConfig);
export const apiClient = axios.create(axiosConfig);

apiClient.interceptors.request.use(async config => {
    try {
        const token = store.getState().auth.tokens.access;
        config.headers.Authorization = `Bearer ${token}`;
    } catch (err) {}
    return Promise.resolve(config);
});
