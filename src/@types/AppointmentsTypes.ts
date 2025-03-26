export type CreateAppointment = {
    date: string;
    user_id: number;
    barber_id: number;
    service_id: number;
    status: number;
};

type Barber = {
    name: string;
};

type Service = {
    name: string;
    price: number;
};

export type AppointmentsList = {
    id: number;
    date: string;
    user_id: number;
    barber_id: number;
    service_id: number;
    status: number;
    barber: Barber;
    service: Service
}[];
