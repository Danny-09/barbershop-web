import { BarberSchedules } from "@/@types/ScheduleTypes";
import { ApiClient } from "../../ApiClient";

export const deleteSchedule = async (token: string, id: number): Promise<BarberSchedules> => {
    const client = ApiClient.getInstance();

    const response = await client.delete<BarberSchedules>(
        `/schedules/${id}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
    
    return response;
};
