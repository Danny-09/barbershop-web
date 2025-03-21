'use client';

import { useEffect, useState } from 'react';
import { APIs } from "@/services/api/APIs";
import { useSession } from 'next-auth/react';
import Link from 'next/link';

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
    const { data: session, status } = useSession();

    useEffect(() => {
        if (status === "authenticated" && session?.user?.token) {
            const fetchBarbers = async () => {
                try {
                    const response = await APIs.users.getBarbers(session.user.token);
                    setBarbers(response as Barber[]);
                } catch (error) {
                    console.error("Error cargando barberos:", error);
                } finally {
                    setLoading(false);
                }
            };

            fetchBarbers();
        }
    }, []);

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Barberos disponibles</h1>

            {status == 'loading' ? (
                <p>Cargando barberos...</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {barbers.map((barber) => (
                        <Link href={`/servicios/${barber.id}`} key={barber.id}>
                            <div className="bg-white rounded-lg shadow p-4 border hover:shadow-lg transition cursor-pointer">
                                <h2 className="text-xl font-semibold">{barber.name}</h2>
                                <p className="text-sm text-gray-600">📧 {barber.email}</p>
                                <p className="text-sm text-gray-600">📞 {barber.phone}</p>
                                <p className="text-sm text-gray-600">📍 {barber.address}</p>
                            </div>
                        </Link>
                    ))}

                </div>
            )}
        </div>
    );
}
