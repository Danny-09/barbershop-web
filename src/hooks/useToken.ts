'use client';

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const useToken = () => {
    const { data: session, status } = useSession();
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        if (status === "authenticated") {
            setToken(session?.user?.token);
        }
    }, [status, session]);

    return token;
};

export default useToken;
