'use client';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import esLocale from '@fullcalendar/core/locales/es';
import { useEffect, useState } from 'react';
import { useParams } from "next/navigation";
import useToken from '@/hooks/useToken';
import Notiflix from 'notiflix';
import { BarberSchedules } from '@/@types/ScheduleTypes';
import io from 'socket.io-client'; 
import { useAppointments } from '@/hooks/appointments/useAppointments';

interface Event {
    event: number;
    title: string;
    start: string;
    end: string;
    allDay: boolean;
}

export default function BarberCalendar() {
    const { day } = useParams();

    const [events, setEvents] = useState<Event[]>([]);
    const [currentDate, setCurrentDate] = useState(new Date());
    const token = useToken();

    const month = currentDate.getUTCMonth() + 1;
    const { scheduleTimes, appointments, handleStatusAppointment } = useAppointments(month);

    // Establecer conexión al servidor de WebSocket
    const socket = io("https://barber-app-api-eoil.onrender.com");

    // escuvhar evento de appointmentCreated
    useEffect(() => {
        fetchData();

        // Escuchar el evento "appointmentCreated" para actualizar los eventos cuando se crea una cita
        socket.on('appointmentCreated', (appointment) => {
            setEvents(prevEvents => [
                ...prevEvents,
                {
                    event: appointment.id,
                    title: `Reservado por: ${appointment.user?.name}` || 'Reservado',
                    start: appointment.date,
                    end: new Date(new Date(appointment.date).getTime() + 30 * 60000).toISOString(),
                    backgroundColor: 'black',
                    allDay: false,
                }
            ]);
            Notiflix.Notify.info(' ¡Una cita ha sido agendada!', {
                position: 'right-top',
                timeout: 10000,
            });
        });

        // Limpiar el socket cuando el componente se desmonte
        return () => {
            socket.off('appointmentCreated');
        };
    }, [currentDate, token, appointments]);


    const fetchData = async () => {
        try {
            if (appointments.length == 0) return;

            // Actualizar los eventos para FullCalendar
            setEvents(
                appointments.map((appointment) => ({
                    event: appointment.id,
                    title: `Reservado por: ${appointment.user?.name}` || 'Reservado',
                    start: appointment.date,
                    end: new Date(new Date(appointment.date).getTime() + 30 * 60000).toISOString(),
                    backgroundColor: 'black',
                    borderColor: 'black',
                    allDay: false,
                }))
            );
        } catch (error: unknown) {
            console.error("Error al obtener datos: ", error);
        }
    };

    const getDaySchedule = (date: Date) => {
        const dayOfWeek = date.getDay();
        const daySchedule = scheduleTimes.find((schedule: BarberSchedules) => {
            const dayIndex = ['lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado', 'domingo'][dayOfWeek];
            return schedule.day === dayIndex;
        });
        if (daySchedule) {
            const startHour = parseInt(daySchedule.start_time, 10);
            const endHour = parseInt(daySchedule.end_time, 10);
            return { startHour, endHour };
        }
        return { startHour: 0, endHour: 0 };
    };

    const handleEventClick = (info: any) => {
        const appointmentId = info.event.extendedProps.event;

        handleStatusAppointment(appointmentId, info.event.start.toISOString(), 'disable', 'Cancelar');
    }
    return (
        <div className="p-4 text-black">
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView="timeGridDay"
                initialDate={day?.toLocaleString() || currentDate}
                locale={esLocale}
                timeZone="UTC"
                headerToolbar={{
                    right: 'prev,next today',
                    left: 'title',
                    center: ''
                }}
                slotMinTime={`${getDaySchedule(currentDate).startHour}:00:00`}
                slotMaxTime={`${getDaySchedule(currentDate).endHour}:00:00`}
                slotDuration={'00:30:00'}
                slotLabelFormat={{ hour: 'numeric', minute: '2-digit', hour12: true }}
                events={events}
                eventTimeFormat={{
                    hour: 'numeric',
                    minute: '2-digit',
                    hour12: true,
                }}
                eventClick={(info) => {
                    handleEventClick(info);
                }}
                validRange={{ start: new Date() }}
                allDaySlot={false}
                height="auto"
                eventContent={(eventInfo) => (
                    <div style={{ fontWeight: 'bold', fontSize: '14px', color: 'white' }}>
                        {eventInfo.event.title}
                    </div>
                )}
            />
            <style jsx>{`
        @media (max-width: 768px) {
          .fc-header-toolbar {
            flex-direction: column;
          }
          .fc-toolbar-chunk {
            margin-bottom: 5px;
          }
          .fc-button {
            font-size: 14px;
            padding: 5px 10px;
          }
            .fc, .fc * {
         color: black !important;
          }
        }
      `}</style>
        </div>
    );
}
