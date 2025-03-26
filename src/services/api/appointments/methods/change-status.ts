import { ApiClient } from "../../ApiClient";

export const changeStatusAppointment = async (id: number, action: string, token: string): Promise<any> => {
    const client = ApiClient.getInstance();

    const response = await client.patch<any>(
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
