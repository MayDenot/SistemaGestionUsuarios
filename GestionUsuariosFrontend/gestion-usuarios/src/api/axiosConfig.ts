import axios from 'axios'
import {getGlobalSetLoading} from "../store/loadingStore.ts";
import type { InternalAxiosRequestConfig } from "axios";

export interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
    skipGlobalLoading?: boolean;
}

const api = axios.create({
    baseURL: "http://localhost:8080/api",
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("accessToken")
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config;
});

api.interceptors.request.use(
    (config: CustomAxiosRequestConfig) => {
        if (!config.skipGlobalLoading) {
            getGlobalSetLoading()?.(true);
        }
        return config;
    }
);

api.interceptors.response.use(
    (response) => {
        const config =
            response.config as CustomAxiosRequestConfig;

        if (!config.skipGlobalLoading) {
            getGlobalSetLoading()?.(false);
        }

        return response;
    },

    (error) => {
        const config =
            error.config as CustomAxiosRequestConfig;

        if (!config?.skipGlobalLoading) {
            getGlobalSetLoading()?.(false);
        }

        return Promise.reject(error);
    }
);
export default api;