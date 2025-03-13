import { barberSchedules } from "./appointments/methods/get-appointments-by-month";
import { singIn } from "./auth/methods/login";

export const APIs = {
    auth:{
        singIn,
    },
    appointments:{
        barberSchedules,
    }
}
