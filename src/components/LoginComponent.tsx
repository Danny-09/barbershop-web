'use client';

import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import LogoComponent from './LogoComponent';
import Link from 'next/link';

const LoginComponent = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();
    const [error, setError] = useState<string[]>([]);
    const { data: session, status } = useSession();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        setError([]);

        const responseNextAuth = await signIn('credentials', {
            email,
            password,
            redirect: false,
        });

        if (responseNextAuth?.error) {
            setError(responseNextAuth.error.split(","));
            return
        }

        switch (session?.user.role) {
            case 'CUSTOMER':
                router.push('/inicio')
                break;
            case 'BARBER':
                router.push('/dashboard')
                break;
            case 'SUPERADMIN':
                router.push('/dashboard-admin')
                break;
            default:
                '403'
                break;
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">

            <form onSubmit={handleLogin} className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">

                <LogoComponent w={400} h={100} />

                <h2 className="text-2xl font-bold mb-6 text-center text-black">Iniciar Sesión</h2>

                {error && <p className="text-red-500 mb-4 text-sm">{error}</p>}

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Correo</label>
                    <input
                        type="email"
                        className="text-black mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700">Contraseña</label>
                    <input
                        type="password"
                        className="text-black mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full font-bold bg-black text-white py-2 px-4 rounded-lg hover:bg-slate-800 transition-colors"
                >
                    Iniciar Sesión
                </button>

                <div className='text-center mt-5'>
                    <p className='text-gray-400 font-bold'>¿No tienes una cuenta aún?</p>
                    <Link className='font-bold text-black ' href='/registro'> Registrarme </Link>
                </div>
            </form>
        </div>
    )
}

export default LoginComponent
