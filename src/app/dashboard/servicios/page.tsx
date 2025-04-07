'use client';

import { Service } from "@/@types/ServicesTypes";
import ServiceModal from "@/components/modals/services/ModalCreateEdit";
import { useServices } from "@/hooks/services/useServices";
import { Cog6ToothIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { ArrowsRightLeftIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

const Services = () => {
  const { services, handleSubmit, handleChangeStatus } = useServices();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const handleCreate = () => {
    setSelectedService(null);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setSelectedService(null);
    setIsModalOpen(false);
  };

  const handleEdit = (service: Service) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  return (
    <main className="p-8 text-gray-800 bg-white">
      <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4">
        <h1 className="text-3xl font-bold text-gray-800">Mis servicios</h1>
        <button
          onClick={handleCreate}
          className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition-transform transform hover:scale-105"
        >
          <span>Crear Servicio</span>
          <Cog6ToothIcon className="w-6 h-6" />
        </button>
      </div>

      {services.length > 0 ? (
        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {services.map((item) => (
            <div
              key={item.id}
              className="bg-white p-6 rounded-3xl shadow-md border border-gray-200 hover:shadow-xl transform transition-all duration-300 hover:-translate-y-1"
            >
              <h2 className="text-2xl font-semibold mb-2 text-gray-900">{item.name}</h2>
              <div className="text-gray-700 space-y-3">
                <p>
                  <span className="font-bold">Descripción:</span> {item.description}
                </p>
                <p>
                  <span className="font-bold">Precio:</span> $ {item.price}
                </p>
                <p>
                  <span className="font-bold">Estatus:</span>
                  <span
                    className={`inline-block px-3 py-1 ml-2 rounded-full text-sm font-semibold ${item.status ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                      }`}
                  >
                    {item.status ? "Activo" : "Inactivo"}
                  </span>
                </p>
              </div>
              <div className="flex justify-end mt-6 space-x-2">
                <button
                  onClick={() => handleEdit(item)}
                  className="flex items-center gap-1 bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-transform transform hover:scale-105"
                >
                  <PencilIcon className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleChangeStatus(item, item.status ? 'disable' : 'enable', item.status ? 'Desactivar' : 'Activar')}
                  className="flex items-center gap-1 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-transform transform hover:scale-105"
                >
                  <ArrowsRightLeftIcon className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-lg">No hay servicios creados.</p>
      )}

      {/* Modal para crear o editar servicio */}
      <ServiceModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSubmit={(data) => handleSubmit(data, selectedService)}
        initialData={selectedService ? selectedService : undefined}
      />
    </main>
  );
}

export default Services;
