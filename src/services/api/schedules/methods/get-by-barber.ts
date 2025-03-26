import { ApiClient } from "../../ApiClient";

export const getByBarber = async (barberId: number, token: string): Promise<any[]> => {
    const client = ApiClient.getInstance();
   
    const response = await client.get<any>(`schedules/${barberId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    
    return response;
}
