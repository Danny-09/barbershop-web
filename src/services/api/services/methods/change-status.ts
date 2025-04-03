import { ApiClient } from "../../ApiClient";
import { Service } from "@/@types/ServicesTypes";

export const changeStatusService = async (id: number, action: string, token: string): Promise<Service> => {
    const client = ApiClient.getInstance();

    const response = await client.patch<Service>(
        `/services/${action}/${id}`,
        {},
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response;
};
