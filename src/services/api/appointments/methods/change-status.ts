import { AppointmentsByMonthList } from "@/@types/AppointmentsTypes";
import { ApiClient } from "../../ApiClient";

export const changeStatusAppointment = async (id: number, action: string, token: string): Promise<AppointmentsByMonthList> => {
    const client = ApiClient.getInstance();

    const response = await client.patch<AppointmentsByMonthList>(
        `/appointments/${action}/${id}`,
        {},
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response;
};
