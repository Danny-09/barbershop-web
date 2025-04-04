'use client';

import { BarberSchedules } from '@/@types/ScheduleTypes';
import { useState, useEffect } from 'react';

interface Data {
    day: string;
    start_time: string;
    end_time: string;
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
        onClose();
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-md transform transition-transform duration-300 hover:scale-105">
                <h2 className="text-3xl font-extrabold text-gray-800 mb-6">
                    {initialData ? 'Editar Horario' : 'Crear Horario'}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="day" className="block text-lg font-semibold text-gray-700 mb-2">Día</label>
                        <select
                            id="day"
                            value={day}
                            disabled={!!initialData}
                            onChange={(e) => setDay(e.target.value)}
                            className="w-full border-2 border-gray-300 p-3 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
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
                    <div>
                        <label htmlFor="start_time" className="block text-lg font-semibold text-gray-700 mb-2">Hora de Inicio</label>
                        <input
                            id="start_time"
                            type="time"
                            value={start_time}
                            onChange={(e) => setstart_time(e.target.value)}
                            className="w-full border-2 border-gray-300 p-3 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                        />
                    </div>
                    <div>
                        <label htmlFor="end_time" className="block text-lg font-semibold text-gray-700 mb-2">Hora de Fin</label>
                        <input
                            id="end_time"
                            type="time"
                            value={end_time}
                            onChange={(e) => setend_time(e.target.value)}
                            className="w-full border-2 border-gray-300 p-3 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                        />
                    </div>
                    <div className="flex justify-end gap-3 mt-6">
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-5 rounded-lg transition-transform transform hover:scale-105"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-5 rounded-lg transition-transform transform hover:scale-105"
                        >
                            {initialData ? 'Actualizar' : 'Crear'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
