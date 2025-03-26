import { BarbersList } from "@/@types/UsersTypes";
import { ApiClient } from "../../ApiClient";

export const getBarbers = async (token: string): Promise<BarbersList[]> => {
    const client = ApiClient.getInstance();
   
    const response = await client.get<BarbersList[]>('users/barbers',{
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    
    return response;
}
