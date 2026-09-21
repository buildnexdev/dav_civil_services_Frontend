import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './hooks/useAuth';
import { AccessProvider } from './hooks/useAccess';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LoadingSpinner from './components/LoadingSpinner';
import DashboardLayout from './layouts/DashboardLayout';
import MandalaPattern from './components/common/MandalaPattern';
import './App.css';

const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Academics = lazy(() => import('./pages/Academics'));
const Programs = lazy(() => import('./pages/Programs'));
const ProgramDetail = lazy(() => import('./pages/ProgramDetail'));
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
const AdminMentors = lazy(() => import('./pages/admin/AdminMentors'));
const AdminAcademics = lazy(() => import('./pages/admin/AdminAcademics'));
const AdminAttendance = lazy(() => import('./pages/admin/AdminAttendance'));
const AdminScholarshipsPage = lazy(() => import('./pages/admin/AdminLearningContent'));
const AdminAlumni = lazy(() => import('./pages/admin/AdminAlumni'));
const AdminGallery = lazy(() => import('./pages/admin/AdminGallery'));
const AdminNews = lazy(() => import('./pages/admin/AdminNews'));
const AdminNotifications = lazy(() => import('./pages/admin/AdminNotifications'));
const AdminPayments = lazy(() => import('./pages/admin/AdminPayments'));
const AdminReports = lazy(() => import('./pages/admin/AdminReports'));
const AdminAnalytics = lazy(() => import('./pages/admin/AdminAnalytics'));
const AdminSettings = lazy(() => import('./pages/admin/AdminSettings'));

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
      <main className={isPublicPage ? 'main-content position-relative' : ''}>
        {isPublicPage && <MandalaPattern className="global-bg-mandala" />}
        <Suspense fallback={<LoadingSpinner fullScreen label="Loading page..." />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/academics" element={<Academics />} />
            <Route path="/programs" element={<Programs />} />
            <Route path="/programs/:slug" element={<ProgramDetail />} />
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
              <Route path="mentors" element={<AdminMentors />} />
              <Route path="faculty" element={<AdminMentors />} />
              <Route path="academics" element={<AdminAcademics />} />
              <Route path="attendance" element={<AdminAttendance />} />
              <Route path="scholarships" element={<AdminScholarshipsPage />} />
              <Route path="alumni" element={<AdminAlumni />} />
              <Route path="gallery" element={<AdminGallery />} />
              <Route path="news" element={<AdminNews />} />
              <Route path="notifications" element={<AdminNotifications />} />
              <Route path="payments" element={<AdminPayments />} />
              <Route path="reports" element={<AdminReports />} />
              <Route path="analytics" element={<AdminAnalytics />} />
              <Route path="settings" element={<AdminSettings />} />
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
      <AccessProvider>
        <Router>
          <div className="app-container">
            <AppLayout />
          </div>
        </Router>
      </AccessProvider>
    </AuthProvider>
  );
}

export default App;
