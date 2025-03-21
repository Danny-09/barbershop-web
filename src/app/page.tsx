import LogoComponent from "@/components/LogoComponent";
import Link from "next/link";

export default function Home() {
  return (
    <div className="grid place-items-center text-center bg-white">
      <div>
        <LogoComponent w={400} h={100} />
        <div className="text-2xl font-semibold mb-2 text-black">
          Renueva tu look, agenda tu cita ahora.
        </div>

        <div className="text-muted text-center text-sm sm:text-base mb-14 max-w-xs sm:max-w-md mx-auto px-4 text-gray-500">
          Reserva tu cita con nosotros y disfruta de una experiencia para realzar tu personalidad y sacar la mejor versión de ti.
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-6 sm:gap-4 px-6 sm:px-0 mt-6 sm:mt-2">
          <Link
            href="/login"
            className="bg-black font-bold text-white px-5 py-3 rounded hover:bg-slate-700 transition"
          >
            Iniciar sesión
          </Link>

          <Link
            href="/registro"
            className="bg-gray-200 font-bold text-gray-800 px-6 py-3 rounded hover:bg-gray-300 transition"
          >
            Registrarse
          </Link>
        </div>
      </div>
    </div>
  );
}
