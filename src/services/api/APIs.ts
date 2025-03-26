import { barberSchedules } from "./appointments/methods/get-appointments-by-month";
import { getBarbers } from "./users/methods/get-barbers";
import { getServicesByBarber } from "./services/methods/get-services-by-barber";
import { register } from "./users/methods/register-user";
import { getByBarber } from "./schedules/methods/get-by-barber";
import { create } from "./appointments/methods/create";

export const APIs = {
    appointments: {
        barberSchedules,
        create,
    },
    users: {
        register,
        getBarbers,
    },
    services: {
        getServicesByBarber
    },
    schedules: {
        getByBarber
    }
}
