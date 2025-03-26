import { ApiClient } from "../../ApiClient";

export const register = async (data: any) => {
    const client = ApiClient.getInstance();
    
    const response = await client.post<any>('users/public-register', data );

    return response;
}
