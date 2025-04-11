import { APIs } from "@/services/api/APIs";
import useToken from "../useToken";
import { useEffect, useState } from "react";
import { AppointmentsByMonthList, AppointmentsList } from "@/@types/AppointmentsTypes";
import Notiflix from "notiflix";
import { BarberSchedules } from "@/@types/ScheduleTypes";
import { get } from "http";

export const useAppointments = (month: number) => {
    const token = useToken();
    const [currentDate, setCurrentDate] = useState(new Date());
    const [appointments, setAppointments] = useState<AppointmentsByMonthList>([]);
    const [todayAppointments, setTodayAppointments] = useState<AppointmentsByMonthList>([]);
    const [myAppointments, setMyAppointments] = useState<AppointmentsList>([]);
    const [scheduleTimes, setScheduleTimes] = useState<BarberSchedules[]>([]);

    const getAppointments = async () => {
        try {
            if (!token) return;

            const user = await APIs.users.getUserId(token?.user.token, token?.user.email);

            const year = currentDate.getUTCFullYear();

            const appointments = await APIs.appointments.barberSchedules(month, year, user.id, token.user.token);
            // Obtener la fecha actual en UTC (YYYY-MM-DD)
            const today = new Intl.DateTimeFormat('sv-SE', {
                timeZone: 'America/Hermosillo'
            }).format(new Date());

            // Filtrar las citas del día actual comparando con la fecha UTC (sin hora)
            const filteredTodayAppointments = appointments.filter(appointment => {
                // Convertir la fecha de la cita a UTC y comparar solo la parte de la fecha (sin la hora)
                const appointmentDate = new Date(appointment.date).toISOString().split('T')[0];
                return appointmentDate === today;
            });

            setAppointments(appointments);
            setTodayAppointments(filteredTodayAppointments);

        } catch (error: any) {
            Notiflix.Notify.failure(error.message);
        }
    };

    const getUserAppointments = async () => {
        try {
            if (!token) return;
            const appointments = await APIs.appointments.userAppointments(token.user.email, token.user.token);
            setMyAppointments(appointments);
        } catch (error: any) {
            Notiflix.Notify.failure(error.message);
        }

    };

    const getBarberSchedules = async () => {
        try {
            if (!token) return;
            const user = await APIs.users.getUserId(token?.user.token, token?.user.email);
            const times = await APIs.schedules.getByBarber(user.id, token.user.token);
            setScheduleTimes(times);
        } catch (error: any) {
            Notiflix.Notify.failure(error.message);
        }

    };

    const handleStatusAppointment = async (appointmentId: number, date: string, action: string, message: string) => {
        Notiflix.Confirm.show(
            "Confirmar acción",
            `¿Estás seguro de que quieres ${message} esta cita:  ${new Date(date).toLocaleString("es-ES", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
                timeZone: "UTC",
            })
            }?`,
            `Sí, ${message}`,
            "No",
            async () => {
                Notiflix.Loading.circle();
                try {
                    if (!token) return;
                    await APIs.appointments.changeStatusAppointment(appointmentId, action, token.user.token);
                    setAppointments((prevCitas) => prevCitas.filter((cita) => cita.id !== appointmentId));
                    setTodayAppointments((prevCitas) => prevCitas.filter((cita) => cita.id !== appointmentId));

                    Notiflix.Loading.remove();
                    Notiflix.Notify.success(`${message} cita, realizado con éxito`);
                } catch (error) {
                    Notiflix.Loading.remove();
                    Notiflix.Notify.failure("Error al realizar la accion");
                }
            }
        );
    };

    useEffect(() => {
        getAppointments();
        getUserAppointments();
        getBarberSchedules();
    }, [token, currentDate, month]);

    return { appointments, todayAppointments, myAppointments, scheduleTimes, getUserAppointments, handleStatusAppointment };
};
