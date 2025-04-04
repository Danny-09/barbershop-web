
import { useEffect, useState } from "react";
import useToken from "../useToken";
import { APIs } from "@/services/api/APIs";
import Notiflix from "notiflix";
import { Service } from "@/@types/ServicesTypes";

interface Data {
    id?: number;
    name: string;
    description: string;
    price: number;
    status: boolean;
    barber_id?: number | undefined;
}

export const useServices = () => {
    const token = useToken();
    const [services, setServices] = useState<Service[]>([]);


    const getServices = async () => {
        try {
            if (!token) return;
            const user = await APIs.users.getUserId(token?.user.token, token?.user.email);
            const data = await APIs.services.getServicesByBarber(user.id, token.user.token);
            setServices(data.items);
        } catch (error: any) {
            Notiflix.Notify.failure(error.message);
        }
    }

    const getActiveServices = async (barberId: number) => {
        try {
            if (!token) return;
            const data = await APIs.services.getServicesByBarber(barberId, token.user.token);
            setServices(data.items);
        } catch (error: any) {
            Notiflix.Notify.failure(error.message);
        }
    }

    const handleSubmit = async (data: Data, selectedService: Service | null) => {
        try {
            if (!token) return;
            const user = await APIs.users.getUserId(token?.user.token, token?.user.email);
            data.barber_id = user.id;

            if (selectedService) {
                // Editar servicio existente
                const updatedService = await APIs.services.updateService(
                    data,
                    token.user.token,
                    selectedService.id!,
                );
                // Actualizar el servicio en el estado
                setServices((prev) => prev.map(sch => sch.id === updatedService.data.id ? updatedService.data : sch));
                Notiflix.Notify.success("Servicio actualizado exitosamente!");
            } else {
                // Crear nuevo servicio

                const newService = await APIs.services.createService(
                    data,
                    token.user.token
                );
                setServices((prev) => [...prev, newService.data]);
                Notiflix.Notify.success("Servicio creado exitosamente!");
            }

        } catch (error: any) {

            const fail = error.response.data.message;

            if (error.status == 400) {
                Notiflix.Notify.failure(fail[0]);
            } else if (error.status == 409) {
                Notiflix.Notify.failure(fail);
            } else {
                Notiflix.Notify.failure(error.message);
            }
        }
    };

    const handleChangeStatus = (service: Service, action: string, message: string) => {
        Notiflix.Confirm.show(
            `${message} servicio`,
            `¿Estás seguro de ${message} el servicio ${service.name}?`,
            `Sí, ${message}`,
            "Cancelar",
            async () => {
                try {
                    if (!token) return;
                    const updatedService = await APIs.services.changeStatusService(service.id, action, token?.user.token);
                    setServices((prev) => prev.map(sch => sch.id === updatedService.id ? updatedService : sch));
                    Notiflix.Notify.success(`${message} servicio, realizado con exito`);
                } catch (error) {
                    Notiflix.Notify.failure("Error al desactivar el servicio");
                    console.error(error);
                }
            },
            () => {
                Notiflix.Notify.info("Cambio de estatus cancelado");
            }
        );
    };

    useEffect(() => {
        getServices();
    }, [token]);

    return { services, getServices, getActiveServices, handleSubmit, handleChangeStatus }
};
