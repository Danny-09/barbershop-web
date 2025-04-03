import { ApiClient } from "../../ApiClient";
import { CreateService, ResponseCreateService, } from "@/@types/ServicesTypes";

export const createService = async (data: CreateService, token: string): Promise<ResponseCreateService> => {
    const client = ApiClient.getInstance();

    const response = await client.post<ResponseCreateService>(
        `/services`,
        data,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response;
};
