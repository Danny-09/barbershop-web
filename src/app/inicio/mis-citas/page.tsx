'use client';

import { useState, useEffect } from "react";
import useToken from "@/hooks/useToken";
import { APIs } from "@/services/api/APIs";
import Notiflix from "notiflix";
import { AppointmentsList } from "@/@types/AppointmentsTypes";
import { XMarkIcon } from "@heroicons/react/24/solid";

export default function MyAppointments() {
    const token = useToken();
    const [myAppointments, setmyAppointments] = useState<AppointmentsList>([]);

    useEffect(() => {
        const fetchAppointments = async () => {
            if (token) {
                try {
                    const appointments = await APIs.appointments.userAppointments(token.user.email, token.user.token);
                    setmyAppointments(appointments);
                } catch (error) {
                    console.error("Error al obtener citas:", error);
                }
            }
        };

        fetchAppointments();
    }, [token]);

    const handleCancelAppointment = async (appointmentId: number, token: string, date: string) => {
        Notiflix.Confirm.show(
            "Confirmar Cancelación",
            `¿Estás seguro de que quieres cancelar esta cita ${new Date(date).toLocaleString("es-ES", {
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
            "Sí, cancelar",
            "No",
            async () => {
                Notiflix.Loading.circle();
                try {
                    await APIs.appointments.changeStatusAppointment(appointmentId, 'disable', token);
                    setmyAppointments((prevCitas) => prevCitas.filter((cita) => cita.id !== appointmentId));

                    Notiflix.Loading.remove();
                    Notiflix.Notify.success("Cita cancelada con éxito");
                } catch (error) {
                    Notiflix.Loading.remove();
                    Notiflix.Notify.failure("Error al cancelar la cita");
                    console.error("Error al cancelar cita:", error);
                }
            },
            () => {
                Notiflix.Notify.info("Cancelación abortada");
            }
        );
    };

    if (!token) return <div className="text-black">Cargando citas...</div>;

    return (
        <div className="p-4">
            <h1 className="text-xl font-semibold mb-4 text-black">Mis Citas</h1>
            <div className="overflow-x-auto bg-white shadow-md rounded-lg">
                <table className="min-w-full table-auto text-black">
                    <thead>
                        <tr className="bg-gray-200 text-left text-black">
                            <th className="px-4 py-2 border-b whitespace-nowrap">Barbero</th>
                            <th className="px-4 py-2 border-b whitespace-nowrap">Fecha</th>
                            <th className="px-4 py-2 border-b whitespace-nowrap">Servicio</th>
                            <th className="px-4 py-2 border-b text-center sticky right-0 bg-gray-200 z-10">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="text-black">
                        {myAppointments.length > 0 ? (
                            myAppointments.map((cita) => (
                                <tr key={cita.id} className="border-b hover:bg-gray-50 text-black">
                                    <td className="px-4 py-2">{cita.barber.name}</td>
                                    <td className="px-4 py-2 font-bold text-white">
                                        <p className="px-4 py-2 bg-blue-500 border border-gray-300 rounded-lg">
                                            {new Date(cita.date).toLocaleString("es-ES", {
                                                weekday: "long",
                                                year: "numeric",
                                                month: "long",
                                                day: "numeric",
                                                hour: "2-digit",
                                                minute: "2-digit",
                                                hour12: true,
                                                timeZone: "UTC",
                                            })}
                                        </p>
                                    </td>
                                    <td className="px-4 py-2">{cita.service.name + ' $' + cita.service.price}</td>
                                    <td className="px-4 py-2 text-center sticky right-0 bg-white z-10">
                                        <button
                                            onClick={() => handleCancelAppointment(cita.id, token.user.token, cita.date)}
                                            className="bg-yellow-500 text-white py-1 px-3 rounded-md text-sm mr-2 hover:bg-yellow-600"
                                        >
                                            <XMarkIcon className="w-5 h-5" />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={4} className="px-4 py-2 text-center text-black">No tienes citas programadas.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
