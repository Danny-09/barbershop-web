import { Id } from "@/@types/UsersTypes";
import { ApiClient } from "../../ApiClient";

export const getUserId = async (token: string, email: string): Promise<Id> => {
    const client = ApiClient.getInstance();

    const response = await client.get<Id>(`users/by-email/${email}`,{
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response;
}
