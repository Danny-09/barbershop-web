export type BarberSchedules = {
    day: string;
    start_time: string;
    end_time: string;
}[];

export type Events = {
    title: string;
    start: string;
    end: string;
    allDay: boolean,
}[];
