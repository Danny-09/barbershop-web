'use client';

import SidebarComponent from "@/components/SidebarComponent";
import NavbarComponent from "@/components/NavbarComponent";
import { useEffect, useState } from "react";
import Notiflix from "notiflix";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        Notiflix.Notify.init({
            timeout: 5000,
            position: 'right-top',
            clickToClose: true,
            pauseOnHover: true,
            width: '380px',
            fontSize: '18px',
        });
        Notiflix.Confirm.init({
            width: '350px',
            borderRadius: '10px',
            titleFontSize: '24px',
            messageFontSize: '20px',
            buttonsFontSize: '18px',
        });
    }, []);

    const [isOpen, setIsOpen] = useState(true);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="min-h-screen flex flex-col bg-white">
            <NavbarComponent home='/dashboard' isOpen={isOpen} />
            <div className="flex flex-1">
                <SidebarComponent isOpen={isOpen} toggleSidebar={toggleSidebar} />
                <main
                    className={`flex-1 p-6 transition-all duration-300 ${isOpen ? "ml-64" : "ml-20"}`}
                >
                    {children}
                </main>
            </div>
        </div>
    );
}
