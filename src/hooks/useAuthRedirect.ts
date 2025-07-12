'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

export default function useAuthRedirect() {
  const router = useRouter();
  const pathname = usePathname();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const token = localStorage.getItem('token');
    const isAuthPage = pathname === '/login' || pathname === '/registration';

    if (token) {
      setIsAuthenticated(true);
      if (isAuthPage) {
        router.replace('/profile');
      }
    } else {
      setIsAuthenticated(false);
      if (!isAuthPage) {
        router.replace('/login');
      }
    }

    setIsLoading(false);
  }, [pathname, router]);

  return { isAuthenticated, isLoading };
}