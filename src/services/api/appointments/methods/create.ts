import { CreateAppointment } from "@/@types/AppointmentsTypes";
import { ApiClient } from "../../ApiClient";

export const create = async (data: any, token: string): Promise<CreateAppointment> => {
  const client = ApiClient.getInstance();

  const response = await client.post<any>(
    `/appointments`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response;
};
