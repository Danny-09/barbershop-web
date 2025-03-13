import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { Config } from '@/config/config';

export class ApiClient {
    private static instance: ApiClient;
    private axiosInstance: AxiosInstance;

    private constructor(token?: string) {
        this.axiosInstance = axios.create({
            baseURL: Config.API_URL,
            headers: token
                ? { Authorization: `Bearer ${token}` }
                : {},
        });
    }

    public static getInstance(token?: string): ApiClient {
        if (!ApiClient.instance || token) {
            ApiClient.instance = new ApiClient(token);
        }
        return ApiClient.instance;
    }

    public async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
        const res = await this.axiosInstance.get<T>(url, config);
        return res.data;
    }

    public async post<T>(url: string, data: any, config?: AxiosRequestConfig): Promise<T> {
        const res = await this.axiosInstance.post<T>(url, data, config);
        return res.data;
    }

    public async patch<T>(url: string, data: any, config?: AxiosRequestConfig): Promise<T> {
        const res = await this.axiosInstance.patch<T>(url, data, config);
        return res.data;
    }

    public async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
        const res = await this.axiosInstance.delete<T>(url, config);
        return res.data;
    }
}
