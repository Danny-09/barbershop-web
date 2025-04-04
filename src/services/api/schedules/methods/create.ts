import { BarberSchedules } from "@/@types/ScheduleTypes";
import { ApiClient } from "../../ApiClient";

export const createSchedule = async (data: object, token: string): Promise<BarberSchedules> => {
    const client = ApiClient.getInstance();

    const response = await client.post<BarberSchedules>(
        `/schedules`,
        data,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response;
};
