import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './hooks/useAuth';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import DashboardLayout from './layouts/DashboardLayout';

// Public Pages
import Home from './pages/Home';
import About from './pages/About';
import Academics from './pages/Academics';
import Admissions from './pages/Admissions';
import ApplyOnline from './pages/ApplyOnline';
import TrackApplication from './pages/TrackApplication';
import Scholarship from './pages/Scholarship';
import Faculty from './pages/Faculty';
import SuccessStories from './pages/SuccessStories';
import Alumni from './pages/Alumni';
import Gallery from './pages/Gallery';
import News from './pages/News';
import Contact from './pages/Contact';
import Login from './pages/Login';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminStudents from './pages/admin/AdminStudents';
import AdminAdmissions from './pages/admin/AdminAdmissions';
import { AdminFacultyPage, AdminAcademicsPage, AdminAttendancePage, AdminScholarshipsPage, AdminAlumniPage, AdminGalleryPage, AdminNewsPage, AdminNotificationsPage, AdminPaymentsPage, AdminReportsPage, AdminAnalyticsPage, AdminSettingsPage } from './pages/admin/AdminPages';

// Student Pages
import StudentDashboard from './pages/student/StudentDashboard';
import { StudentProfile, StudentTimetable, StudentAttendance, StudentTests, StudentResults, StudentMaterials, StudentCurrentAffairs, StudentAssignments, StudentScholarship, StudentAnnouncements, StudentPayments } from './pages/student/StudentPages';

// Staff Pages
import StaffDashboard from './pages/staff/StaffDashboard';
import { StaffProfile, StaffClasses, StaffAttendance, StaffStudents, StaffTests, StaffAssignments, StaffMaterials, StaffMentorship, StaffAnnouncements, StaffReports } from './pages/staff/StaffPages';

import './App.css';

// Wrapper to conditionally show Navbar/Footer only for public pages
const AppLayout = () => {
  const location = useLocation();
  const isPublicPage = !location.pathname.startsWith('/admin') && !location.pathname.startsWith('/student') && !location.pathname.startsWith('/staff') && location.pathname !== '/login';

  return (
    <>
      {isPublicPage && <Navbar />}
      <main className={isPublicPage ? 'main-content' : ''}>
        <Routes>
          {/* PUBLIC ROUTES */}
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

          {/* ADMIN ROUTES */}
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

          {/* STUDENT ROUTES */}
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

          {/* STAFF ROUTES */}
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
