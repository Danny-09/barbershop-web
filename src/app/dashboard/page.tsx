'use client';

import { useSession } from "next-auth/react";
import ButtonAuth from "@/app/inicio/layout";

const Dashboard = () => {

  return (
    <main>
      <ButtonAuth></ButtonAuth>

    </main>
  );
}

export default Dashboard
