'use client';

import { useSession } from "next-auth/react";
import ButtonAuth from "@/components/ButtonAuth";

const Dashboard = () => {

  return (
    <main>
      <ButtonAuth></ButtonAuth>

    </main>
  );
}

export default Dashboard
