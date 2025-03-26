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

interface Arg {
  dateStr: string;
}

interface ArgStart {
  start: Date;
}

export default function BarberCalendar() {
  const { service_id } = useParams();
  const barber_id = sessionStorage.getItem('bs');
  const [events, setEvents] = useState<Events>([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [occupiedTimes, setOccupiedTimes] = useState<string[]>([]);
  const [scheduleTimes, setScheduleTimes] = useState<BarberSchedules[]>([]);
  const token = useToken();
  const router = useRouter();

  useEffect(() => {
    if (token) {
      const fetchData = async () => {
        try {
          const month = currentDate.getUTCMonth() + 1;
          const year = currentDate.getUTCFullYear();

          // Obtener los horarios del barbero
          const times = await APIs.schedules.getByBarber(Number(barber_id), token.user.token);
          setScheduleTimes(times);

          // Obtener las citas ocupadas
          const schedule = await APIs.appointments.barberSchedules(month, year, Number(barber_id), token.user.token);
          const busyTimes = schedule.map((appointment) => appointment.date);
          setOccupiedTimes(busyTimes);

          // Generar los eventos para FullCalendar
          setEvents(
            schedule.map((appointment) => ({
              title: 'Ocupado',
              start: appointment.date,
              end: new Date(new Date(appointment.date).getTime() + 30 * 60000).toISOString(),
              allDay: false,
            }))
          );
        } catch (error: unknown) {
          if (error instanceof Error) {
            console.error(error.message);
          } else {
            console.error("Se produjo un error desconocido", error);
          }
        }
      };

      fetchData();
    }
  }, [currentDate, token, barber_id]);

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
            router.push("/inicio/mis-citas");
          }
        } catch (error: unknown) {
          if (error instanceof Error) {
            console.error(error.message); // Ahora TypeScript reconoce 'message'
          } else {
            console.error("Se produjo un error desconocido", error);
          }
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
    <div className="p-4">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="timeGridDay"
        initialDate={currentDate}
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
        dateClick={handleDateClick}
        datesSet={handleDateChange}
        validRange={{ start: new Date() }}
        allDaySlot={false}
        height="auto"
      />
      <style jsx>{`
        @media (max-width: 768px) {
        .fc-header-toolbar {
          flex-direction: column; /* Pone los botones y título en una columna */
        }
        .fc-toolbar-chunk {
          margin-bottom: 5px; /* Añade espacio entre los chunks (botones y título) */
        }
        .fc-button {
          font-size: 14px; /* Redimensiona los botones */
          padding: 5px 10px;
        }
      }
      `}</style>
    </div>
  );
}
