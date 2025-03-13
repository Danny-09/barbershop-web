'use client';

import { useRouter } from 'next/navigation';
import LoginForm from '@/components/LoginComponent';
import { handleLoginWithRole } from '@/services/utils/handle.login';

export default function LoginCustomerPage() {
  const router = useRouter();

  const handleLogin = async (email: string, password: string) => {
    await handleLoginWithRole(email, password, router);
  };

  return <LoginForm onSubmit={handleLogin} />;
}
