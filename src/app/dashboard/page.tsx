'use client';

import { useState } from 'react';
import { CalendarIcon, XCircleIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import { useAppointments } from '@/hooks/appointments/useAppointments';

export default function DashboardCitas() {
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const { todayAppointments, handleStatusAppointment } = useAppointments(month);
  const currentDay = new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'long' });
  const nextAppointment = todayAppointments?.[0];

  return (
    <div className="p-4 md:p-8 bg-white">
      <h1 className="text-black text-2xl md:text-3xl font-bold mb-4">Dashboard de Citas</h1>

      {nextAppointment && (
        <div className="bg-white shadow-md rounded-lg p-6 md:p-8 mb-6 transition transform hover:scale-105">
          <h2 className="text-xl md:text-2xl font-semibold mb-4 text-gray-800">Próxima Cita</h2>
          <div className="bg-white flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left">
              <p className="text-2xl md:text-3xl font-semibold text-gray-900">{nextAppointment.user.name}</p>
              <p className="text-base md:text-lg font-medium text-gray-600 mt-1">Hora:
                <span className="font-semibold text-gray-800 ml-1">
                  {new Date(nextAppointment.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', timeZone: 'UTC' })}
                </span>
              </p>
              <p className="text-base md:text-lg font-medium text-gray-600 mt-1">Servicio:
                <span className="font-semibold text-gray-800 ml-1">
                  {nextAppointment.service.name}
                </span>
              </p>
              <p className="text-base md:text-lg font-medium text-gray-600 mt-1">Precio:
                <span className="font-semibold text-gray-800 ml-1">
                  ${nextAppointment.service.price}
                </span>
              </p>
              <p className="text-base md:text-lg font-medium text-gray-600 mt-1">Fecha:
                <span className="font-semibold text-gray-800 ml-1">
                  {new Date(nextAppointment.date).toLocaleDateString()}
                </span>
              </p>
            </div>
            <CalendarIcon className="h-10 w-10 md:h-12 md:w-12 text-gray-500" />
          </div>
        </div>

      )}

      <div className="flex items-center justify-between mb-4 bg-white">
        <label className="text-black text-base md:text-lg font-semibold">Mes:</label>
        <select
          className="border rounded p-1 md:p-2 text-gray-700 focus:ring-2 focus:ring-blue-500"
          value={month}
          onChange={(e) => setMonth(parseInt(e.target.value))}
          disabled
        >
          {[...Array(12).keys()].map((m) => (
            <option key={m + 1} value={m + 1}>{new Date(0, m).toLocaleString('es', { month: 'long' })}</option>
          ))}
        </select>
      </div>

      <div className="bg-white shadow-md rounded-lg p-4 md:p-6">
        <h2 className="text-lg md:text-xl font-semibold mb-3">
          <span className="text-black">{currentDay}</span> <br />
          <span className="text-black">Citas del Día</span>
        </h2>

        {todayAppointments?.length > 0 ? (
          <ul className="space-y-2 md:space-y-4">
            {todayAppointments.map((appointment) => (
              <li key={appointment.id} className="flex flex-col md:flex-row items-center justify-between bg-gray-100 p-3 md:p-4 rounded-md">
                <div className="text-center md:text-left">
                  <p className="font-semibold">{appointment.user.name}</p>
                  <p className="text-gray-600 text-sm md:text-base">Servicio: {appointment.service.name}</p>
                  <p className="text-gray-600 text-sm md:text-base">
                    Hora: {new Date(appointment.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', timeZone: 'UTC' })}
                  </p>
                  <p className="text-base md:text-lg font-medium text-gray-600 mt-1">Fecha:
                    <span className="text-gray-800 ml-1">
                      {new Date(appointment.date).toLocaleDateString()}
                    </span>
                  </p>
                </div>
                <div className="flex gap-2 mt-2 md:mt-0">
                  <button
                    onClick={() => handleStatusAppointment(appointment.id, appointment.date, 'disable', 'Cancelar')}
                    className="bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600 transition-all duration-300 flex items-center gap-2 shadow-md">
                    <XCircleIcon className="h-5 w-5" />
                    <span className="font-medium">Cancelar</span>
                  </button>

                  <button
                    onClick={() => handleStatusAppointment(appointment.id, appointment.date, 'endend', 'Finalizar')}
                    className="bg-green-500 text-white px-3 py-2 rounded-lg hover:bg-green-600 transition-all duration-300 flex items-center gap-2 shadow-md">
                    <CheckCircleIcon className="h-5 w-5" />
                    <span className="font-medium">Finalizar</span>
                  </button>

                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 text-center py-4">No hay citas para el día de hoy.</p>
        )}
      </div>

    </div>
  );
}
