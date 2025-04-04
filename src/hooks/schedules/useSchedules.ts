
import { useEffect, useState } from "react";
import useToken from "../useToken";
import { BarberSchedules } from "@/@types/ScheduleTypes";
import { APIs } from "@/services/api/APIs";
import Notiflix from "notiflix";

interface Data {
    barber_id?: number;
    day: string;
    start_time: string;
    end_time: string
}

export const useSchedules = () => {
    const token = useToken();
    const [schedules, setSchedules] = useState<BarberSchedules[]>([]);


    const getSchedules = async () => {
        try {
            if (!token) return;
            const user = await APIs.users.getUserId(token?.user.token, token?.user.email);
            const data = await APIs.schedules.getByBarber(user.id, token.user.token)

            setSchedules(data);
        } catch (error: any) {
            Notiflix.Notify.failure(error.message);
        }
    }

    const handleSubmit = async (data: Data, selectedSchedule: BarberSchedules | null) => {
        try {
            if (!token) return;
            if (selectedSchedule) {
                // Editar horario existente
                const updatedSchedule = await APIs.schedules.updateSchedule(
                    data,
                    token.user.token,
                    selectedSchedule.id!,
                );
                // Actualizar el horario en el estado
                setSchedules((prev) => prev.map(sch => sch.id === updatedSchedule.id ? updatedSchedule : sch));
                Notiflix.Notify.success("Horario actualizado exitosamente!");
            } else {
                // Crear nuevo horario
                const user = await APIs.users.getUserId(token?.user.token, token?.user.email);

                data.barber_id = user.id;

                const newSchedule = await APIs.schedules.createSchedule(
                    data,
                    token.user.token
                );
                setSchedules((prev) => [...prev, newSchedule]);
                Notiflix.Notify.success("Horario creado exitosamente!");
            }

        } catch (error: any) {
            const fail = error.response.data.message;

            if (error.status == 400) {
                Notiflix.Notify.failure(fail[0]);
            } else if (error.status == 409) {
                Notiflix.Notify.failure(fail);
            } else {
                Notiflix.Notify.failure(error.message);
            }
        }
    };

    const handleDelete = (schedule: BarberSchedules) => {
        Notiflix.Confirm.show(
            "Confirmar eliminación",
            `¿Estás seguro de eliminar el horario ${schedule.day}?`,
            "Sí, eliminar",
            "Cancelar",
            async () => {
                try {
                    if (!token) return;
                    await APIs.schedules.deleteSchedule(token?.user.token, schedule.id);
                    setSchedules((prev) => prev.filter((sch) => sch.id !== schedule.id));
                    Notiflix.Notify.success("Horario eliminado con éxito");
                } catch (error) {
                    Notiflix.Notify.failure("Error al eliminar el horario");
                    console.error(error);
                }
            },
            () => {
                Notiflix.Notify.info("Eliminación cancelada");
            }
        );
    };

    useEffect(() => {
        getSchedules();
    }, [token]);

    return { schedules, getSchedules, handleSubmit, handleDelete }
};
