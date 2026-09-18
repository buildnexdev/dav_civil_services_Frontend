// Demo data for the entire DAV Civil Services application
// All values are DEMO/PLACEHOLDER data for development purposes only

export interface Student {
  id: string; name: string; program: string; batch: string; phone: string;
  email: string; attendance: number; performance: number; scholarship: string;
  status: 'Active' | 'Inactive' | 'Graduated'; gender: string; dob: string;
  address: string; state: string; district: string;
  tenth: number; twelfth: number; degree: string; university: string; gradYear: number;
  hostel: string; room: string;
}

export interface Faculty {
  id: string; name: string; photo: string; designation: string; subject: string;
  experience: number; expertise: string[]; bio: string; examCategory: string;
}

export interface Alumni {
  id: string; name: string; photo: string; year: number; air: number;
  service: string; cadre: string; optionalSubject: string;
  currentDesignation: string; currentPosting: string;
  testimonial: string; status: 'Verified' | 'Pending' | 'Rejected'; published: boolean;
}

export interface Application {
  id: string; name: string; email: string; phone: string; program: string;
  status: 'Submitted' | 'Under Review' | 'Documents Verified' | 'Exam Scheduled' |
    'Exam Completed' | 'Shortlisted' | 'Interview' | 'Selected' | 'Rejected';
  date: string; gender: string;
}

export interface NewsItem {
  id: string; title: string; category: string; date: string;
  description: string; content: string;
}

export interface StudyMaterial {
  id: string; title: string; subject: string; type: string; date: string;
}

export interface SuccessStory {
  id: string; name: string; year: number; exam: string; rank: number;
  service: string; story: string; photo: string; category: string;
}

export interface AttendanceRecord {
  id: string; studentId: string; studentName: string; date: string;
  status: 'Present' | 'Absent' | 'Leave'; batch: string;
}

export interface TestResult {
  id: string; testName: string; studentId: string; studentName: string;
  subject: string; marks: number; totalMarks: number; rank: number; date: string;
}

export interface Payment {
  id: string; studentId: string; studentName: string; category: string;
  amount: number; method: string; status: 'Completed' | 'Pending' | 'Failed';
  date: string; transactionId: string;
}

export interface ScholarshipApp {
  id: string; studentName: string; type: string; amount: number;
  status: 'Pending' | 'Approved' | 'Rejected'; date: string;
}

export interface Notification {
  id: string; title: string; message: string; type: string;
  date: string; read: boolean; channel: string;
}

export interface GalleryImage {
  id: string; url: string; category: string; caption: string;
}

// ========== DEMO DATA ==========

