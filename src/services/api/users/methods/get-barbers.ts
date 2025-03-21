import { Barber } from "@/@types/BarbersTypes";
import { ApiClient } from "../../ApiClient";

export const getBarbers = async (token: string) => {
    const client = ApiClient.getInstance();
   
    const response = await client.get('users/barbers',{
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    
    console.log(response);

    return response;
}
