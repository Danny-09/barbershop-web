import { APIs } from "@/services/api/APIs";
import { useRouter } from "next/navigation"
import { useState } from "react";
import { toast } from 'react-toastify';

interface Data {
    name: string;
    email: string;
    phone: string;
    address?: string | null;
    password: string;
    role_id: number;
}

export const useRegister = () => {
    const router = useRouter();

    const register = async (data: Data) => {
        try {
            const response = await APIs.users.register(data);
            if (response.status === "success") {
                toast.success("¡Registro exitoso! Redirigiendo...", {
                    position: "top-right",
                    autoClose: 2000,
                });

                router.push("/login");
            }
        } catch (error: unknown) {
            let message = "Ocurrió un error inesperado.";

            if (error instanceof Error) {
                message = (error as any)?.response?.data?.message?.[0] || message;
            }

            toast.error(message, {
                position: "top-right",
                autoClose: 3000,
            });
        }
    };
    return { register }
}
