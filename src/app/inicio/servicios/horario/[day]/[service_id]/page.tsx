'use client';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import esLocale from '@fullcalendar/core/locales/es';
import { useEffect, useState } from 'react';
import { APIs } from '@/services/api/APIs';
import { useParams } from "next/navigation";
import useToken from '@/hooks/useToken';
import Notiflix from 'notiflix';
import { useRouter } from "next/navigation";
import { BarberSchedules, Events } from '@/@types/ScheduleTypes';
import io from 'socket.io-client'; // Importa socket.io-client

interface Arg {
  dateStr: string;
}

interface ArgStart {
  start: Date;
}

export default function BarberCalendar() {
  const { service_id } = useParams();
  const { day } = useParams();

  const barber_id = sessionStorage.getItem('bs');
  const [events, setEvents] = useState<Events>([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [occupiedTimes, setOccupiedTimes] = useState<string[]>([]);
  const [scheduleTimes, setScheduleTimes] = useState<BarberSchedules[]>([]);
  const token = useToken();
  const router = useRouter();

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
          title: 'Ocupado',
          start: appointment.date,
          end: new Date(new Date(appointment.date).getTime() + 30 * 60000).toISOString(),
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
  }, [currentDate, token, barber_id]);

  
  const fetchData = async () => {
    try {
      if (!token) return;
      const month = currentDate.getUTCMonth() + 1;
      const year = currentDate.getUTCFullYear();

      // Obtener los horarios del barbero
      const times = await APIs.schedules.getByBarber(Number(barber_id), token.user.token);
      setScheduleTimes(times);

      // Obtener las citas ocupadas
      const schedule = await APIs.appointments.barberSchedules(month, year, Number(barber_id), token.user.token);
      const busyTimes = schedule.map((appointment) => appointment.date);
      setOccupiedTimes(busyTimes);

      // Actualizar los eventos para FullCalendar
      setEvents(
        schedule.map((appointment) => ({
          title: 'Ocupado',
          start: appointment.date,
          end: new Date(new Date(appointment.date).getTime() + 30 * 60000).toISOString(),
          allDay: false,
        }))
      );
    } catch (error: unknown) {
      console.error("Error al obtener datos: ", error);
    }
  };

  const getDateTimeUTC = (isoDate: string) => {
    const date = new Date(isoDate);
    return `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, '0')}-${String(date.getUTCDate()).padStart(2, '0')}T${String(date.getUTCHours()).padStart(2, '0')}:${String(date.getUTCMinutes()).padStart(2, '0')}`;
  };

  const isTimeOccupied = (isoDate: string) => {
    const selected = getDateTimeUTC(isoDate);
    return occupiedTimes.some((occupied) => getDateTimeUTC(occupied) === selected);
  };

  const handleDateClick = async (arg: Arg) => {
    if (isTimeOccupied(arg.dateStr)) {
      Notiflix.Notify.failure('⛔ Esta hora ya está ocupada.', {
        position: 'right-top',
        timeout: 2500,
      });
      return;
    }

    Notiflix.Confirm.show(
      'Confirmar cita',
      `¿Quieres agendar una cita el ${arg.dateStr}?`,
      'Sí, confirmar',
      'Cancelar',
      async () => {
        try {
          if (!token) return;

          const data = {
            date: arg.dateStr,
            email: token.user.email,
            barber_id,
            service_id,
            status: 1,
          };

          const response = await APIs.appointments.create(data, token.user.token);

          if (response) {
            Notiflix.Notify.success('✅ ¡Tu cita ha sido creada con éxito!', {
              position: 'right-top',
              timeout: 3000,
            });

            // Emitir el evento al servidor para notificar a otros clientes (esto será manejado por tu gateway en NestJS)
            socket.emit('newAppointment', data);

            // Actualizar el calendario después de crear la cita
            setEvents((prevEvents) => [
              ...prevEvents,
              {
                title: '', // Vacio por ahora
                start: arg.dateStr,
                end: new Date(new Date(arg.dateStr).getTime() + 30 * 60000).toISOString(),
                allDay: false,
              },
            ]);
            router.push("/inicio/mis-citas");
          }
        } catch (error: unknown) {
          console.error("Error al crear la cita: ", error);
          Notiflix.Report.failure(
            'Error',
            'Hubo un problema al agendar la cita. Intenta nuevamente.',
            'Cerrar'
          );
        }
      },
      () => {
        Notiflix.Notify.info('⏳ Cita no confirmada.', {
          position: 'right-top',
          timeout: 2000,
        });
      }
    );
  };

  const handleDateChange = (arg: ArgStart) => {
    if (arg.start.toISOString() !== currentDate.toISOString()) {
      setCurrentDate(arg.start);
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
        dateClick={handleDateClick}
        datesSet={handleDateChange}
        validRange={{ start: new Date() }}
        allDaySlot={false}
        height="auto"
        eventContent={(eventInfo) => (
          <div style={{ color: 'black', fontWeight: 'bold' }}>
            <span>{eventInfo.timeText}</span>
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
