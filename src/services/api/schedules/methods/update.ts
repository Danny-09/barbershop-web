import { BarberSchedules } from "@/@types/ScheduleTypes";
import { ApiClient } from "../../ApiClient";

export const updateSchedule = async (data: object, token: string, id: number): Promise<BarberSchedules> => {
    const client = ApiClient.getInstance();

    const response = await client.patch<BarberSchedules>(
        `/schedules/${id}`,
        data,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
    
    return response;
};