export const demoStudents: Student[] = [
  { id: 'STU001', name: 'Arun Kumar', program: 'UPSC CSE', batch: '2025-A', phone: '9876543210', email: 'arun@dav.edu', attendance: 92, performance: 85, scholarship: 'Merit', status: 'Active', gender: 'Male', dob: '1998-03-15', address: '123 Main St, Chennai', state: 'Tamil Nadu', district: 'Chennai', tenth: 95, twelfth: 92, degree: 'B.A. Political Science', university: 'Madras University', gradYear: 2020, hostel: 'Block A', room: 'A-101' },
  { id: 'STU002', name: 'Priya Sharma', program: 'UPSC CSE', batch: '2025-A', phone: '9876543211', email: 'priya@dav.edu', attendance: 96, performance: 91, scholarship: 'Academic Excellence', status: 'Active', gender: 'Female', dob: '1999-07-22', address: '45 Park Road, Coimbatore', state: 'Tamil Nadu', district: 'Coimbatore', tenth: 98, twelfth: 96, degree: 'B.Sc. Mathematics', university: 'PSG College', gradYear: 2021, hostel: 'Block B', room: 'B-205' },
  { id: 'STU003', name: 'Rajesh Venkataraman', program: 'TNPSC', batch: '2025-B', phone: '9876543212', email: 'rajesh@dav.edu', attendance: 88, performance: 78, scholarship: 'Need-Based', status: 'Active', gender: 'Male', dob: '1997-11-05', address: '78 Lake View, Madurai', state: 'Tamil Nadu', district: 'Madurai', tenth: 89, twelfth: 85, degree: 'B.A. History', university: 'Madurai Kamaraj University', gradYear: 2019, hostel: 'Block A', room: 'A-203' },
  { id: 'STU004', name: 'Deepa Murugan', program: 'SSC CGL', batch: '2025-A', phone: '9876543213', email: 'deepa@dav.edu', attendance: 94, performance: 82, scholarship: 'None', status: 'Active', gender: 'Female', dob: '2000-01-18', address: '56 Temple St, Trichy', state: 'Tamil Nadu', district: 'Tiruchirappalli', tenth: 92, twelfth: 88, degree: 'B.Com', university: 'Bharathidasan University', gradYear: 2022, hostel: 'Block B', room: 'B-102' },
  { id: 'STU005', name: 'Karthik Sundaram', program: 'UPSC CSE', batch: '2024-A', phone: '9876543214', email: 'karthik@dav.edu', attendance: 90, performance: 88, scholarship: 'Merit', status: 'Active', gender: 'Male', dob: '1998-09-30', address: '12 Gandhi Nagar, Salem', state: 'Tamil Nadu', district: 'Salem', tenth: 94, twelfth: 91, degree: 'B.Tech CSE', university: 'Anna University', gradYear: 2020, hostel: 'Block A', room: 'A-305' },
  { id: 'STU006', name: 'Lakshmi Narayanan', program: 'IFoS', batch: '2025-A', phone: '9876543215', email: 'lakshmi@dav.edu', attendance: 95, performance: 87, scholarship: 'Social Support', status: 'Active', gender: 'Female', dob: '1999-04-12', address: '89 River Road, Thanjavur', state: 'Tamil Nadu', district: 'Thanjavur', tenth: 96, twelfth: 93, degree: 'B.Sc. Botany', university: 'University of Madras', gradYear: 2021, hostel: 'Block B', room: 'B-301' },
  { id: 'STU007', name: 'Mohan Raj', program: 'CAPF', batch: '2025-B', phone: '9876543216', email: 'mohan@dav.edu', attendance: 87, performance: 75, scholarship: 'None', status: 'Active', gender: 'Male', dob: '1997-06-25', address: '34 Fort Road, Vellore', state: 'Tamil Nadu', district: 'Vellore', tenth: 88, twelfth: 84, degree: 'B.A. Sociology', university: 'VIT', gradYear: 2019, hostel: 'Block C', room: 'C-101' },
  { id: 'STU008', name: 'Nithya Krishnan', program: 'TNPSC', batch: '2025-A', phone: '9876543217', email: 'nithya@dav.edu', attendance: 93, performance: 80, scholarship: 'Need-Based', status: 'Active', gender: 'Female', dob: '2000-08-14', address: '67 Beach Road, Kanyakumari', state: 'Tamil Nadu', district: 'Kanyakumari', tenth: 91, twelfth: 87, degree: 'B.A. Tamil Literature', university: 'MS University', gradYear: 2022, hostel: 'Block B', room: 'B-403' },
  { id: 'STU009', name: 'Suresh Babu', program: 'UPSC CSE', batch: '2024-B', phone: '9876543218', email: 'suresh@dav.edu', attendance: 91, performance: 83, scholarship: 'Merit', status: 'Active', gender: 'Male', dob: '1998-12-03', address: '23 Hill Road, Nilgiris', state: 'Tamil Nadu', district: 'Nilgiris', tenth: 93, twelfth: 90, degree: 'B.A. Geography', university: 'Loyola College', gradYear: 2020, hostel: 'Block A', room: 'A-402' },
  { id: 'STU010', name: 'Vanitha Selvaraj', program: 'SSC CGL', batch: '2025-B', phone: '9876543219', email: 'vanitha@dav.edu', attendance: 89, performance: 77, scholarship: 'None', status: 'Active', gender: 'Female', dob: '1999-02-28', address: '45 Market St, Erode', state: 'Tamil Nadu', district: 'Erode', tenth: 90, twelfth: 86, degree: 'B.Sc. Physics', university: 'Bharathiar University', gradYear: 2021, hostel: 'Block B', room: 'B-504' },
  { id: 'STU011', name: 'Ganesh Prabhu', program: 'UPSC CSE', batch: '2025-A', phone: '9876543220', email: 'ganesh@dav.edu', attendance: 94, performance: 89, scholarship: 'Academic Excellence', status: 'Active', gender: 'Male', dob: '1998-05-17', address: '56 Raja St, Tirunelveli', state: 'Tamil Nadu', district: 'Tirunelveli', tenth: 97, twelfth: 94, degree: 'B.A. Public Administration', university: 'MKU', gradYear: 2020, hostel: 'Block A', room: 'A-501' },
  { id: 'STU012', name: 'Anitha Devi', program: 'TNPSC', batch: '2025-A', phone: '9876543221', email: 'anitha@dav.edu', attendance: 90, performance: 81, scholarship: 'Social Support', status: 'Active', gender: 'Female', dob: '2000-10-09', address: '78 College Road, Dindigul', state: 'Tamil Nadu', district: 'Dindigul', tenth: 89, twelfth: 85, degree: 'B.A. Economics', university: 'Gandhigram University', gradYear: 2022, hostel: 'Block B', room: 'B-601' },
  { id: 'STU013', name: 'Vijay Anand', program: 'IFoS', batch: '2024-A', phone: '9876543222', email: 'vijay@dav.edu', attendance: 96, performance: 90, scholarship: 'Merit', status: 'Active', gender: 'Male', dob: '1997-08-21', address: '12 Forest Lane, Coimbatore', state: 'Tamil Nadu', district: 'Coimbatore', tenth: 95, twelfth: 93, degree: 'B.Sc. Forestry', university: 'TNAU', gradYear: 2019, hostel: 'Block C', room: 'C-201' },
  { id: 'STU014', name: 'Meena Kumari', program: 'UPSC CSE', batch: '2025-B', phone: '9876543223', email: 'meena@dav.edu', attendance: 92, performance: 86, scholarship: 'Need-Based', status: 'Active', gender: 'Female', dob: '1999-01-07', address: '34 Anna Nagar, Chennai', state: 'Tamil Nadu', district: 'Chennai', tenth: 94, twelfth: 91, degree: 'B.A. Philosophy', university: 'University of Madras', gradYear: 2021, hostel: 'Block B', room: 'B-701' },
  { id: 'STU015', name: 'Senthil Kumar', program: 'CAPF', batch: '2025-A', phone: '9876543224', email: 'senthil@dav.edu', attendance: 88, performance: 76, scholarship: 'None', status: 'Active', gender: 'Male', dob: '1998-04-11', address: '89 Bus Stand Rd, Cuddalore', state: 'Tamil Nadu', district: 'Cuddalore', tenth: 87, twelfth: 83, degree: 'B.Sc. Chemistry', university: 'Annamalai University', gradYear: 2020, hostel: 'Block C', room: 'C-301' },
  { id: 'STU016', name: 'Kavitha Rangan', program: 'TNPSC', batch: '2024-B', phone: '9876543225', email: 'kavitha@dav.edu', attendance: 91, performance: 79, scholarship: 'Social Support', status: 'Active', gender: 'Female', dob: '2000-06-19', address: '23 Temple Rd, Kumbakonam', state: 'Tamil Nadu', district: 'Thanjavur', tenth: 90, twelfth: 87, degree: 'B.A. History', university: 'Alagappa University', gradYear: 2022, hostel: 'Block B', room: 'B-102' },
  { id: 'STU017', name: 'Manikandan S', program: 'SSC CGL', batch: '2025-A', phone: '9876543226', email: 'mani@dav.edu', attendance: 86, performance: 74, scholarship: 'None', status: 'Active', gender: 'Male', dob: '1999-09-23', address: '56 Church St, Nagercoil', state: 'Tamil Nadu', district: 'Kanyakumari', tenth: 86, twelfth: 82, degree: 'B.Com', university: 'Scott Christian College', gradYear: 2021, hostel: 'Block C', room: 'C-401' },
  { id: 'STU018', name: 'Revathi Sundari', program: 'UPSC CSE', batch: '2025-A', phone: '9876543227', email: 'revathi@dav.edu', attendance: 95, performance: 92, scholarship: 'Academic Excellence', status: 'Active', gender: 'Female', dob: '1998-11-30', address: '67 Library Rd, Madurai', state: 'Tamil Nadu', district: 'Madurai', tenth: 98, twelfth: 96, degree: 'B.A. Political Science', university: 'Lady Doak College', gradYear: 2020, hostel: 'Block B', room: 'B-801' },
  { id: 'STU019', name: 'Balaji Krishnamurthy', program: 'IFoS', batch: '2025-B', phone: '9876543228', email: 'balaji@dav.edu', attendance: 93, performance: 84, scholarship: 'Merit', status: 'Active', gender: 'Male', dob: '1997-07-08', address: '45 Green Valley, Ooty', state: 'Tamil Nadu', district: 'Nilgiris', tenth: 93, twelfth: 89, degree: 'B.Sc. Environmental Science', university: 'Bharathiar University', gradYear: 2019, hostel: 'Block A', room: 'A-601' },
  { id: 'STU020', name: 'Divya Bharathi', program: 'UPSC CSE', batch: '2024-A', phone: '9876543229', email: 'divya@dav.edu', attendance: 97, performance: 93, scholarship: 'Merit', status: 'Graduated', gender: 'Female', dob: '1997-03-25', address: '12 Nehru Nagar, Trichy', state: 'Tamil Nadu', district: 'Tiruchirappalli', tenth: 99, twelfth: 97, degree: 'B.A. Sociology', university: 'Bharathidasan University', gradYear: 2019, hostel: 'Block B', room: 'B-901' },
];

