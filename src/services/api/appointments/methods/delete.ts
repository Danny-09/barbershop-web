import { ApiClient } from "../../ApiClient";

export const deleteAppointment = async (id: number, token: string): Promise<any> => {
    const client = ApiClient.getInstance();

    // cambiar a tipado response mas adelante 
    const response = await client.delete<any>(`/appointments/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });


    return response;
};
