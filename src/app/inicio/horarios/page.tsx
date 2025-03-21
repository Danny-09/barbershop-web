'use client';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useEffect, useState } from 'react';
import { APIs } from '@/services/api/APIs';
import { useSession } from 'next-auth/react';

export default function BarberCalendar() {
  const [events, setEvents] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [occupiedTimes, setOccupiedTimes] = useState<string[]>([]);
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "authenticated" && session?.user?.token) {
      const fetchData = async () => {
        try {
          const month = currentDate.getUTCMonth() + 1;
          const year = currentDate.getUTCFullYear();
          const response = await APIs.appointments.barberSchedules(month, year, 10, session.user.token);

          const busyTimes = response.map((appointment: any) => appointment.date);
          setOccupiedTimes(busyTimes);

          setEvents(
            response.map((appointment: any) => ({
              title: 'Ocupado',
              start: appointment.date,
              end: new Date(new Date(appointment.date).getTime() + 30 * 60000).toISOString(),
              allDay: false,
            }))
          );
        } catch (error) {
          console.error('Error al cargar citas:', error);
        }
      };

      fetchData();
    }
  }, [currentDate]);

  // 🔄 Normaliza fecha a UTC string sin segundos
  const getDateTimeUTC = (isoDate: string) => {
    const date = new Date(isoDate);
    const yyyy = date.getUTCFullYear();
    const mm = String(date.getUTCMonth() + 1).padStart(2, '0');
    const dd = String(date.getUTCDate()).padStart(2, '0');
    const hh = String(date.getUTCHours()).padStart(2, '0');
    const min = String(date.getUTCMinutes()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}T${hh}:${min}`;
  };

  // 🛑 Verificar si una hora está ocupada (en UTC)
  const isTimeOccupied = (isoDate: string) => {
    const selected = getDateTimeUTC(isoDate);

    return occupiedTimes.some((occupied) => {
      const occ = getDateTimeUTC(occupied);
      const match = selected === occ;

      console.log(`[⏰ Comparación UTC] Seleccionada: ${selected} vs Ocupada: ${occ} → ${match}`);
      return match;
    });
  };

  // ✅ Manejador al hacer clic en una hora
  const handleDateClick = (arg: any) => {
    if (isTimeOccupied(arg.dateStr)) {
      alert('⛔ Esta hora ya está ocupada.');
      return;
    }
    alert('✅ Hora disponible seleccionada: ' + arg.dateStr);
  };

  // 🎨 Personaliza cómo se ven los eventos
  const eventContent = (info: any) => {
    return {
      html: `<div style="background-color: red; color: white; padding: 4px; border-radius: 4px;">${info.event.title}</div>`,
    };
  };

  // 📆 Manejar cambio de vista/fecha
  const handleDateChange = (arg: any) => {
    if (arg.start.toISOString() !== currentDate.toISOString()) {
      setCurrentDate(arg.start);
    }
  };

  return (
    <div className="p-4">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="timeGridDay"
        initialDate={currentDate}
        locale="es"
        timeZone="UTC"
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'timeGridDay,dayGridWeek,dayGridMonth',
        }}
        slotMinTime="10:00:00"
        slotMaxTime="18:00:00"
        slotDuration={'00:30:00'}
        slotLabelFormat={{
          hour: 'numeric',
          minute: '2-digit',
          hour12: true,
        }}
        events={events}
        dateClick={handleDateClick}
        datesSet={handleDateChange}
        validRange={{ start: new Date() }}
        eventContent={eventContent}
        allDaySlot={false}
      />
    </div>
  );
}
