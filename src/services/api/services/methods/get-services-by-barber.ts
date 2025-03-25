import { ApiClient } from "../../ApiClient";
import { ServicesResponse } from "../models/ServicesResponse";
let count  = 0;
export const getServicesByBarber = async (barberId: number, token: string): Promise<Service[]> => {
    const client = ApiClient.getInstance();
   
    const response = await client.get<ServicesResponse>(`services/`, {
        params: {
            barber_id: barberId
        },
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    
    return response.items;
}
