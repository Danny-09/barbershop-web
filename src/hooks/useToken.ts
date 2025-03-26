'use client';

import { useSession } from "next-auth/react";

const useToken = () => {
    const { data: session, status } = useSession();

    if (status == 'unauthenticated') return;

    return session;
};

export default useToken;
