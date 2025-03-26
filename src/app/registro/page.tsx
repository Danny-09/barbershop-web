'use client';

import LogoComponent from "@/components/LogoComponent";
import { APIs } from "@/services/api/APIs";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from 'react-toastify';

export default function Register() {
  const router = useRouter();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<string[]>([]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors([]);

    if (password !== confirmPassword) {
      setErrors(['Las contraseñas no coinciden.']);
      return;
    }

    const data = {
      name: username,
      email: email,
      phone: phone,
      password: password,
      role_id: 3, // role for customers
    };

    try {
      const response = await APIs.users.register(data);

      if (response.status == 'success') {
        toast.success('¡Registro exitoso! Redirigiendo...', {
          position: "top-right",
          autoClose: 2000,
        });

        setTimeout(() => {
          router.push('/login');
        }, 2000);
      }

    } catch (error: any) {
      const message = error.response.data.message[0] || ['Ocurrió un error inesperado.'];
      setErrors(message);

      toast.error(message, {
        position: "top-right",
        autoClose: 3000,
      })
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-lg">
        <ToastContainer />
        <div className="flex justify-center mb-1">
          <LogoComponent w={300} h={100} />
        </div>

        <h2 className="text-2xl text-black font-bold text-center mb-2">Regístrate</h2>
        <p className="text-sm text-gray-500 text-center mb-6">
          Recuerda llenar los datos correctamente como son solicitados para poder continuar.
        </p>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Nombre de usuario"
            className="w-full text-black px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-black"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="email"
            name="email"
            placeholder="Correo electrónico"
            className="w-full text-black px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-black"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="text"
            name="phone"
            placeholder="Teléfono"
            className="w-full text-black px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-black"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            className="w-full text-black px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-black"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirmar contraseña"
            className="w-full text-black px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-black"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <div className="flex justify-between gap-4 mt-4">
            <Link
              href="/"
              className="w-full text-black font-bold text-center border border-gray-300 py-2 rounded-lg hover:bg-gray-100 transition"
            >
              Volver
            </Link>
            <button
              type="submit"
              className="w-full font-bold bg-black text-white py-2 rounded-lg hover:bg-slate-700 transition"
            >
              Continuar
            </button>
          </div>

          <div className="text-center mt-6">
            <p className="text-gray-500 font-medium">¿Ya tienes una cuenta?</p>
            <Link
              className="font-bold text-black hover:underline"
              href="/login"
            >
              Iniciar sesión
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
