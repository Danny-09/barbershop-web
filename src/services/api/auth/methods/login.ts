import { Login } from "@/@types/LoginTypes";
import { ApiClient } from "../../ApiClient";
import { LoginResponse } from "../models/LoginResponse";
import { setCookie } from "nookies";

export const singIn = async (email: string, password: string): Promise<Login> => {
    const client = ApiClient.getInstance();
    const response = await client.post<LoginResponse>('/auth/login', { email, password });

    setCookie(null, 'token', response.token, {
        maxAge: 60 * 60 * 24 * 5,
        path: '/',
    });

    return {
        email: response.email,
        token: response.token,
        role: response.role,
    };
}         
