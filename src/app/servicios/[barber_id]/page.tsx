'use client';

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { APIs } from "@/services/api/APIs";
import useToken from "@/hooks/useToken";

export default function ServicesPage() {
    const { barber_id } = useParams();
    const [services, setServices] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const token = useToken();

    useEffect(() => {
        if (!barber_id || !token) return;

        const fetchServices = async () => {
            try {
                const data = await APIs.services.getServicesByBarber(Number(barber_id), token);
                setServices(data);
            } catch (error) {
                console.error("Error fetching services:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchServices();
    }, [token, barber_id]);

    if (loading) return <p>Cargando servicios...</p>;

    return (
        <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map((service) => (
                <div key={service.id} className="bg-white p-4 rounded shadow hover:shadow-md transition">
                    <h2 className="text-xl font-bold">{service.name}</h2>
                    <p className="text-sm text-gray-700">{service.description}</p>
                    <p className="text-sm text-gray-600">💵 ${service.price}</p>
                </div>
            ))}
        </div>
    );
}
