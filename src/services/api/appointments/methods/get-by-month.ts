import { AppointmentsByMonthList } from "@/@types/AppointmentsTypes";
import { ApiClient } from "../../ApiClient";

export const barberSchedules = async (month: number, year: number, barber_id: number, token: string): Promise<AppointmentsByMonthList> => {
  const client = ApiClient.getInstance();

  const response = await client.get<AppointmentsByMonthList>(
    `/appointments/${month}/${year}/${barber_id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response;
};
