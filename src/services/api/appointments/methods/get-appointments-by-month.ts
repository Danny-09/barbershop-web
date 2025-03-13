import { ApiClient } from "../../ApiClient";
import { parseCookies } from 'nookies';

export const barberSchedules = async (month: number, year: number, barber_id: number): Promise<any> => {
  const client = ApiClient.getInstance();

  const cookies = parseCookies(); // esto funciona en cliente o servidor
  const token = cookies.token; // asegúrate de que así se llame tu cookie

  const response = await client.get<any>(
    `/appointments/${month}/${year}/${barber_id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response;
};
