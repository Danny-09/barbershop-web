'use client';

import { useState } from "react";
import { BarberSchedules } from "@/@types/ScheduleTypes";
import CreateScheduleModal from "@/components/modals/schedules/ModalCreateEdit";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import { useSchedules } from "@/hooks/schedules/useSchedules";
import { CalendarIcon } from "@heroicons/react/24/outline";

export default function Schedules() {
  const { schedules, handleSubmit, handleDelete } = useSchedules();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState<BarberSchedules | null>(null);

  const handleCreate = () => {
    setSelectedSchedule(null);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setSelectedSchedule(null);
    setIsModalOpen(false);
  };

  const handleEdit = (schedule: BarberSchedules) => {
    setSelectedSchedule(schedule);
    setIsModalOpen(true);
  };

  return (
    <main className="p-6 text-gray-800">
      <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-2">
        <h1 className="text-3xl font-bold text-gray-800">Gestión de Horarios</h1>
        <button
          onClick={handleCreate}
          className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition-transform transform hover:scale-105"
        >
          <span>Crear Horario</span>
          <CalendarIcon className="w-5 h-5" />
        </button>
      </div>

      {schedules.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {schedules.map((item) => (
            <div
              key={item.id}
              className="bg-white p-6 rounded-3xl shadow-md border border-gray-200 hover:shadow-xl transform transition-all duration-300 hover:-translate-y-1">

              <h2 className="text-2xl font-semibold mb-4 text-gray-900">{item.day}</h2>
              <div className="text-gray-600 space-y-2">
                <p>
                  <span className="font-bold">Inicio:</span> {item.start_time}
                </p>
                <p>
                  <span className="font-bold">Fin:</span> {item.end_time}
                </p>
              </div>
              <div className="flex justify-end mt-6 space-x-2">
                <button
                  onClick={() => handleEdit(item)}
                  className="flex items-center gap-1 bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-transform transform hover:scale-105"
                >
                  <PencilIcon className="w-5 h-7" />
                </button>
                <button
                  onClick={() => handleDelete(item)}
                   className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-transform transform hover:scale-105"
                >
                  <TrashIcon className="w-5 h-7" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600">No hay horarios creados.</p>
      )}

      {/* Modal para crear o editar horario */}
      <CreateScheduleModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSubmit={(data) => handleSubmit(data, selectedSchedule)}
        initialData={selectedSchedule ? selectedSchedule : undefined}
      />
    </main>
  );
}
