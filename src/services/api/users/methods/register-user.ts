import { UserRegister } from "@/@types/UsersTypes";
import { ApiClient } from "../../ApiClient";

export const register = async (data: object): Promise<UserRegister> => {
    const client = ApiClient.getInstance();
    
    const response = await client.post<UserRegister>('users/public-register', data );

    return response;
}
