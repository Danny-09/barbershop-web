"use client";

import { XMarkIcon, CalendarIcon, ClockIcon } from "@heroicons/react/24/solid";
import { useAppointments } from "@/hooks/appointments/useAppointments";
import { useEffect } from "react";

export default function MyAppointments() {
    const { myAppointments, getUserAppointments, handleStatusAppointment } = useAppointments(0);

    useEffect(() => {
        getUserAppointments();
    },[myAppointments]);

    if (myAppointments.length === 0) return <div className="text-black text-center py-4">Cargando citas...</div>;

    return (
        <div className="p-4">
            <h1 className="text-xl font-semibold mb-4 text-black text-center">Mis Citas</h1>

            {myAppointments.length > 0 ? (
                <div className="space-y-4">
                    {myAppointments.map((cita) => {
                        const fechaUTC = new Date(cita.date);

                        const horaFormateada = fechaUTC.toLocaleTimeString("es-ES", {
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: true,
                            timeZone: "UTC",

                        });

                        const fechaFormateada = fechaUTC.toLocaleDateString("es-ES", {
                            weekday: "long",
                            day: "2-digit",
                            month: "long",
                            year: "numeric",
                        });

                        return (
                            <div key={cita.id} className="bg-white shadow-lg rounded-lg p-4 flex flex-col relative">
                                <div className="flex items-center space-x-4">
                                    <div className="flex-1">
                                        <h2 className="text-lg font-semibold text-gray-900">Barbero: {cita.barber.name}</h2>

                                        <div className="flex items-center space-x-2 bg-blue-100 text-blue-900 px-3 py-1 rounded-lg w-fit mt-2 shadow-sm">
                                            <CalendarIcon className="w-5 h-5 text-blue-600" />
                                            <span className="text-sm font-bold">{fechaFormateada}</span>
                                        </div>

                                        <div className="flex items-center space-x-2 bg-gray-100 text-gray-900 px-3 py-1 rounded-lg w-fit mt-2 shadow-sm">
                                            <ClockIcon className="w-5 h-5 text-gray-600" />
                                            <span className="text-sm font-bold">{horaFormateada}</span>
                                        </div>

                                        <div className="mt-2 inline-flex items-center px-4 py-1 bg-green-200 text-green-800 rounded-full text-sm font-bold shadow-md">
                                            <span>{cita.service.name} - ${cita.service.price}</span>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => handleStatusAppointment(cita.id, cita.date, 'disable', 'Cancelar')}
                                        className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-all"
                                        title="Cancelar cita"
                                    >
                                        <XMarkIcon className="w-6 h-6" />
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <div className="text-center text-gray-600 mt-6">No tienes citas programadas.</div>
            )}
        </div>
    );
}
