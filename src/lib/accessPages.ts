export type PortalPage = {
  key: string;
  path: string;
  label: string;
  icon: string;
  required?: boolean;
};

export const STUDENT_PAGES: PortalPage[] = [
  { key: 'dashboard', path: '/student', label: 'Dashboard', icon: '📊', required: true },
  { key: 'profile', path: '/student/profile', label: 'My Profile', icon: '👤' },
  { key: 'timetable', path: '/student/timetable', label: 'Timetable', icon: '📅' },
  { key: 'attendance', path: '/student/attendance', label: 'Attendance', icon: '✅' },
  { key: 'tests', path: '/student/tests', label: 'Tests', icon: '📝' },
  { key: 'results', path: '/student/results', label: 'Results', icon: '📊' },
  { key: 'materials', path: '/student/materials', label: 'Study Materials', icon: '📚' },
  { key: 'current-affairs', path: '/student/current-affairs', label: 'Current Affairs', icon: '🌐' },
  { key: 'assignments', path: '/student/assignments', label: 'Assignments', icon: '📋' },
  { key: 'scholarship', path: '/student/scholarship', label: 'Scholarship', icon: '🎓' },
  { key: 'announcements', path: '/student/announcements', label: 'Announcements', icon: '🔔' },
  { key: 'payments', path: '/student/payments', label: 'Payments', icon: '💰' }
];

export const MENTOR_PAGES: PortalPage[] = [
  { key: 'dashboard', path: '/staff', label: 'Dashboard', icon: '📊', required: true },
  { key: 'profile', path: '/staff/profile', label: 'My Profile', icon: '👤' },
  { key: 'classes', path: '/staff/classes', label: 'My Classes', icon: '📚' },
  { key: 'attendance', path: '/staff/attendance', label: 'Attendance', icon: '✅' },
  { key: 'students', path: '/staff/students', label: 'Students', icon: '👥' },
  { key: 'tests', path: '/staff/tests', label: 'Tests', icon: '📝' },
  { key: 'assignments', path: '/staff/assignments', label: 'Assignments', icon: '📋' },
  { key: 'materials', path: '/staff/materials', label: 'Study Materials', icon: '📚' },
  { key: 'mentorship', path: '/staff/mentorship', label: 'Mentorship', icon: '🤝' },
  { key: 'announcements', path: '/staff/announcements', label: 'Announcements', icon: '🔔' },
  { key: 'reports', path: '/staff/reports', label: 'Reports', icon: '📈' }
];

export const ADMIN_PAGES: PortalPage[] = [
  { key: 'dashboard', path: '/admin', label: 'Dashboard', icon: '📊', required: true },
  { key: 'admissions', path: '/admin/admissions', label: 'Admissions', icon: '📋' },
  { key: 'students', path: '/admin/students', label: 'Students', icon: '👥' },
  { key: 'mentors', path: '/admin/mentors', label: 'Mentors', icon: '👨‍🏫' },
  { key: 'academics', path: '/admin/academics', label: 'Academics', icon: '📚' },
  { key: 'attendance', path: '/admin/attendance', label: 'Attendance', icon: '✅' },
  { key: 'scholarships', path: '/admin/scholarships', label: 'Materials & Results', icon: '📚' },
  { key: 'alumni', path: '/admin/alumni', label: 'Alumni', icon: '🏆' },
  { key: 'gallery', path: '/admin/gallery', label: 'Gallery', icon: '📸' },
  { key: 'news', path: '/admin/news', label: 'News', icon: '📰' },
  { key: 'notifications', path: '/admin/notifications', label: 'Notifications', icon: '🔔' },
  { key: 'payments', path: '/admin/payments', label: 'Payments', icon: '💰' },
  { key: 'reports', path: '/admin/reports', label: 'Reports', icon: '📈' },
  { key: 'analytics', path: '/admin/analytics', label: 'Analytics', icon: '📉' },
  { key: 'settings', path: '/admin/settings', label: 'Settings', icon: '⚙️' }
];

export function pagesForRole(role: 'admin' | 'student' | 'staff') {
  if (role === 'student') return STUDENT_PAGES;
  if (role === 'staff') return MENTOR_PAGES;
  return ADMIN_PAGES;
}

export function isPageAllowed(pathname: string, pages: PortalPage[], allowedKeys: string[] | null) {
  if (!allowedKeys || allowedKeys.includes('*')) return true;
  const match = pages.find((page) => (
    page.key === 'dashboard' ? pathname === page.path : pathname === page.path || pathname.startsWith(`${page.path}/`)
  ));
  if (!match) return true;
  return match.required || allowedKeys.includes(match.key);
}
