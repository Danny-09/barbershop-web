import { DeleteAppointment } from "@/@types/AppointmentsTypes";
import { ApiClient } from "../../ApiClient";

export const deleteAppointment = async (id: number, token: string): Promise<DeleteAppointment> => {
    const client = ApiClient.getInstance();

    const response = await client.delete<DeleteAppointment>(`/appointments/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });


    return response;
};
