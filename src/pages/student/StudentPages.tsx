const StudentGenericPage = ({ title, description }: { title: string; description: string }) => (
  <div>
    <h2 style={{color:'var(--primary)', marginBottom:'0.5rem'}}>{title}</h2>
    <p style={{color:'var(--text-muted)', marginBottom:'2rem'}}>{description}</p>
    <div className="dash-section">
      <p style={{color:'var(--text-muted)', textAlign:'center', padding:'3rem'}}>This module is ready for backend data integration.</p>
    </div>
  </div>
);

export const StudentProfile = () => <StudentGenericPage title="My Profile" description="View and update your personal, academic, and hostel information." />;
export const StudentTimetable = () => <StudentGenericPage title="Timetable" description="View your daily and weekly class schedule." />;
export const StudentAttendance = () => <StudentGenericPage title="My Attendance" description="View today's status, monthly percentage, and attendance calendar." />;
export const StudentTests = () => <StudentGenericPage title="Tests" description="View upcoming tests, completed tests, and detailed results." />;
export const StudentResults = () => <StudentGenericPage title="Results" description="View marks, rank, percentage, and subject-wise performance." />;
export const StudentMaterials = () => <StudentGenericPage title="Study Materials" description="Access study materials by subject — Polity, History, Geography, and more." />;
export const StudentCurrentAffairs = () => <StudentGenericPage title="Current Affairs" description="Daily current affairs across National, International, Economy, and more." />;
export const StudentAssignments = () => <StudentGenericPage title="Assignments" description="View and submit assigned tasks and essay writing exercises." />;
export const StudentScholarship = () => <StudentGenericPage title="Scholarship" description="Check your scholarship status and application details." />;
export const StudentAnnouncements = () => <StudentGenericPage title="Announcements" description="Important notices and updates from the administration." />;
export const StudentPayments = () => <StudentGenericPage title="Payments" description="View payment history, pending dues, and download receipts." />;
