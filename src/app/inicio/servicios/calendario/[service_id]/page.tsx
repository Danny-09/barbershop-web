'use client';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useParams, useRouter } from 'next/navigation';
import esLocale from '@fullcalendar/core/locales/es';
import { useState } from 'react';

export default function BarberCalendar() {
    const { service_id } = useParams();
    const [currentDate, setCurrentDate] = useState(new Date());
    const router = useRouter();

    // Maneja el clic en un día del calendario
    const handleDateClick = (arg: { dateStr: string }) => {
        // Aquí pasamos el día seleccionado a la URL
        router.push(`/inicio/servicios/horario/${arg.dateStr}/${service_id}`); // Redirige a la vista con el día en la URL
    };

    return (
        <div className="p-4 text-black">
            <h1 className="text-3xl md:text-3xl font-semibold text-gray-800 text-center mb-6">
                Elige un día para ver la disponibilidad de horarios
            </h1>
            <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"  // Vista de solo días del mes
                initialDate={currentDate}
                locale={esLocale}
                timeZone="UTC"
                headerToolbar={{
                    right: 'prev,next today',
                    left: 'title',
                    center: ''
                }}
                events={[]}  // Aquí podrías agregar eventos si lo deseas
                dateClick={handleDateClick}  // Llama a la función al hacer clic en un día
                validRange={{ start: new Date() }} // Solo fechas futuras
                height="auto"
            />
        </div>
    );
}
