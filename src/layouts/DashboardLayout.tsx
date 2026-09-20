import { Navigate, NavLink, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useAccess, usePortalPages } from '../hooks/useAccess';
import { isPageAllowed, pagesForRole } from '../lib/accessPages';
import './DashboardLayout.css';

interface Props { role: 'admin' | 'student' | 'staff'; }

const DashboardLayout = ({ role }: Props) => {
  const { user, logout } = useAuth();
  const { allowedKeys } = useAccess();
  const links = usePortalPages(role);
  const location = useLocation();
  const catalog = pagesForRole(role);

  if (role !== 'admin' && !isPageAllowed(location.pathname, catalog, allowedKeys)) {
    return <Navigate to={role === 'student' ? '/student' : '/staff'} replace />;
  }

  const panelLabel = role === 'staff' ? 'MENTOR' : role.toUpperCase();

  return (
    <div className="dashboard-layout">
      <aside className="dash-sidebar">
        <div className="dash-sidebar-header">
          <div className="dash-logo">DAV</div>
          <div>
            <div className="dash-title">DAV Civil Services</div>
            <div className="dash-role">{panelLabel} PANEL</div>
          </div>
        </div>
        <nav className="dash-nav">
          {links.map((l) => (
            <NavLink
              to={l.path}
              end={l.key === 'dashboard'}
              className={({ isActive }) => `dash-link ${isActive ? 'active' : ''}`}
              key={l.path}
            >
              <span className="dash-icon">{l.icon}</span>{l.label}
            </NavLink>
          ))}
        </nav>
      </aside>
      <div className="dash-main">
        <header className="dash-topbar">
          <div className="dash-search">
            <input placeholder="Search..." className="form-control" style={{ maxWidth: 300, background: 'var(--bg-soft)', border: 'none' }} />
          </div>
          <div className="dash-topbar-right">
            <span className="dash-notif">🔔</span>
            <span className="dash-user">{user?.username}</span>
            <button className="btn btn-outline btn-sm" onClick={logout}>Logout</button>
          </div>
        </header>
        <div className="dash-content"><Outlet /></div>
      </div>
    </div>
  );
};

export default DashboardLayout;
