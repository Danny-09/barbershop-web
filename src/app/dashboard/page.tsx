'use client';

import { useState } from 'react';
import { CalendarIcon, XCircleIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

export default function DashboardCitas() {
  const [month, setMonth] = useState(new Date().getMonth() + 1);

  return (
    <div className="p-4 md:p-8">
      <h1 className="text-2xl md:text-3xl font-bold mb-4">Dashboard de Citas</h1>

      <div className="bg-white shadow-md rounded-lg p-4 md:p-6 mb-6 transition transform hover:scale-105">
        <h2 className="text-lg md:text-xl font-semibold mb-2">Próxima Cita</h2>
        <div className="flex flex-col md:flex-row items-center justify-between gap-2 md:gap-4">
          <div className="text-center md:text-left">
            <p className="text-base md:text-lg font-bold">Juan Pérez</p>
            <p className="text-gray-600 text-sm md:text-base">Servicio: Corte de Cabello</p>
            <p className="text-gray-600 text-sm md:text-base">Fecha: 04/04/2025</p>
            <p className="text-gray-600 text-sm md:text-base">Hora: 10:00 AM</p>
          </div>
          <CalendarIcon className="h-8 w-8 md:h-12 md:w-12 text-blue-600" />
        </div>
      </div>

      <div className="flex items-center justify-between mb-4">
        <label className="text-base md:text-lg font-semibold">Selecciona el Mes:</label>
        <select
          className="border rounded p-1 md:p-2 text-gray-700 focus:ring-2 focus:ring-blue-500"
          value={month}
          onChange={(e) => setMonth(parseInt(e.target.value))}
        >
          {[...Array(12).keys()].map((m) => (
            <option key={m + 1} value={m + 1}>{new Date(0, m).toLocaleString('es', { month: 'long' })}</option>
          ))}
        </select>
      </div>

      <div className="bg-white shadow-md rounded-lg p-4 md:p-6">
        <h2 className="text-lg md:text-xl font-semibold mb-3">Citas del Día</h2>
        <ul className="space-y-2 md:space-y-4">
          {[1, 2, 3].map((id) => (
            <li key={id} className="flex flex-col md:flex-row items-center justify-between bg-gray-100 p-3 md:p-4 rounded-md">
              <div className="text-center md:text-left">
                <p className="font-semibold">Cliente {id}</p>
                <p className="text-gray-600 text-sm md:text-base">Servicio: Barba</p>
                <p className="text-gray-600 text-sm md:text-base">Hora: 11:00 AM</p>
              </div>
              <div className="flex gap-2 mt-2 md:mt-0">
                <button className="bg-red-500 text-white p-1 md:p-2 rounded-md hover:bg-red-600 flex items-center">
                  <XCircleIcon className="h-4 w-4 md:h-5 md:w-5 mr-1" />Cancelar
                </button>
                <button className="bg-green-500 text-white p-1 md:p-2 rounded-md hover:bg-green-600 flex items-center">
                  <CheckCircleIcon className="h-4 w-4 md:h-5 md:w-5 mr-1" />Finalizar
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
