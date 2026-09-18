import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

interface Props {
  children: React.ReactNode;
  allowedRoles: ('admin' | 'student' | 'staff')[];
}

const ProtectedRoute = ({ children, allowedRoles }: Props) => {
  const { user, isAuthenticated } = useAuth();
  
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (!allowedRoles.includes(user!.role)) {
    return (
      <div style={{ padding: '4rem', textAlign: 'center' }}>
        <h2 style={{ color: '#EF4444', marginBottom: '1rem' }}>Access Denied</h2>
        <p style={{ color: '#64748B' }}>You don't have permission to access this page.</p>
      </div>
    );
  }
  return <>{children}</>;
};

export default ProtectedRoute;
