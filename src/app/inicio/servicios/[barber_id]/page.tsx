'use client';

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { APIs } from "@/services/api/APIs";
import useToken from "@/hooks/useToken";
import Link from "next/link";
import { Service } from "@/@types/ServicesTypes";

export default function ServicesPage() {
    const { barber_id } = useParams();
    sessionStorage.setItem('bs', String(barber_id));
    const [services, setServices] = useState<Service[]>([]);
    const [selectedService, setSelectedService] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);
    const token = useToken();

    useEffect(() => {
        if (!barber_id || !token) return;

        const fetchServices = async () => {
            try {
                const data = await APIs.services.getServicesByBarber(Number(barber_id), token.user.token);
                setServices(data.items);
            } catch (error) {
                console.error("Error fetching services:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchServices();
    }, [token, barber_id]);

    if (loading) return <p className="text-center text-lg font-semibold">Cargando servicios...</p>;

    return (
        <div className="p-4">
            <h1 className="text-3xl md:text-4xl lg:text-4xl text-black font-bold mb-4">
                Para agendar tu cita elige un servicio!
            </h1>
            <p className="text-lg text-gray-600 mb-4">
                Selecciona el <b>servicio</b> que mejor se ajuste a tus necesidades.
            </p>

            {services.length > 0 ? (
                <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {services.map((service) => (
                        <div
                            key={service.id}
                            className={`bg-white p-4 rounded-lg shadow hover:shadow-md transition cursor-pointer border-2 ${selectedService === service.id ? "border-blue-700 bg-blue-300" : "border-gray-200"
                                }`}
                            onClick={() => setSelectedService(service.id)}
                        >
                            <h2 className="text-xl font-bold">{service.name}</h2>
                            <p className="text-sm text-gray-700">{service.description}</p>

                            {/* Línea divisoria y precio alineado a la derecha */}
                            <div className="border-t border-gray-300 mt-2 pt-2 flex justify-between items-center">
                                <p className="text-lg font-semibold text-gray-800">${service.price}</p>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-center text-gray-500 text-lg">No hay servicios disponibles.</p>
            )}

            {/* Botón Siguiente */}
            {selectedService && (
                <div className="mt-6 text-center">
                    <Link
                        href={`calendario/${selectedService}`}
                        className="bg-black text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-slate-600 transition w-full block text-center"
                    >
                        Siguiente
                    </Link>
                </div>
            )}
        </div>
    );
}
