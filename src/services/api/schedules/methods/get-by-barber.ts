import { BarberSchedules } from "@/@types/ScheduleTypes";
import { ApiClient } from "../../ApiClient";

export const getByBarber = async (barberId: number, token: string): Promise<BarberSchedules> => {
    const client = ApiClient.getInstance();
   
    const response = await client.get<BarberSchedules>(`schedules/${barberId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    
    return response;
}
