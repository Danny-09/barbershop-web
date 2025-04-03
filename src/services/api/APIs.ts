import { barberSchedules } from "./appointments/methods/get-by-month";
import { getBarbers } from "./users/methods/get-barbers";
import { getServicesByBarber } from "./services/methods/get-by-barber";
import { register } from "./users/methods/register-user";
import { getByBarber } from "./schedules/methods/get-by-barber";
import { create } from "./appointments/methods/create";
import { userAppointments } from "./appointments/methods/get-by-user";
import { changeStatusAppointment } from "./appointments/methods/change-status";
import { deleteAppointment } from "./appointments/methods/delete";
import { getUserId } from "./users/methods/get-id";
import { createSchedule } from "./schedules/methods/create";
import { updateSchedule } from "./schedules/methods/update";
import { deleteSchedule } from "./schedules/methods/delete";

export const APIs = {
    appointments: {
        create,
        changeStatusAppointment,
        deleteAppointment,
        barberSchedules,
        userAppointments,
    },
    users: {
        register,
        getBarbers,
        getUserId,
    },
    services: {
        getServicesByBarber
    },
    schedules: {
        createSchedule,
        updateSchedule,
        deleteSchedule,
        getByBarber
    }
}
