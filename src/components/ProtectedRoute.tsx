import { Navigate } from 'react-router-dom';
import type { ReactNode } from 'react';
import { useAuth, type Role } from '../hooks/useAuth';

interface Props {
  children: ReactNode;
  allowedRoles: Role[];
}

const ProtectedRoute = ({ children, allowedRoles }: Props) => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  if (!allowedRoles.includes(user!.role)) {
    return (
      <div style={{ padding: '4rem', textAlign: 'center' }}>
        <h2 style={{ color: 'var(--danger)', marginBottom: '1rem' }}>Access Denied</h2>
        <p style={{ color: 'var(--text-muted)' }}>You don't have permission to access this page.</p>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
