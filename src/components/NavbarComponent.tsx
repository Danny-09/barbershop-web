'use client';

import { useSession, signOut } from "next-auth/react";
import { BellIcon, UserIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import LogoComponent from "@/components/LogoComponent";
import { useState, useRef, useEffect } from "react";

interface Props {
    home: string;
    isOpen?: boolean;
}

export default function NavbarComponent({ home, isOpen }: Props) {
    const { data: session, status } = useSession();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setDropdownOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);
    return (
        <nav className={`bg-white shadow-md py-3 px-6 transition-all duration-300 ${isOpen ? "ml-64" : "ml-0"
            } flex justify-between items-center`}>
                
            <div className={`text-lg font-semibold text-gray-800 ${isOpen ? "ml-1" : "ml-16" }`}>
                <Link href={home}>
                    <LogoComponent w={90} h={10} />
                </Link>
            </div>

            {status === "loading" ? (
                <p className="text-gray-500 text-sm">Cargando sesión...</p>
            ) : session ? (
                <div className="flex items-center gap-4 relative">
                    {/* Botón de notificaciones */}
                    <button className="relative p-2 hover:bg-gray-100 rounded-full">
                        <BellIcon className="w-6 h-6 text-gray-600" />
                    </button>

                    {/* Dropdown de usuario */}
                    <div className="relative" ref={dropdownRef}>
                        <button
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                            className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100 transition"
                        >
                            <UserIcon className="w-5 h-5 text-gray-600" />
                            <span className="text-gray-800">{session.user?.email || "Usuario"}</span>
                            <ChevronDownIcon className="w-4 h-4 text-gray-600" />
                        </button>

                        {/* Contenido del dropdown */}
                        {dropdownOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md overflow-hidden border border-gray-200 z-50">
                                <Link
                                    href="/profile"
                                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                                >
                                    Mi cuenta
                                </Link>

                                <Link
                                    href="/inicio/mis-citas"
                                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                                >
                                    Mis citas
                                </Link>

                                <button
                                    onClick={() => signOut()}
                                    className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                                >
                                    Cerrar sesión
                                </button>

                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <p className="text-gray-800">No has iniciado sesión</p>
            )}
        </nav>
    );
}
