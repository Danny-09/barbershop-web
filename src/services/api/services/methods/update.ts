import { BarberSchedules } from "@/@types/ScheduleTypes";
import { ApiClient } from "../../ApiClient";
import { CreateService, ResponseCreateService, Service } from "@/@types/ServicesTypes";

export const updateService = async (data: CreateService, token: string, id: number): Promise<ResponseCreateService> => {
    const client = ApiClient.getInstance();

    const response = await client.patch<ResponseCreateService>(
        `/services/${id}`,
        data,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
    
    return response;
};
