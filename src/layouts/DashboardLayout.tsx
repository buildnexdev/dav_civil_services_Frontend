import { NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import './DashboardLayout.css';

interface Props { role: 'admin' | 'student' | 'staff'; }

const sidebarLinks = {
  admin: [
    { to: '/admin', label: 'Dashboard', icon: '📊' },
    { to: '/admin/admissions', label: 'Admissions', icon: '📋' },
    { to: '/admin/students', label: 'Students', icon: '👥' },
    { to: '/admin/faculty', label: 'Faculty', icon: '👨‍🏫' },
    { to: '/admin/attendance', label: 'Attendance', icon: '✅' },
    { to: '/admin/scholarships', label: 'Scholarships', icon: '🎓' },
    { to: '/admin/alumni', label: 'Alumni', icon: '🏆' },
    { to: '/admin/gallery', label: 'Gallery', icon: '📸' },
    { to: '/admin/news', label: 'News', icon: '📰' },
    { to: '/admin/notifications', label: 'Notifications', icon: '🔔' },
    { to: '/admin/payments', label: 'Payments', icon: '💰' },
    { to: '/admin/reports', label: 'Reports', icon: '📈' },
    { to: '/admin/analytics', label: 'Analytics', icon: '📉' },
    { to: '/admin/settings', label: 'Settings', icon: '⚙️' },
  ],
  student: [
    { to: '/student', label: 'Dashboard', icon: '📊' },
    { to: '/student/profile', label: 'My Profile', icon: '👤' },
    { to: '/student/timetable', label: 'Timetable', icon: '📅' },
    { to: '/student/attendance', label: 'Attendance', icon: '✅' },
    { to: '/student/tests', label: 'Tests', icon: '📝' },
    { to: '/student/results', label: 'Results', icon: '📊' },
    { to: '/student/materials', label: 'Study Materials', icon: '📚' },
    { to: '/student/current-affairs', label: 'Current Affairs', icon: '🌐' },
    { to: '/student/assignments', label: 'Assignments', icon: '📋' },
    { to: '/student/scholarship', label: 'Scholarship', icon: '🎓' },
    { to: '/student/announcements', label: 'Announcements', icon: '🔔' },
    { to: '/student/payments', label: 'Payments', icon: '💰' },
  ],
  staff: [
    { to: '/staff', label: 'Dashboard', icon: '📊' },
    { to: '/staff/profile', label: 'My Profile', icon: '👤' },
    { to: '/staff/classes', label: 'My Classes', icon: '📚' },
    { to: '/staff/attendance', label: 'Attendance', icon: '✅' },
    { to: '/staff/students', label: 'Students', icon: '👥' },
    { to: '/staff/tests', label: 'Tests', icon: '📝' },
    { to: '/staff/assignments', label: 'Assignments', icon: '📋' },
    { to: '/staff/materials', label: 'Study Materials', icon: '📚' },
    { to: '/staff/mentorship', label: 'Mentorship', icon: '🤝' },
    { to: '/staff/announcements', label: 'Announcements', icon: '🔔' },
    { to: '/staff/reports', label: 'Reports', icon: '📈' },
  ],
};

const DashboardLayout = ({ role }: Props) => {
  const { user, logout } = useAuth();
  const links = sidebarLinks[role];

  return (
    <div className="dashboard-layout">
      <aside className="dash-sidebar">
        <div className="dash-sidebar-header">
          <div className="dash-logo">DAV</div>
          <div><div className="dash-title">DAV Civil Services</div><div className="dash-role">{role.toUpperCase()} PANEL</div></div>
        </div>
        <nav className="dash-nav">
          {links.map(l => (
            <NavLink to={l.to} end className={({ isActive }) => `dash-link ${isActive ? 'active' : ''}`} key={l.to}>
              <span className="dash-icon">{l.icon}</span>{l.label}
            </NavLink>
          ))}
        </nav>
      </aside>
      <div className="dash-main">
        <header className="dash-topbar">
          <div className="dash-search"><input placeholder="Search..." className="form-control" style={{maxWidth: 300, background:'var(--bg-soft)', border:'none'}} /></div>
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
