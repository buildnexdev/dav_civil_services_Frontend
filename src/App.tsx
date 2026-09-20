import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './hooks/useAuth';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LoadingSpinner from './components/LoadingSpinner';
import DashboardLayout from './layouts/DashboardLayout';
import './App.css';

const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Academics = lazy(() => import('./pages/Academics'));
const Admissions = lazy(() => import('./pages/Admissions'));
const ApplyOnline = lazy(() => import('./pages/ApplyOnline'));
const TrackApplication = lazy(() => import('./pages/TrackApplication'));
const Scholarship = lazy(() => import('./pages/Scholarship'));
const Faculty = lazy(() => import('./pages/Faculty'));
const SuccessStories = lazy(() => import('./pages/SuccessStories'));
const Alumni = lazy(() => import('./pages/Alumni'));
const Gallery = lazy(() => import('./pages/Gallery'));
const News = lazy(() => import('./pages/News'));
const Contact = lazy(() => import('./pages/Contact'));
const Login = lazy(() => import('./pages/Login'));

const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const AdminStudents = lazy(() => import('./pages/admin/AdminStudents'));
const AdminAdmissions = lazy(() => import('./pages/admin/AdminAdmissions'));
const AdminFacultyPage = lazy(() => import('./pages/admin/AdminPages').then(m => ({ default: m.AdminFacultyPage })));
const AdminAcademicsPage = lazy(() => import('./pages/admin/AdminPages').then(m => ({ default: m.AdminAcademicsPage })));
const AdminAttendancePage = lazy(() => import('./pages/admin/AdminPages').then(m => ({ default: m.AdminAttendancePage })));
const AdminScholarshipsPage = lazy(() => import('./pages/admin/AdminPages').then(m => ({ default: m.AdminScholarshipsPage })));
const AdminAlumniPage = lazy(() => import('./pages/admin/AdminPages').then(m => ({ default: m.AdminAlumniPage })));
const AdminGalleryPage = lazy(() => import('./pages/admin/AdminPages').then(m => ({ default: m.AdminGalleryPage })));
const AdminNewsPage = lazy(() => import('./pages/admin/AdminPages').then(m => ({ default: m.AdminNewsPage })));
const AdminNotificationsPage = lazy(() => import('./pages/admin/AdminPages').then(m => ({ default: m.AdminNotificationsPage })));
const AdminPaymentsPage = lazy(() => import('./pages/admin/AdminPages').then(m => ({ default: m.AdminPaymentsPage })));
const AdminReportsPage = lazy(() => import('./pages/admin/AdminPages').then(m => ({ default: m.AdminReportsPage })));
const AdminAnalyticsPage = lazy(() => import('./pages/admin/AdminPages').then(m => ({ default: m.AdminAnalyticsPage })));
const AdminSettingsPage = lazy(() => import('./pages/admin/AdminPages').then(m => ({ default: m.AdminSettingsPage })));

const StudentDashboard = lazy(() => import('./pages/student/StudentDashboard'));
const StudentProfile = lazy(() => import('./pages/student/StudentPages').then(m => ({ default: m.StudentProfile })));
const StudentTimetable = lazy(() => import('./pages/student/StudentPages').then(m => ({ default: m.StudentTimetable })));
const StudentAttendance = lazy(() => import('./pages/student/StudentPages').then(m => ({ default: m.StudentAttendance })));
const StudentTests = lazy(() => import('./pages/student/StudentPages').then(m => ({ default: m.StudentTests })));
const StudentResults = lazy(() => import('./pages/student/StudentPages').then(m => ({ default: m.StudentResults })));
const StudentMaterials = lazy(() => import('./pages/student/StudentPages').then(m => ({ default: m.StudentMaterials })));
const StudentCurrentAffairs = lazy(() => import('./pages/student/StudentPages').then(m => ({ default: m.StudentCurrentAffairs })));
const StudentAssignments = lazy(() => import('./pages/student/StudentPages').then(m => ({ default: m.StudentAssignments })));
const StudentScholarship = lazy(() => import('./pages/student/StudentPages').then(m => ({ default: m.StudentScholarship })));
const StudentAnnouncements = lazy(() => import('./pages/student/StudentPages').then(m => ({ default: m.StudentAnnouncements })));
const StudentPayments = lazy(() => import('./pages/student/StudentPages').then(m => ({ default: m.StudentPayments })));

