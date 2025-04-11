'use client';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useParams, useRouter } from 'next/navigation';
import esLocale from '@fullcalendar/core/locales/es';
import { useState } from 'react';

interface Props {
    isDashboard: boolean
}

const MonthDays = ({ isDashboard }: Props) => {
    const { service_id } = useParams();
    const [currentDate, setCurrentDate] = useState(new Date());
    const router = useRouter();

    const handleDateClick = (arg: { dateStr: string }) => {
        isDashboard === true
            ? router.push(`/dashboard/calendario/citas/${arg.dateStr}`)
            : router.push(`/inicio/servicios/horario/${arg.dateStr}/${service_id}`);
    };

    return (
        <div className="p-4 text-black">
            <h1 className="text-3xl md:text-3xl font-semibold text-gray-800 text-center mb-6">
                Elige un día para ver la disponibilidad de horarios
            </h1>
            <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"  
                initialDate={currentDate}
                locale={esLocale}
                timeZone="America/Hermosillo"
                headerToolbar={{
                    right: 'prev,next today',
                    left: 'title',
                    center: ''
                }}
                events={[]}  
                dateClick={handleDateClick}  
                validRange={{ start: new Date() }} 
                height="auto"
            />
        </div>
    );
};

export default MonthDays;
