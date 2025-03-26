import { AppointmentsList } from "@/@types/AppointmentsTypes";
import { ApiClient } from "../../ApiClient";

export const userAppointments = async (email: string, token: string): Promise<AppointmentsList> => {
    const client = ApiClient.getInstance();

    // cambiar a tipado response mas adelante 
    const response = await client.get<AppointmentsList>(
        `/appointments/${email}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response;
};
