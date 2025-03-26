'use client';

import { useEffect, useState } from 'react';
import { APIs } from "@/services/api/APIs";
import Link from 'next/link';
import useToken from '@/hooks/useToken';
import { MapPinIcon, BookmarkIcon } from '@heroicons/react/24/outline';
import Image from "next/image"

type Barber = {
    id: number;
    name: string;
    email: string;
    phone: string;
    address: string;
};

export default function Home() {
    const [barbers, setBarbers] = useState<Barber[]>([]);
    const [loading, setLoading] = useState(true);
    const token = useToken();
    useEffect(() => {
        if (token) {
            const fetchBarbers = async () => {
                try {
                    const response = await APIs.users.getBarbers(token.user.token);
                    setBarbers(response as Barber[]);
                } catch (error) {
                    console.error("Error cargando barberos:", error);
                } finally {
                    setLoading(false);
                }
            };
            fetchBarbers();
        }
    }, [token]);

    return (
        <div className="p-6 bg-slate-50">
            {token == null ? (
                <p className='text-black'>Cargando barberos...</p>
            ) : (
                <div className="">
                    <div className="bg-blue-950 p-6 rounded-lg shadow-lg  mb-7">
                        <h1 className="text-white text-3xl font-semibold mb-4 flex gap-2">
                            ¡Bienvenido!
                        </h1>
                        <p className="text-gray-200 font-bold text-lg md:text-sm">
                            Descubre la manera más rápida y segura de agendar tu cita. ¡Estamos aquí para facilitarte todo el proceso!
                        </p>
                    </div>

                    <h1 className="text-2xl font-bold mb-6 text-black">Barberos disponibles</h1>
                    <p className='text-black'>Elige a un barbero para agendar tu cita de forma fácil y rápida.</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
                        {barbers.map((barber) => (
                            <Link href={`inicio/servicios/${barber.id}`} key={barber.id}>
                                <div className="bg-white rounded-lg shadow p-4 border hover:shadow-lg transition cursor-pointer flex items-center gap-4">
                                    {/* Imagen a la izquierda */}
                                    <Image
                                        src="/images/icono_barberia.png"
                                        alt="logo legacy"
                                        width={80}
                                        height={80}
                                        className="rounded-full object-cover"
                                    />

                                    <div>
                                        <h2 className="text-xl font-semibold">{barber.name}</h2>
                                        <p className="text-sm text-gray-600 flex items-center gap-2">
                                            <MapPinIcon className="w-5 h-5 text-black" />
                                            {barber.address}
                                        </p>

                                        <button className="font-bold mt-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-slate-800 transition duration-300 text-sm flex items-center gap-2">
                                            <BookmarkIcon className="w-5 h-5 text-white" />
                                            Agendar cita
                                        </button>

                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>


                </div>
            )
            }
        </div >
    );
}
