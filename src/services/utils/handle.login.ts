import { APIs } from '@/services/api/APIs';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

export const handleLoginWithRole = async (
    email: string,
    password: string,
    router: AppRouterInstance,
) => {
    const response = await APIs.auth.singIn(email, password);

    switch (response.role) {
        case 'SUPERADMIN':
            router.push('/dashboard');
            break;
        case 'CUSTOMER':
            router.push('/home');
            break;
        case 'BARBER':
            router.push('/dashboard');
            break;
        default:
            throw new Error('Acceso denegado');
    }
};
