'use client';

import NavbarComponent from "@/components/NavbarComponent";
import Notiflix from "notiflix";
import { useEffect } from "react";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
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
    return (

        <div className="min-h-screen flex flex-col bg-slate-50">
            <NavbarComponent home='/inicio' />
            <main className="flex-1 p-6">
                {children}
            </main>
        </div>
    );
}