const StaffDashboard = lazy(() => import('./pages/staff/StaffDashboard'));
const StaffProfile = lazy(() => import('./pages/staff/StaffPages').then(m => ({ default: m.StaffProfile })));
const StaffClasses = lazy(() => import('./pages/staff/StaffPages').then(m => ({ default: m.StaffClasses })));
const StaffAttendance = lazy(() => import('./pages/staff/StaffPages').then(m => ({ default: m.StaffAttendance })));
const StaffStudents = lazy(() => import('./pages/staff/StaffPages').then(m => ({ default: m.StaffStudents })));
const StaffTests = lazy(() => import('./pages/staff/StaffPages').then(m => ({ default: m.StaffTests })));
const StaffAssignments = lazy(() => import('./pages/staff/StaffPages').then(m => ({ default: m.StaffAssignments })));
const StaffMaterials = lazy(() => import('./pages/staff/StaffPages').then(m => ({ default: m.StaffMaterials })));
const StaffMentorship = lazy(() => import('./pages/staff/StaffPages').then(m => ({ default: m.StaffMentorship })));
const StaffAnnouncements = lazy(() => import('./pages/staff/StaffPages').then(m => ({ default: m.StaffAnnouncements })));
const StaffReports = lazy(() => import('./pages/staff/StaffPages').then(m => ({ default: m.StaffReports })));

const AppLayout = () => {
  const location = useLocation();
  const isPublicPage =
    !location.pathname.startsWith('/admin') &&
    !location.pathname.startsWith('/student') &&
    !location.pathname.startsWith('/staff') &&
    location.pathname !== '/login';

  return (
    <>
      {isPublicPage && <Navbar />}
      <main className={isPublicPage ? 'main-content' : ''}>
        <Suspense fallback={<LoadingSpinner fullScreen label="Loading page..." />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/academics" element={<Academics />} />
            <Route path="/admissions" element={<Admissions />} />
            <Route path="/admissions/apply" element={<ApplyOnline />} />
            <Route path="/admissions/track" element={<TrackApplication />} />
            <Route path="/scholarship" element={<Scholarship />} />
            <Route path="/faculty" element={<Faculty />} />
            <Route path="/success-stories" element={<SuccessStories />} />
            <Route path="/alumni" element={<Alumni />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/news" element={<News />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />

            <Route path="/admin" element={<ProtectedRoute allowedRoles={['admin']}><DashboardLayout role="admin" /></ProtectedRoute>}>
              <Route index element={<AdminDashboard />} />
              <Route path="students" element={<AdminStudents />} />
              <Route path="admissions" element={<AdminAdmissions />} />
              <Route path="faculty" element={<AdminFacultyPage />} />
              <Route path="academics" element={<AdminAcademicsPage />} />
              <Route path="attendance" element={<AdminAttendancePage />} />
              <Route path="scholarships" element={<AdminScholarshipsPage />} />
              <Route path="alumni" element={<AdminAlumniPage />} />
              <Route path="gallery" element={<AdminGalleryPage />} />
              <Route path="news" element={<AdminNewsPage />} />
              <Route path="notifications" element={<AdminNotificationsPage />} />
              <Route path="payments" element={<AdminPaymentsPage />} />
              <Route path="reports" element={<AdminReportsPage />} />
              <Route path="analytics" element={<AdminAnalyticsPage />} />
              <Route path="settings" element={<AdminSettingsPage />} />
            </Route>

            <Route path="/student" element={<ProtectedRoute allowedRoles={['student']}><DashboardLayout role="student" /></ProtectedRoute>}>
              <Route index element={<StudentDashboard />} />
              <Route path="profile" element={<StudentProfile />} />
              <Route path="timetable" element={<StudentTimetable />} />
              <Route path="attendance" element={<StudentAttendance />} />
              <Route path="tests" element={<StudentTests />} />
              <Route path="results" element={<StudentResults />} />
              <Route path="materials" element={<StudentMaterials />} />
              <Route path="current-affairs" element={<StudentCurrentAffairs />} />
              <Route path="assignments" element={<StudentAssignments />} />
              <Route path="scholarship" element={<StudentScholarship />} />
              <Route path="announcements" element={<StudentAnnouncements />} />
              <Route path="payments" element={<StudentPayments />} />
            </Route>

            <Route path="/staff" element={<ProtectedRoute allowedRoles={['staff']}><DashboardLayout role="staff" /></ProtectedRoute>}>
              <Route index element={<StaffDashboard />} />
              <Route path="profile" element={<StaffProfile />} />
              <Route path="classes" element={<StaffClasses />} />
              <Route path="attendance" element={<StaffAttendance />} />
              <Route path="students" element={<StaffStudents />} />
              <Route path="tests" element={<StaffTests />} />
              <Route path="assignments" element={<StaffAssignments />} />
              <Route path="materials" element={<StaffMaterials />} />
              <Route path="mentorship" element={<StaffMentorship />} />
              <Route path="announcements" element={<StaffAnnouncements />} />
              <Route path="reports" element={<StaffReports />} />
            </Route>
          </Routes>
        </Suspense>
      </main>
      {isPublicPage && <Footer />}
    </>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app-container">
          <AppLayout />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
