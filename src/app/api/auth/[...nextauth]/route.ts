import { Session } from "@/@types/UsersTypes";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Iniciar sesión",
            credentials: {
                email: { label: "Email", type: "text", required: true },
                password: { label: "Contraseña", type: "password", required: true }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Email y contraseña son requeridos.");
                }

                try {
                    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}auth/login`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            email: credentials.email,
                            password: credentials.password
                        })
                    });

                    if (!res.ok) {
                        throw new Error("Error en la autenticación");
                    }

                    const user = await res.json();
                    return user;
                } catch (error) {
                    throw new Error("No se pudo conectar con el servidor.");
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            return user ? { ...token, ...user } : token;
        },
        async session({ session, token }) {
            session.user = token as Session;
            return session;
        },
    },
    pages: {
        signIn: "/login",
    },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
