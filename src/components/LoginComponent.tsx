'use client';

import { useState } from 'react';
import styles from '../styles/Login.module.css';

type LoginFormProps = {
    onSubmit: (email: string, password: string) => Promise<void>;
};

export default function LoginForm({ onSubmit }: LoginFormProps) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        
        try {
            await onSubmit(email, password);
        } catch (err: any) {
            setError(err?.response?.data?.message?.[0] || 'Error al iniciar sesión');
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h2 className={styles.title}>Iniciar sesión</h2>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.formGroup}>
                        <label className={styles.label} htmlFor="email">Correo electrónico</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={styles.input}
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label className={styles.label} htmlFor="password">Contraseña</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={styles.input}
                            required
                        />
                    </div>
                    <button type="submit" className={styles.submitButton}>Entrar</button>
                </form>

                {error && <p className={styles.error}>{error}</p>}
            </div>
        </div>
    );
}
