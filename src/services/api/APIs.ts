import { barberSchedules } from "./appointments/methods/get-appointments-by-month";
import { getBarbers } from "./users/methods/get-barbers";
import { getServicesByBarber } from "./services/methods/get-services-by-barber";
import { register } from "./users/methods/register-user";

export const APIs = {
    appointments:{
        barberSchedules,
    },
    users:{
        register,
        getBarbers,
    },
    services:{
        getServicesByBarber
    }
}