export const demoFaculty: Faculty[] = [
  { id: 'FAC001', name: 'Dr. Ramesh Iyer', photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop', designation: 'Senior Professor', subject: 'Political Science & Governance', experience: 18, expertise: ['Indian Polity', 'Governance', 'Constitution'], bio: 'Dr. Iyer has mentored over 200 successful UPSC candidates.', examCategory: 'UPSC CSE' },
  { id: 'FAC002', name: 'Prof. Sujatha Narayanan', photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=300&fit=crop', designation: 'Professor', subject: 'History', experience: 15, expertise: ['Ancient India', 'Modern India', 'World History'], bio: 'Prof. Sujatha specializes in making history engaging and exam-relevant.', examCategory: 'UPSC CSE' },
  { id: 'FAC003', name: 'Dr. Venkatesh Murthy', photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop', designation: 'Associate Professor', subject: 'Geography', experience: 12, expertise: ['Physical Geography', 'Indian Geography', 'Environment'], bio: 'Expert in geography with a focus on map-based learning.', examCategory: 'UPSC CSE' },
  { id: 'FAC004', name: 'Prof. Anand Kumar', photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&h=300&fit=crop', designation: 'Professor', subject: 'Economics', experience: 16, expertise: ['Indian Economy', 'International Economics', 'Budget Analysis'], bio: 'Known for simplifying complex economic concepts for aspirants.', examCategory: 'UPSC CSE' },
  { id: 'FAC005', name: 'Dr. Priya Rajan', photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&h=300&fit=crop', designation: 'Senior Lecturer', subject: 'Ethics & Essay', experience: 10, expertise: ['Ethics', 'Essay Writing', 'Case Studies'], bio: 'Dr. Priya focuses on developing ethical reasoning and writing skills.', examCategory: 'UPSC CSE' },
  { id: 'FAC006', name: 'Prof. Shankar Ganesh', photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&h=300&fit=crop', designation: 'Professor', subject: 'Science & Technology', experience: 14, expertise: ['Science & Tech', 'Space', 'Defence Technology'], bio: 'Prof. Shankar brings current affairs in S&T alive with real-world examples.', examCategory: 'UPSC CSE' },
  { id: 'FAC007', name: 'Dr. Meenakshi Sundaram', photo: 'https://images.unsplash.com/photo-1594824476967-48c8b964f137?w=300&h=300&fit=crop', designation: 'Lecturer', subject: 'Tamil Nadu Special', experience: 8, expertise: ['TN History', 'TN Geography', 'TN Admin'], bio: 'Specialist in Tamil Nadu-specific topics for TNPSC preparation.', examCategory: 'TNPSC' },
  { id: 'FAC008', name: 'Prof. David Raj', photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&h=300&fit=crop', designation: 'Senior Lecturer', subject: 'Current Affairs', experience: 11, expertise: ['National Affairs', 'International Relations', 'Government Schemes'], bio: 'Daily current affairs sessions with comprehensive coverage.', examCategory: 'UPSC CSE' },
  { id: 'FAC009', name: 'Dr. Lakshmi Priya', photo: 'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=300&h=300&fit=crop', designation: 'Associate Professor', subject: 'Public Administration', experience: 13, expertise: ['Public Administration', 'Governance', 'Administrative Law'], bio: 'Dr. Lakshmi has authored several reference books on public administration.', examCategory: 'UPSC CSE' },
  { id: 'FAC010', name: 'Prof. Ravi Chandran', photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop', designation: 'Professor', subject: 'Environment & Ecology', experience: 17, expertise: ['Environment', 'Biodiversity', 'Climate Change'], bio: 'Prof. Ravi is a leading expert on environmental studies for competitive exams.', examCategory: 'IFoS' },
];

export const demoAlumni: Alumni[] = [
  { id: 'ALM001', name: 'Arjun Krishnamurthy', photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop', year: 2022, air: 45, service: 'IAS', cadre: 'Tamil Nadu', optionalSubject: 'Political Science', currentDesignation: 'Sub-Collector', currentPosting: 'Madurai', testimonial: 'The residential program gave me the discipline and structured preparation I needed. The 24/7 library and peer learning environment were game-changers.', status: 'Verified', published: true },
  { id: 'ALM002', name: 'Kavya Sundaram', photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=300&fit=crop', year: 2022, air: 78, service: 'IPS', cadre: 'Kerala', optionalSubject: 'Sociology', currentDesignation: 'ASP', currentPosting: 'Kochi', testimonial: 'The mentorship program and mock interviews at DAV were instrumental in my success. The faculty was always available.', status: 'Verified', published: true },
  { id: 'ALM003', name: 'Ramesh Babu', photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop', year: 2023, air: 32, service: 'IAS', cadre: 'Tamil Nadu', optionalSubject: 'Public Administration', currentDesignation: 'Assistant Collector', currentPosting: 'Chennai', testimonial: 'The structured daily routine at DAV ensured consistent preparation. The test series was extremely helpful.', status: 'Verified', published: true },
  { id: 'ALM004', name: 'Sneha Ganesh', photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&h=300&fit=crop', year: 2023, air: 112, service: 'IFS', cadre: 'AGMUT', optionalSubject: 'Geography', currentDesignation: 'Third Secretary', currentPosting: 'MEA, New Delhi', testimonial: 'DAV\'s essay writing sessions and ethical case study discussions were the backbone of my preparation.', status: 'Verified', published: true },
  { id: 'ALM005', name: 'Prakash Raj', photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&h=300&fit=crop', year: 2023, air: 67, service: 'IPS', cadre: 'Maharashtra', optionalSubject: 'History', currentDesignation: 'ASP Trainee', currentPosting: 'SVPNPA Hyderabad', testimonial: 'The physical fitness sessions and current affairs module at DAV kept me sharp and focused throughout.', status: 'Verified', published: true },
  { id: 'ALM006', name: 'Meera Kumari', photo: 'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=300&h=300&fit=crop', year: 2024, air: 23, service: 'IAS', cadre: 'Tamil Nadu', optionalSubject: 'Tamil Literature', currentDesignation: 'IAS Trainee', currentPosting: 'LBSNAA Mussoorie', testimonial: 'Being a first-generation aspirant, the scholarship and residential support from DAV made my dream possible.', status: 'Verified', published: true },
  { id: 'ALM007', name: 'Dinesh Kumar', photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&h=300&fit=crop', year: 2024, air: 89, service: 'IRS', cadre: 'Tamil Nadu', optionalSubject: 'Economics', currentDesignation: 'IRS Trainee', currentPosting: 'NACIN Faridabad', testimonial: 'The economics optional classes and micro-teaching sessions at DAV were phenomenal.', status: 'Verified', published: true },
  { id: 'ALM008', name: 'Sangeetha Raman', photo: 'https://images.unsplash.com/photo-1594824476967-48c8b964f137?w=300&h=300&fit=crop', year: 2024, air: 156, service: 'IPoS', cadre: 'Tamil Nadu', optionalSubject: 'Sociology', currentDesignation: 'IPoS Trainee', currentPosting: 'Rafi Ahmed Kidwai NIPA', testimonial: 'The peer learning groups and weekly discussion forums at DAV broadened my perspective significantly.', status: 'Verified', published: true },
  { id: 'ALM009', name: 'Venkat Subramanian', photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&h=300&fit=crop', year: 2022, air: 201, service: 'IRTS', cadre: 'All India', optionalSubject: 'Geography', currentDesignation: 'Traffic Apprentice', currentPosting: 'Indian Railways', testimonial: 'DAV\'s geography optional coaching with maps and data analysis was exceptional.', status: 'Verified', published: true },
  { id: 'ALM010', name: 'Pooja Devi', photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=300&fit=crop', year: 2023, air: 145, service: 'IDAS', cadre: 'All India', optionalSubject: 'Political Science', currentDesignation: 'IDAS Probationer', currentPosting: 'NIFM Faridabad', testimonial: 'The disciplined routine and constant motivation from the Director sir kept me going through tough times.', status: 'Verified', published: true },
  { id: 'ALM011', name: 'Sathish Kumar', photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop', year: 2024, air: 56, service: 'IAS', cadre: 'Rajasthan', optionalSubject: 'Public Administration', currentDesignation: 'IAS Trainee', currentPosting: 'LBSNAA Mussoorie', testimonial: 'From a small village to clearing UPSC — DAV made the impossible possible. Forever grateful.', status: 'Verified', published: true },
  { id: 'ALM012', name: 'Anusha Reddy', photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&h=300&fit=crop', year: 2024, air: 178, service: 'IPS', cadre: 'Andhra Pradesh', optionalSubject: 'Sociology', currentDesignation: 'IPS Trainee', currentPosting: 'SVPNPA Hyderabad', testimonial: 'The mock interview panels with alumni IAS officers were incredibly realistic and helpful.', status: 'Verified', published: true },
  { id: 'ALM013', name: 'Manoj Pandian', photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop', year: 2022, air: 310, service: 'CAPF (AC)', cadre: 'BSF', optionalSubject: 'History', currentDesignation: 'Assistant Commandant', currentPosting: 'BSF Academy, Tekanpur', testimonial: 'The CAPF-specific coaching and physical training regimen at DAV was outstanding.', status: 'Verified', published: true },
  { id: 'ALM014', name: 'Rekha Balakrishnan', photo: 'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=300&h=300&fit=crop', year: 2023, air: 0, service: 'IFoS', cadre: 'All India', optionalSubject: 'Botany', currentDesignation: 'IFoS Trainee', currentPosting: 'IGNFA Dehradun', testimonial: 'DAV\'s focus on environment and ecology, combined with the botany optional classes, was perfect for IFoS.', status: 'Verified', published: true },
  { id: 'ALM015', name: 'Gopinath Raman', photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop', year: 2024, air: 420, service: 'IRAS', cadre: 'All India', optionalSubject: 'Economics', currentDesignation: 'IRAS Probationer', currentPosting: 'IRAS Training Centre', testimonial: 'The economics study group at DAV and faculty guidance helped me score 300+ in optional.', status: 'Verified', published: true },
];

export const demoApplications: Application[] = [
  { id: 'APP2025001', name: 'Harish Kumar', email: 'harish@gmail.com', phone: '9123456780', program: 'UPSC CSE', status: 'Submitted', date: '2025-08-01', gender: 'Male' },
  { id: 'APP2025002', name: 'Janani Priya', email: 'janani@gmail.com', phone: '9123456781', program: 'TNPSC', status: 'Under Review', date: '2025-08-03', gender: 'Female' },
  { id: 'APP2025003', name: 'Naveen Raj', email: 'naveen@gmail.com', phone: '9123456782', program: 'UPSC CSE', status: 'Documents Verified', date: '2025-07-28', gender: 'Male' },
  { id: 'APP2025004', name: 'Sowmya Devi', email: 'sowmya@gmail.com', phone: '9123456783', program: 'SSC CGL', status: 'Exam Scheduled', date: '2025-07-25', gender: 'Female' },
  { id: 'APP2025005', name: 'Thirumaran K', email: 'thiru@gmail.com', phone: '9123456784', program: 'UPSC CSE', status: 'Shortlisted', date: '2025-07-20', gender: 'Male' },
  { id: 'APP2025006', name: 'Bhavani S', email: 'bhavani@gmail.com', phone: '9123456785', program: 'IFoS', status: 'Interview', date: '2025-07-15', gender: 'Female' },
  { id: 'APP2025007', name: 'Ashwin Kumar', email: 'ashwin@gmail.com', phone: '9123456786', program: 'CAPF', status: 'Selected', date: '2025-07-10', gender: 'Male' },
  { id: 'APP2025008', name: 'Pavithra R', email: 'pavithra@gmail.com', phone: '9123456787', program: 'UPSC CSE', status: 'Rejected', date: '2025-07-05', gender: 'Female' },
  { id: 'APP2025009', name: 'Saravanan M', email: 'saravanan@gmail.com', phone: '9123456788', program: 'TNPSC', status: 'Submitted', date: '2025-08-05', gender: 'Male' },
  { id: 'APP2025010', name: 'Abinaya K', email: 'abinaya@gmail.com', phone: '9123456789', program: 'UPSC CSE', status: 'Under Review', date: '2025-08-04', gender: 'Female' },
  { id: 'APP2025011', name: 'Kumaran P', email: 'kumaran@gmail.com', phone: '9123456790', program: 'SSC CGL', status: 'Submitted', date: '2025-08-06', gender: 'Male' },
  { id: 'APP2025012', name: 'Ranjitha S', email: 'ranjitha@gmail.com', phone: '9123456791', program: 'IFoS', status: 'Documents Verified', date: '2025-07-30', gender: 'Female' },
  { id: 'APP2025013', name: 'Muthu Kumar', email: 'muthu@gmail.com', phone: '9123456792', program: 'UPSC CSE', status: 'Exam Scheduled', date: '2025-07-22', gender: 'Male' },
  { id: 'APP2025014', name: 'Dharani R', email: 'dharani@gmail.com', phone: '9123456793', program: 'TNPSC', status: 'Shortlisted', date: '2025-07-18', gender: 'Female' },
  { id: 'APP2025015', name: 'Vignesh S', email: 'vignesh@gmail.com', phone: '9123456794', program: 'CAPF', status: 'Submitted', date: '2025-08-07', gender: 'Male' },
  { id: 'APP2025016', name: 'Sridevi M', email: 'sridevi@gmail.com', phone: '9123456795', program: 'UPSC CSE', status: 'Under Review', date: '2025-08-02', gender: 'Female' },
  { id: 'APP2025017', name: 'Hari Prasad', email: 'hari@gmail.com', phone: '9123456796', program: 'SSC CGL', status: 'Selected', date: '2025-06-28', gender: 'Male' },
  { id: 'APP2025018', name: 'Yasodha K', email: 'yasodha@gmail.com', phone: '9123456797', program: 'TNPSC', status: 'Documents Verified', date: '2025-07-29', gender: 'Female' },
  { id: 'APP2025019', name: 'Raghul M', email: 'raghul@gmail.com', phone: '9123456798', program: 'UPSC CSE', status: 'Submitted', date: '2025-08-08', gender: 'Male' },
  { id: 'APP2025020', name: 'Tamilselvi K', email: 'tamilselvi@gmail.com', phone: '9123456799', program: 'IFoS', status: 'Submitted', date: '2025-08-09', gender: 'Female' },
];

export const demoNews: NewsItem[] = [
  { id: 'NEWS001', title: 'UPSC CSE 2025 Notification Released', category: 'Exam Updates', date: '2025-08-15', description: 'The UPSC has released the official notification for Civil Services Examination 2025.', content: 'Full article content...' },
  { id: 'NEWS002', title: 'DAV Students Excel in TNPSC Group I Prelims', category: 'Program Events', date: '2025-08-10', description: '85% of DAV residential students cleared the TNPSC Group I Preliminary examination.', content: 'Full article content...' },
  { id: 'NEWS003', title: 'Admissions Open for 2026-27 Batch', category: 'Admission Updates', date: '2025-08-08', description: 'Applications are now being accepted for the upcoming residential program batch.', content: 'Full article content...' },
  { id: 'NEWS004', title: 'Guest Lecture by IAS Topper 2024', category: 'Program Events', date: '2025-08-05', description: 'AIR 23 Meera Kumari will address current residential students on preparation strategies.', content: 'Full article content...' },
  { id: 'NEWS005', title: 'SSC CGL 2025 Exam Date Announced', category: 'Exam Updates', date: '2025-08-01', description: 'Staff Selection Commission has announced the tentative exam schedule for CGL 2025.', content: 'Full article content...' },
  { id: 'NEWS006', title: 'New Scholarship Scheme for SC/ST Students', category: 'Government Schemes', date: '2025-07-28', description: 'Government announces enhanced scholarship support for SC/ST aspirants in civil services.', content: 'Full article content...' },
  { id: 'NEWS007', title: 'Mock Test Series Batch 3 Registrations Open', category: 'Program Events', date: '2025-07-25', description: 'Register for the comprehensive mock test series covering Prelims and Mains.', content: 'Full article content...' },
  { id: 'NEWS008', title: 'IFoS 2025 Optional Subject Workshops', category: 'Program Events', date: '2025-07-20', description: 'Special workshops for IFoS optional subjects starting next month.', content: 'Full article content...' },
  { id: 'NEWS009', title: 'UPSC Interview Guidance Program Launch', category: 'Latest Notifications', date: '2025-07-15', description: 'Dedicated personality test preparation program for Mains-qualified candidates.', content: 'Full article content...' },
  { id: 'NEWS010', title: 'Annual DAV Sports Day & Cultural Fest', category: 'Program Events', date: '2025-07-10', description: 'Annual sports and cultural activities to promote holistic development of aspirants.', content: 'Full article content...' },
];

export const demoStudyMaterials: StudyMaterial[] = [
  { id: 'SM001', title: 'Indian Polity - Constitutional Framework', subject: 'Polity', type: 'PDF', date: '2025-08-01' },
  { id: 'SM002', title: 'Modern Indian History - Freedom Movement', subject: 'History', type: 'PDF', date: '2025-07-28' },
  { id: 'SM003', title: 'Physical Geography - Geomorphology', subject: 'Geography', type: 'PDF', date: '2025-07-25' },
  { id: 'SM004', title: 'Indian Economy - Banking & Finance', subject: 'Economy', type: 'PDF', date: '2025-07-22' },
  { id: 'SM005', title: 'Environment - Biodiversity Hotspots', subject: 'Environment', type: 'PDF', date: '2025-07-20' },
  { id: 'SM006', title: 'General Science - Physics for Prelims', subject: 'Science', type: 'PDF', date: '2025-07-18' },
  { id: 'SM007', title: 'Current Affairs - August 2025 Compilation', subject: 'Current Affairs', type: 'PDF', date: '2025-08-05' },
  { id: 'SM008', title: 'Ethics - Case Study Approach', subject: 'Ethics', type: 'PDF', date: '2025-07-15' },
  { id: 'SM009', title: 'Essay Writing - Structure & Examples', subject: 'Essay', type: 'PDF', date: '2025-07-12' },
  { id: 'SM010', title: 'Public Administration - Theories', subject: 'Optional Subjects', type: 'PDF', date: '2025-07-10' },
  { id: 'SM011', title: 'Ancient India - Indus Valley Civilization', subject: 'History', type: 'Video', date: '2025-07-08' },
  { id: 'SM012', title: 'Indian Geography - Monsoon System', subject: 'Geography', type: 'Video', date: '2025-07-05' },
  { id: 'SM013', title: 'Fundamental Rights - Article 14-32', subject: 'Polity', type: 'PDF', date: '2025-07-03' },
  { id: 'SM014', title: 'Government Schemes 2024-25', subject: 'Current Affairs', type: 'PDF', date: '2025-07-01' },
  { id: 'SM015', title: 'Climate Change & Paris Agreement', subject: 'Environment', type: 'PDF', date: '2025-06-28' },
  { id: 'SM016', title: 'Medieval India - Mughal Administration', subject: 'History', type: 'PDF', date: '2025-06-25' },
  { id: 'SM017', title: 'Economic Survey 2024-25 Analysis', subject: 'Economy', type: 'PDF', date: '2025-06-22' },
  { id: 'SM018', title: 'Tamil Nadu History - Chola Dynasty', subject: 'History', type: 'PDF', date: '2025-06-20' },
  { id: 'SM019', title: 'Space Technology - ISRO Missions', subject: 'Science', type: 'Video', date: '2025-06-18' },
  { id: 'SM020', title: 'International Relations - India & Neighbours', subject: 'Current Affairs', type: 'PDF', date: '2025-06-15' },
];

export const demoSuccessStories: SuccessStory[] = [
  { id: 'SS001', name: 'Arjun Krishnamurthy', year: 2022, exam: 'UPSC CSE', rank: 45, service: 'IAS', story: 'From a small town in Tamil Nadu, Arjun\'s journey to the IAS is a testament to disciplined residential preparation.', photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop', category: 'UPSC CSE' },
  { id: 'SS002', name: 'Kavya Sundaram', year: 2022, exam: 'UPSC CSE', rank: 78, service: 'IPS', story: 'Kavya credits the mock interview sessions and ethical case study discussions for her success in the UPSC.', photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=300&fit=crop', category: 'UPSC CSE' },
  { id: 'SS003', name: 'Manoj Pandian', year: 2022, exam: 'UPSC CAPF', rank: 12, service: 'CAPF (AC)', story: 'The physical training regimen and specific CAPF coaching at DAV prepared Manoj perfectly.', photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop', category: 'CAPF' },
  { id: 'SS004', name: 'Ramesh Babu', year: 2023, exam: 'UPSC CSE', rank: 32, service: 'IAS', story: 'Consistent test series and personalized mentorship helped Ramesh secure a top rank.', photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop', category: 'UPSC CSE' },
  { id: 'SS005', name: 'Rekha Balakrishnan', year: 2023, exam: 'IFoS', rank: 8, service: 'IFoS', story: 'DAV\'s environment and botany optional classes made the IFoS preparation comprehensive and effective.', photo: 'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=300&h=300&fit=crop', category: 'IFoS' },
  { id: 'SS006', name: 'Meera Kumari', year: 2024, exam: 'UPSC CSE', rank: 23, service: 'IAS', story: 'A first-generation aspirant, Meera\'s story of scholarship support and relentless determination inspires all.', photo: 'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=300&h=300&fit=crop', category: 'UPSC CSE' },
  { id: 'SS007', name: 'Sathish Kumar', year: 2024, exam: 'UPSC CSE', rank: 56, service: 'IAS', story: 'From a village to clearing UPSC — Sathish\'s journey showcases the power of structured residential preparation.', photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop', category: 'UPSC CSE' },
  { id: 'SS008', name: 'Anusha Reddy', year: 2024, exam: 'UPSC CSE', rank: 178, service: 'IPS', story: 'Anusha credits DAV\'s mock interviews with alumni IAS officers for building her confidence.', photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&h=300&fit=crop', category: 'UPSC CSE' },
  { id: 'SS009', name: 'Dharani R', year: 2023, exam: 'TNPSC Group I', rank: 5, service: 'Deputy Collector', story: 'Targeted TNPSC preparation with Tamil Nadu-specific coaching helped Dharani secure a top rank.', photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=300&fit=crop', category: 'TNPSC' },
  { id: 'SS010', name: 'Hari Prasad', year: 2024, exam: 'SSC CGL', rank: 15, service: 'Income Tax Inspector', story: 'DAV\'s SSC-focused batch with daily practice and mock tests helped Hari achieve his goal.', photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&h=300&fit=crop', category: 'SSC' },
];

export const demoTestResults: TestResult[] = [
  { id: 'TR001', testName: 'Prelims Mock Test 1', studentId: 'STU001', studentName: 'Arun Kumar', subject: 'General Studies', marks: 112, totalMarks: 200, rank: 3, date: '2025-07-01' },
  { id: 'TR002', testName: 'Prelims Mock Test 1', studentId: 'STU002', studentName: 'Priya Sharma', subject: 'General Studies', marks: 128, totalMarks: 200, rank: 1, date: '2025-07-01' },
  { id: 'TR003', testName: 'Prelims Mock Test 1', studentId: 'STU005', studentName: 'Karthik Sundaram', subject: 'General Studies', marks: 118, totalMarks: 200, rank: 2, date: '2025-07-01' },
  { id: 'TR004', testName: 'Mains GS Paper I', studentId: 'STU001', studentName: 'Arun Kumar', subject: 'History & Culture', marks: 95, totalMarks: 250, rank: 5, date: '2025-07-15' },
  { id: 'TR005', testName: 'Mains GS Paper I', studentId: 'STU002', studentName: 'Priya Sharma', subject: 'History & Culture', marks: 110, totalMarks: 250, rank: 2, date: '2025-07-15' },
  { id: 'TR006', testName: 'CSAT Mock Test 1', studentId: 'STU001', studentName: 'Arun Kumar', subject: 'CSAT', marks: 85, totalMarks: 200, rank: 8, date: '2025-07-08' },
  { id: 'TR007', testName: 'Prelims Mock Test 2', studentId: 'STU011', studentName: 'Ganesh Prabhu', subject: 'General Studies', marks: 132, totalMarks: 200, rank: 1, date: '2025-07-20' },
  { id: 'TR008', testName: 'Prelims Mock Test 2', studentId: 'STU018', studentName: 'Revathi Sundari', subject: 'General Studies', marks: 125, totalMarks: 200, rank: 2, date: '2025-07-20' },
  { id: 'TR009', testName: 'Ethics Case Study', studentId: 'STU002', studentName: 'Priya Sharma', subject: 'Ethics', marks: 42, totalMarks: 50, rank: 1, date: '2025-07-25' },
  { id: 'TR010', testName: 'Essay Test 1', studentId: 'STU014', studentName: 'Meena Kumari', subject: 'Essay', marks: 105, totalMarks: 250, rank: 3, date: '2025-07-28' },
  { id: 'TR011', testName: 'TNPSC Mock 1', studentId: 'STU003', studentName: 'Rajesh Venkataraman', subject: 'TN General Studies', marks: 138, totalMarks: 200, rank: 2, date: '2025-07-10' },
  { id: 'TR012', testName: 'TNPSC Mock 1', studentId: 'STU008', studentName: 'Nithya Krishnan', subject: 'TN General Studies', marks: 145, totalMarks: 200, rank: 1, date: '2025-07-10' },
  { id: 'TR013', testName: 'SSC Mock 1', studentId: 'STU004', studentName: 'Deepa Murugan', subject: 'Quantitative Aptitude', marks: 42, totalMarks: 50, rank: 1, date: '2025-07-12' },
  { id: 'TR014', testName: 'Mains GS Paper II', studentId: 'STU005', studentName: 'Karthik Sundaram', subject: 'Governance', marks: 102, totalMarks: 250, rank: 4, date: '2025-07-30' },
  { id: 'TR015', testName: 'Prelims Mock Test 3', studentId: 'STU001', studentName: 'Arun Kumar', subject: 'General Studies', marks: 122, totalMarks: 200, rank: 2, date: '2025-08-01' },
  { id: 'TR016', testName: 'Prelims Mock Test 3', studentId: 'STU011', studentName: 'Ganesh Prabhu', subject: 'General Studies', marks: 138, totalMarks: 200, rank: 1, date: '2025-08-01' },
  { id: 'TR017', testName: 'Geography Optional Test', studentId: 'STU019', studentName: 'Balaji Krishnamurthy', subject: 'Geography', marks: 88, totalMarks: 250, rank: 1, date: '2025-08-03' },
  { id: 'TR018', testName: 'IFoS Paper I', studentId: 'STU006', studentName: 'Lakshmi Narayanan', subject: 'Forestry', marks: 95, totalMarks: 200, rank: 1, date: '2025-08-05' },
  { id: 'TR019', testName: 'Current Affairs Weekly', studentId: 'STU009', studentName: 'Suresh Babu', subject: 'Current Affairs', marks: 38, totalMarks: 50, rank: 3, date: '2025-08-07' },
  { id: 'TR020', testName: 'Interview Mock 1', studentId: 'STU020', studentName: 'Divya Bharathi', subject: 'Personality Test', marks: 185, totalMarks: 275, rank: 1, date: '2025-08-08' },
];

export const demoAttendance: AttendanceRecord[] = Array.from({ length: 30 }, (_, i) => ({
  id: `ATT${String(i + 1).padStart(3, '0')}`,
  studentId: demoStudents[i % 20].id,
  studentName: demoStudents[i % 20].name,
  date: `2025-08-${String((i % 28) + 1).padStart(2, '0')}`,
  status: (['Present', 'Present', 'Present', 'Present', 'Absent', 'Leave'] as const)[i % 6],
  batch: demoStudents[i % 20].batch,
}));

export const demoPayments: Payment[] = [
  { id: 'PAY001', studentId: 'STU001', studentName: 'Arun Kumar', category: 'Program Fee', amount: 50000, method: 'UPI', status: 'Completed', date: '2025-06-15', transactionId: 'TXN20250615001' },
  { id: 'PAY002', studentId: 'STU002', studentName: 'Priya Sharma', category: 'Program Fee', amount: 50000, method: 'Net Banking', status: 'Completed', date: '2025-06-15', transactionId: 'TXN20250615002' },
  { id: 'PAY003', studentId: 'STU003', studentName: 'Rajesh Venkataraman', category: 'Hostel Fee', amount: 30000, method: 'UPI', status: 'Completed', date: '2025-06-20', transactionId: 'TXN20250620003' },
  { id: 'PAY004', studentId: 'STU004', studentName: 'Deepa Murugan', category: 'Test Series Fee', amount: 5000, method: 'Credit Card', status: 'Completed', date: '2025-07-01', transactionId: 'TXN20250701004' },
  { id: 'PAY005', studentId: 'STU005', studentName: 'Karthik Sundaram', category: 'Program Fee', amount: 50000, method: 'Debit Card', status: 'Pending', date: '2025-08-01', transactionId: 'TXN20250801005' },
];

export const demoScholarshipApps: ScholarshipApp[] = [
  { id: 'SCH001', studentName: 'Priya Sharma', type: 'Academic Excellence', amount: 25000, status: 'Approved', date: '2025-06-01' },
  { id: 'SCH002', studentName: 'Rajesh Venkataraman', type: 'Need-Based', amount: 40000, status: 'Approved', date: '2025-06-05' },
  { id: 'SCH003', studentName: 'Lakshmi Narayanan', type: 'Social Support', amount: 35000, status: 'Approved', date: '2025-06-10' },
  { id: 'SCH004', studentName: 'Meena Kumari', type: 'Need-Based', amount: 40000, status: 'Pending', date: '2025-07-15' },
  { id: 'SCH005', studentName: 'Anitha Devi', type: 'Social Support', amount: 35000, status: 'Approved', date: '2025-06-20' },
  { id: 'SCH006', studentName: 'Senthil Kumar', type: 'Merit', amount: 20000, status: 'Rejected', date: '2025-07-01' },
  { id: 'SCH007', studentName: 'Ganesh Prabhu', type: 'Academic Excellence', amount: 25000, status: 'Approved', date: '2025-06-25' },
  { id: 'SCH008', studentName: 'Revathi Sundari', type: 'Academic Excellence', amount: 25000, status: 'Pending', date: '2025-07-20' },
];

export const demoNotifications: Notification[] = [
  { id: 'NOT001', title: 'Prelims Mock Test 4 Scheduled', message: 'Mock Test 4 is scheduled for August 15, 2025. All UPSC CSE batch students must attend.', type: 'Exam', date: '2025-08-10', read: false, channel: 'Email' },
  { id: 'NOT002', title: 'Hostel Fee Due Reminder', message: 'Hostel fee for Q3 2025 is due by August 20. Please clear your dues.', type: 'Fee', date: '2025-08-08', read: false, channel: 'SMS' },
  { id: 'NOT003', title: 'Guest Lecture by IAS Officer', message: 'IAS Meera Kumari (AIR 23, 2024) will deliver a guest lecture on August 12.', type: 'Academic', date: '2025-08-05', read: true, channel: 'Push Notification' },
  { id: 'NOT004', title: 'Scholarship Results Announced', message: 'Academic Excellence Scholarship results for 2025-26 have been announced.', type: 'Scholarship', date: '2025-08-01', read: true, channel: 'Email' },
  { id: 'NOT005', title: 'Library Hours Extended', message: 'Library will remain open 24 hours during the exam preparation period.', type: 'Academic', date: '2025-07-28', read: true, channel: 'Push Notification' },
];

export const demoGallery: GalleryImage[] = [
  { id: 'GAL001', url: 'https://images.unsplash.com/photo-1562774053-701939374585?w=600&h=400&fit=crop', category: 'Campus', caption: 'DAV Campus Main Building' },
  { id: 'GAL002', url: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&h=400&fit=crop', category: 'Classrooms', caption: 'Modern Classroom Facilities' },
  { id: 'GAL003', url: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=600&h=400&fit=crop', category: 'Hostel', caption: 'Residential Hostel Block' },
  { id: 'GAL004', url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=400&fit=crop', category: 'Events', caption: 'Annual Convocation Ceremony' },
  { id: 'GAL005', url: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&h=400&fit=crop', category: 'Classrooms', caption: 'Interactive Teaching Sessions' },
  { id: 'GAL006', url: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&h=400&fit=crop', category: 'Events', caption: 'Graduation Day Celebrations' },
  { id: 'GAL007', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop', category: 'Felicitation', caption: 'Felicitation of UPSC Toppers' },
  { id: 'GAL008', url: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&h=400&fit=crop', category: 'Campus', caption: '24/7 Library Facility' },
  { id: 'GAL009', url: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&h=400&fit=crop', category: 'Student Activities', caption: 'Group Discussion Sessions' },
  { id: 'GAL010', url: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=400&fit=crop', category: 'Workshops', caption: 'Essay Writing Workshop' },
  { id: 'GAL011', url: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600&h=400&fit=crop', category: 'Campus', caption: 'Study Cabins & Reading Area' },
  { id: 'GAL012', url: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?w=600&h=400&fit=crop', category: 'Events', caption: 'Independence Day Celebration' },
];

export const performanceData = [
  { year: 2022, enrolled: 100, prelims: 60, mains: 25, interview: 10, selected: 6 },
  { year: 2023, enrolled: 120, prelims: 72, mains: 31, interview: 12, selected: 8 },
  { year: 2024, enrolled: 150, prelims: 90, mains: 40, interview: 16, selected: 10 },
  { year: 2025, enrolled: 180, prelims: 108, mains: 48, interview: 20, selected: 13 },
];

// Auth demo users
export const demoUsers = [
  { username: 'admin', password: 'Admin@123', role: 'admin' as const },
  { username: 'testStuent', password: 'password#1', role: 'student' as const },
  { username: 'teststaff', password: 'password#1', role: 'staff' as const },
];
