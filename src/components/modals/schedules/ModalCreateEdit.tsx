'use client';

import { BarberSchedules } from '@/@types/ScheduleTypes';
import { useState, useEffect } from 'react';

interface Data {
    day: string;
    start_time: string;
    end_time: string
}

interface CreateScheduleModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: Data) => void;
    initialData?: BarberSchedules; 
}

export default function CreateScheduleModal({ isOpen, onClose, onSubmit, initialData }: CreateScheduleModalProps) {
    const [day, setDay] = useState<string>('');
    const [start_time, setstart_time] = useState<string>('');
    const [end_time, setend_time] = useState<string>('');

    // Cargar datos iniciales si están presentes (para modo edición) o limpiar cuando se cierre el modal
    useEffect(() => {
        if (isOpen) {
            if (initialData) {
                setDay(initialData.day);
                setstart_time(initialData.start_time);
                setend_time(initialData.end_time);
            } else {
                setDay('');
                setstart_time('');
                setend_time('');
            }
        }
    }, [isOpen, initialData]);

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({ day, start_time, end_time });
        onClose(); // Cerrar el modal al enviar
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4">
                    {initialData ? 'Editar Horario' : 'Crear Horario'}
                </h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="day" className="block text-gray-700 mb-2">
                            Día
                        </label>
                        <select
                            id="day"
                            value={day}
                            disabled={!!initialData}
                            onChange={(e) => setDay(e.target.value)}
                            className="w-full border border-gray-300 p-2 rounded"
                        >
                            <option value="">Selecciona un día</option>
                            <option value="lunes">Lunes</option>
                            <option value="martes">Martes</option>
                            <option value="miércoles">Miércoles</option>
                            <option value="jueves">Jueves</option>
                            <option value="viernes">Viernes</option>
                            <option value="sábado">Sábado</option>
                            <option value="domingo">Domingo</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="start_time" className="block text-gray-700 mb-2">
                            Hora de Inicio
                        </label>
                        <input
                            id="start_time"
                            type="time"
                            value={start_time}
                            onChange={(e) => setstart_time(e.target.value)}
                            className="w-full border border-gray-300 p-2 rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="end_time" className="block text-gray-700 mb-2">
                            Hora de Fin
                        </label>
                        <input
                            id="end_time"
                            type="time"
                            value={end_time}
                            onChange={(e) => setend_time(e.target.value)}
                            className="w-full border border-gray-300 p-2 rounded"
                        />
                    </div>
                    <div className="flex justify-end gap-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                        >
                            {initialData ? 'Actualizar' : 'Crear'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
