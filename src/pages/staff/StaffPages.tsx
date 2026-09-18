const StaffGenericPage = ({ title, description }: { title: string; description: string }) => (
  <div>
    <h2 style={{color:'var(--primary)', marginBottom:'0.5rem'}}>{title}</h2>
    <p style={{color:'var(--text-muted)', marginBottom:'2rem'}}>{description}</p>
    <div className="dash-section">
      <p style={{color:'var(--text-muted)', textAlign:'center', padding:'3rem'}}>This module is ready for backend data integration.</p>
    </div>
  </div>
);

export const StaffProfile = () => <StaffGenericPage title="My Profile" description="View and update your profile information." />;
export const StaffClasses = () => <StaffGenericPage title="My Classes" description="View your assigned classes, schedules, and subjects." />;
export const StaffAttendance = () => <StaffGenericPage title="Attendance" description="Mark and track student attendance by batch and date." />;
export const StaffStudents = () => <StaffGenericPage title="Students" description="View and manage students assigned to you." />;
export const StaffTests = () => <StaffGenericPage title="Tests" description="Create, assign, and evaluate tests and assessments." />;
export const StaffAssignments = () => <StaffGenericPage title="Assignments" description="Create and manage student assignments." />;
export const StaffMaterials = () => <StaffGenericPage title="Study Materials" description="Upload and manage study materials for students." />;
export const StaffMentorship = () => <StaffGenericPage title="Mentorship" description="View your mentees and schedule mentorship sessions." />;
export const StaffAnnouncements = () => <StaffGenericPage title="Announcements" description="View and create announcements for students." />;
export const StaffReports = () => <StaffGenericPage title="Reports" description="Generate performance and attendance reports." />;
