// Generic admin sub-page for quick scaffolding
const AdminGenericPage = ({ title, description }: { title: string; description: string }) => (
  <div>
    <h2 style={{color:'var(--primary)', marginBottom:'0.5rem'}}>{title}</h2>
    <p style={{color:'var(--text-muted)', marginBottom:'2rem'}}>{description}</p>
    <div className="dash-section">
      <p style={{color:'var(--text-muted)', textAlign:'center', padding:'3rem'}}>
        This module is ready for data integration. The CRUD interface will be connected to the backend API.
      </p>
    </div>
  </div>
);

export const AdminFacultyPage = () => <AdminGenericPage title="Faculty Management" description="Add, edit, view and manage faculty profiles." />;
export const AdminAcademicsPage = () => <AdminGenericPage title="Academic Management" description="Manage classes, subjects, tests, assignments, and schedules." />;
export const AdminAttendancePage = () => <AdminGenericPage title="Attendance Management" description="Mark and track student attendance by batch and date." />;
export const AdminScholarshipsPage = () => <AdminGenericPage title="Scholarship Management" description="Review, approve and manage scholarship applications." />;
export const AdminAlumniPage = () => <AdminGenericPage title="Alumni Management" description="Add, verify and publish alumni profiles and testimonials." />;
export const AdminGalleryPage = () => <AdminGenericPage title="Gallery Management" description="Upload and manage campus photos and event images." />;
export const AdminNewsPage = () => <AdminGenericPage title="News Management" description="Create and manage news articles and announcements." />;
export const AdminNotificationsPage = () => <AdminGenericPage title="Notification Management" description="Send notifications via SMS, Email, WhatsApp, and Push." />;
export const AdminPaymentsPage = () => <AdminGenericPage title="Payment Management" description="View payment history, transaction records and generate receipts." />;
export const AdminReportsPage = () => <AdminGenericPage title="Reports" description="Generate reports for performance, attendance, scholarships and finances." />;
export const AdminAnalyticsPage = () => <AdminGenericPage title="Analytics Dashboard" description="View KPIs, enrollment growth, selection funnel and performance trends." />;
export const AdminSettingsPage = () => <AdminGenericPage title="Settings" description="Configure general, website, authentication, notification, payment and SEO settings." />;
