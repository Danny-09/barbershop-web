'use client';

import { useState, useEffect } from 'react';
import Notiflix from 'notiflix';

interface ServiceData {
    name: string;
    description: string;
    price: number;
    status: boolean;
}

interface CreateServiceModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: ServiceData) => void;
    initialData?: ServiceData;
}

export default function CreateServiceModal({ isOpen, onClose, onSubmit, initialData }: CreateServiceModalProps) {
    const [name, setName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [price, setPrice] = useState<number>(0);
    const [status, setStatus] = useState<boolean>(true);

    useEffect(() => {
        if (isOpen) {
            if (initialData) {
                setName(initialData.name);
                setDescription(initialData.description);
                setPrice(initialData.price);
                setStatus(initialData.status);
            } else {
                setName('');
                setDescription('');
                setPrice(0);
                setStatus(true);
            }
        }
    }, [isOpen, initialData]);

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim() || !description.trim() || price <= 0) {
            Notiflix.Notify.failure("Todos los campos son obligatorios y el precio debe ser mayor a cero.");
            return;
        }
        onSubmit({ name, description, price, status });
        onClose();
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4">
                    {initialData ? 'Editar Servicio' : 'Crear Servicio'}
                </h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-gray-700 mb-2">Nombre</label>
                        <input
                            id="name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full border border-gray-300 p-2 rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="description" className="block text-gray-700 mb-2">Descripción</label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full border border-gray-300 p-2 rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="price" className="block text-gray-700 mb-2">Precio</label>
                        <input
                            id="price"
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(parseFloat(e.target.value))}
                            className="w-full border border-gray-300 p-2 rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="status" className="block text-gray-700 mb-2">Estado</label>
                        <select
                            id="status"
                            value={status ? 'Activo' : 'Inactivo'}
                            onChange={(e) => setStatus(e.target.value === 'Activo')}
                            className="w-full border border-gray-300 p-2 rounded"
                        >
                            <option value="Activo">Activo</option>
                            <option value="Inactivo">Inactivo</option>
                        </select>
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
