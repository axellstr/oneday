import { useEffect, type ReactNode } from 'react';
import { useStore } from '@nanostores/react';
import { Loader2 } from 'lucide-react';
import { $isAuthenticated, $authLoading, initializeAuth } from '../stores/auth';

interface AuthGuardProps {
  children: ReactNode;
  fallback?: ReactNode;
  redirectTo?: string;
}

export function AuthGuard({ children, fallback, redirectTo = '/auth/signin' }: AuthGuardProps) {
  const isAuthenticated = useStore($isAuthenticated);
  const isLoading = useStore($authLoading);

  useEffect(() => {
    initializeAuth();
  }, []);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      window.location.href = redirectTo;
    }
  }, [isLoading, isAuthenticated, redirectTo]);

  if (isLoading) {
    return (
      fallback || (
        <div className="auth-guard-loading">
          <Loader2 size={24} className="auth-spinner" />
          <span>Loading...</span>
        </div>
      )
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}

export default AuthGuard;

