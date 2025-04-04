"use client";

import { usePathname } from "next/navigation";
import {
    Bars3Icon,
    XMarkIcon,
    CalendarDaysIcon,
    PhotoIcon,
    Cog6ToothIcon,
    HomeIcon,
    CalendarIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { JSX } from "react";

interface SidebarProps {
    isOpen: boolean;
    toggleSidebar: () => void;
}

export default function SidebarComponent({ isOpen, toggleSidebar }: SidebarProps) {
    return (
        <aside
            className={`fixed top-0 left-0 h-full bg-gradient-to-b from-gray-900 to-gray-800 text-white transition-all duration-300 shadow-lg ${isOpen ? "w-64" : "w-20"
                } flex flex-col`}
        >
            {/* Botón de menú */}
            <div className="flex justify-end p-3">
                <button
                    onClick={toggleSidebar}
                    className="text-white p-2 hover:bg-gray-700 rounded-full transition-all"
                >
                    {isOpen ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
                </button>
            </div>

            {/* Lista de enlaces */}
            <ul className="mt-4 space-y-1">
                <SidebarItem href="/dashboard" icon={<HomeIcon className="w-6 h-6" />} label="Dashboard" isOpen={isOpen} />
                <SidebarItem href="/citas" icon={<CalendarIcon className="w-6 h-6" />} label="Citas" isOpen={isOpen} />
                <SidebarItem href="/dashboard/horarios" icon={<CalendarDaysIcon className="w-6 h-6" />} label="Horarios" isOpen={isOpen} />
                <SidebarItem href="/dashboard/servicios" icon={<Cog6ToothIcon className="w-6 h-6" />} label="Servicios" isOpen={isOpen} />
                <SidebarItem href="/dashboard/imagenes" icon={<PhotoIcon className="w-6 h-6" />} label="Imágenes" isOpen={isOpen} />
            </ul>
        </aside>
    );
}

function SidebarItem({ href, icon, label, isOpen }: { href: string; icon: JSX.Element; label: string; isOpen: boolean }) {
    const pathname = usePathname(); 
    const isActive = pathname === href; 

    return (
        <li>
            <Link
                href={href}
                className={`flex items-center space-x-3 p-3 rounded-md transition-all duration-300 
                    ${isActive
                        ? "bg-gray-700 text-white border-l-4 border-white shadow-md scale-105"
                        : "hover:bg-gray-700 hover:scale-105"
                    }`}
            >
                {icon}
                {isOpen && <span className="text-sm font-medium">{label}</span>}
            </Link>
        </li>
    );
}
