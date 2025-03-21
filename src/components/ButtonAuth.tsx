'use client';

import { useSession, signIn, signOut } from "next-auth/react";

export default function ButtonAuth() {
  const { data: session, status } = useSession();
  
  if (status === 'loading') {
    return (
      <div className="flex justify-center items-center py-4">
        <p className="text-gray-500 text-sm">Cargando sesión...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4 p-6 bg-white rounded-lg shadow-md w-full max-w-sm mx-auto mt-10">
      {session ? (
        <>
          <p className="text-gray-800 text-center">
            Sesión iniciada como <span className="font-semibold">{session.user?.email || "Usuario desconocido"}</span>
          </p>
          <button
            onClick={() => signOut()}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md transition duration-200"
          >
            Cerrar sesión
          </button>
        </>
      ) : (
        <>
          <p className="text-gray-800 text-center">No has iniciado sesión</p>
          <button
            onClick={() => signIn()}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition duration-200"
          >
            Iniciar sesión
          </button>
        </>
      )}
    </div>
  );
}
