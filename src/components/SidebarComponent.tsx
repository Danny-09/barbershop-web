'use client';

import {
    Bars3Icon,
    XMarkIcon,
    CalendarDaysIcon,
    PhotoIcon,
    Cog6ToothIcon,
    HomeIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";

interface SidebarProps {
    isOpen: boolean;
    toggleSidebar: () => void;
}

export default function SidebarComponent({ isOpen, toggleSidebar }: SidebarProps) {
    return (
        <aside
            className={`fixed top-0 left-0 h-full bg-gray-800 text-white transition-all duration-300 ${isOpen ? "w-64" : "w-20"
                }`}
        >
            <div className="flex justify-end p-2">
                <button
                    onClick={toggleSidebar}
                    className="text-white p-2 hover:bg-gray-700 rounded-md"
                >
                    {isOpen ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
                </button>
            </div>
            <ul className="mt-6">
                <li className="p-2 rounded hover:bg-gray-700 gap-2">
                    <Link className="flex items-center" href="/dashboard">
                        <HomeIcon className="w-6 h-6" />
                        {isOpen && <span className="ml-2"> Dashboard</span>}
                    </Link>
                </li>
                <li className="p-2 rounded hover:bg-gray-700 gap-2">
                    <Link className="flex items-center" href="/dashboard/horarios">
                        <CalendarDaysIcon className="w-6 h-6" />
                        {isOpen && <span className="ml-2"> Horarios</span>}
                    </Link>
                </li>
                <li className="p-2 rounded hover:bg-gray-700 gap-2">
                    <Link className="flex items-center" href="/dashboard/servicios">
                        <Cog6ToothIcon className="w-6 h-6" />
                        {isOpen && <span className="ml-2"> Servicios</span>}
                    </Link>

                </li>
                <li className="p-2 rounded hover:bg-gray-700 gap-2">
                    <Link className="flex items-center" href="/dashboard/imagenes">
                        <PhotoIcon className="w-6 h-6" />
                        {isOpen && <span className="ml-2"> Imágenes</span>}
                    </Link>
                </li>
            </ul>
        </aside>
    );
}
