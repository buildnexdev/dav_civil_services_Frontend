/* ──────────────────────────────────────────────────────────────
   programsData.ts
   Central data source for all DAV Civil Services programmes.
   Each programme has fully unique, professional content.
   ────────────────────────────────────────────────────────────── */

export interface ExamStage {
  stage: string;
  description: string;
}

export interface CoursePhase {
  phase: string;
  title: string;
  description: string;
}

export interface Feature {
  title: string;
  description: string;
  icon: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface Program {
  id: number;
  name: string;
  slug: string;
  shortDescription: string;
  category: string;
  icon: string;
  tagline: string;
  overview: string;
  preparationAreas: string[];
  examStructure: ExamStage[];
  courseStructure: CoursePhase[];
  whyChoose: Feature[];
  residentialFeatures: Feature[];
  teachingMethodology: string[];
  admissionSteps: string[];
  faqs: FAQ[];
}

/* ================================================================
   PROGRAMME DATA
   ================================================================ */

const programsData: Program[] = [
  /* ─── 1. UPSC Civil Services ─────────────────────────────── */
  {
    id: 1,
    name: 'UPSC Civil Services',
    slug: 'upsc-civil-services',
    shortDescription:
      'Comprehensive preparation for the UPSC Civil Services Examination with structured guidance for Prelims, Mains and Personality Test, supported by current affairs, answer writing and personalised mentorship.',
    category: 'UPSC',
    icon: '⚖',
    tagline: 'Prepare with Purpose. Serve with Excellence.',
    overview:
      'The UPSC Civil Services Programme is designed for aspirants preparing for the Civil Services Examination conducted by the Union Public Service Commission. The programme provides structured preparation for the Preliminary Examination, Main Examination and Personality Test. Students receive guidance across General Studies, CSAT, Essay, current affairs, answer writing and optional subjects, supported by regular tests, evaluations and personalised mentorship.',
    preparationAreas: [
      'General Studies',
      'CSAT',
      'Current Affairs',
      'Essay',
      'Answer Writing',
      'Optional Subject Guidance',
      'Prelims & Mains Test Series',
      'Personality Test Guidance',
    ],
    examStructure: [
      {
        stage: 'Preliminary Examination',
        description:
          'Two objective-type papers — General Studies Paper I and CSAT Paper II. Qualifying stage for the Main Examination.',
      },
      {
        stage: 'Main Examination',
        description:
          'Nine descriptive papers covering Essay, General Studies (I–IV), Optional Subject (I–II) and qualifying Language papers.',
      },
      {
        stage: 'Personality Test',
        description:
          'A structured interview conducted by the UPSC board assessing personality, communication and overall suitability.',
      },
    ],
    courseStructure: [
      {
        phase: 'Phase 1',
        title: 'Foundation',
        description:
          'Building strong conceptual fundamentals across all General Studies subjects and CSAT.',
      },
      {
        phase: 'Phase 2',
        title: 'Advanced Preparation',
        description:
          'In-depth coverage of advanced topics, current affairs integration and optional subject preparation.',
      },
      {
        phase: 'Phase 3',
        title: 'Prelims Intensive',
        description:
          'Focused revision, full-length mock tests and strategy refinement for the Preliminary Examination.',
      },
      {
        phase: 'Phase 4',
        title: 'Mains & Answer Writing',
        description:
          'Intensive answer-writing practice, essay workshops and individual evaluation for the Main Examination.',
      },
      {
        phase: 'Phase 5',
        title: 'Interview Guidance',
        description:
          'Mock interviews, personality development sessions and current-affairs discussions for the Personality Test.',
      },
    ],
    whyChoose: [
      { title: 'Expert Mentorship', description: 'One-on-one guidance from experienced mentors with deep knowledge of the UPSC process.', icon: '🎓' },
      { title: 'Structured Curriculum', description: 'A well-planned syllabus covering every aspect of the Civil Services Examination.', icon: '📋' },
      { title: 'Residential Learning', description: 'A disciplined campus environment designed for focused, distraction-free preparation.', icon: '🏛' },
      { title: 'Daily Study Schedule', description: 'Guided study hours ensuring consistent and productive daily preparation.', icon: '⏰' },
      { title: 'Regular Assessments', description: 'Weekly tests, sectional assessments and full-length mock examinations.', icon: '📝' },
      { title: 'Current Affairs Analysis', description: 'Daily current-affairs sessions covering national and international developments.', icon: '📰' },
      { title: 'Personalised Guidance', description: 'Individual feedback, performance tracking and strategy sessions.', icon: '🎯' },
      { title: 'Answer Writing Practice', description: 'Extensive Mains answer-writing sessions with detailed evaluation.', icon: '✍' },
      { title: 'Performance Tracking', description: 'Data-driven analysis of test performance to identify strengths and improvement areas.', icon: '📊' },
      { title: 'Interview Preparation', description: 'Mock interviews and personality development for the UPSC Personality Test.', icon: '💬' },
    ],
    residentialFeatures: [
      { title: 'Residential Accommodation', description: 'Comfortable hostel facilities within the campus for a focused academic experience.', icon: '🏠' },
      { title: 'Guided Study Hours', description: 'Structured self-study periods with mentor availability for doubt resolution.', icon: '📚' },
      { title: 'Library & Reading Space', description: 'Well-stocked library with reference materials, newspapers and journals.', icon: '📖' },
      { title: 'Mentorship', description: 'Regular mentorship sessions to address academic and personal challenges.', icon: '🤝' },
      { title: 'Peer Learning', description: 'Group discussions, debates and collaborative study sessions among aspirants.', icon: '👥' },
      { title: 'Test & Evaluation', description: 'Regular testing with detailed performance analysis and feedback.', icon: '✅' },
      { title: 'Academic Discipline', description: 'A structured daily routine that instils discipline and consistency.', icon: '📅' },
      { title: 'Student Support', description: 'Counselling and support services to maintain motivation and well-being.', icon: '💪' },
    ],
    teachingMethodology: [
      'Interactive classroom sessions with experienced faculty',
      'Daily current-affairs analysis and discussion',
      'Weekly answer-writing practice with individual evaluation',
      'Sectional and full-length mock tests under exam conditions',
      'One-on-one mentorship and doubt-resolution sessions',
      'Group discussions and peer-learning sessions',
      'Regular revision workshops and strategy sessions',
    ],
    admissionSteps: [
      'Enquiry',
      'Counselling',
      'Application',
      'Selection / Eligibility Verification',
      'Admission',
      'Residential Onboarding',
    ],
    faqs: [
      {
        question: 'What is the duration of the UPSC Civil Services programme?',
        answer:
          'The programme is structured as a comprehensive residential course covering the complete UPSC Civil Services preparation cycle, including Prelims, Mains and Interview stages.',
      },
      {
        question: 'Is optional subject coaching provided?',
        answer:
          'Yes, guidance for popular optional subjects is provided as part of the programme. Students receive dedicated coaching and answer-writing practice for their chosen optional.',
      },
      {
        question: 'Are study materials provided?',
        answer:
          'Yes, comprehensive study materials, current-affairs compilations and test-series booklets are provided to all enrolled students.',
      },
      {
        question: 'Is residential accommodation mandatory?',
        answer:
          'The programme is designed as a residential course to maximise preparation quality. Residential accommodation is included as part of the programme.',
      },
      {
        question: 'How are mock tests conducted?',
        answer:
          'Mock tests are conducted regularly under real examination conditions, including full-length Prelims and Mains simulations with detailed evaluation and ranking.',
      },
    ],
  },

  /* ─── 2. TNPSC Group I ──────────────────────────────────── */
  {
    id: 2,
    name: 'TNPSC Group I',
    slug: 'tnpsc-group-i',
    shortDescription:
      'Focused preparation for TNPSC Group I with comprehensive coverage of Tamil Nadu-specific subjects, General Studies, current affairs, aptitude and examination-oriented practice.',
    category: 'TNPSC',
    icon: '🏛',
    tagline: 'Lead Tamil Nadu. Shape the Future.',
    overview:
      'The TNPSC Group I Programme prepares aspirants for the Group I Services examination conducted by the Tamil Nadu Public Service Commission. The programme combines in-depth conceptual learning with extensive practice and examination-oriented preparation. Special emphasis is given to Tamil Nadu history, culture, polity, economy, geography, development administration, current affairs and other subjects relevant to the Group I examination.',
    preparationAreas: [
      'Tamil Nadu History & Culture',
      'Indian Polity',
      'Economy',
      'Geography',
      'Science & Technology',
      'Current Affairs',
      'Aptitude',
      'Answer Writing',
      'Mock Tests',
    ],
    examStructure: [
      {
        stage: 'Preliminary Examination',
        description:
          'Objective-type examination covering General Studies, aptitude and mental ability.',
      },
      {
        stage: 'Main Examination',
        description:
          'Descriptive papers covering General Studies, Tamil Nadu-specific subjects and current affairs.',
      },
      {
        stage: 'Interview / Oral Test',
        description:
          'Personality assessment evaluating communication, knowledge and overall suitability.',
      },
    ],
    courseStructure: [
      { phase: 'Phase 1', title: 'Foundation', description: 'Core conceptual coverage of all General Studies subjects and Tamil Nadu affairs.' },
      { phase: 'Phase 2', title: 'Advanced Study', description: 'In-depth preparation of Tamil Nadu history, polity, economy and development administration.' },
      { phase: 'Phase 3', title: 'Prelims Focus', description: 'Intensive revision, mock tests and previous-year question practice for the Preliminary Examination.' },
      { phase: 'Phase 4', title: 'Mains Preparation', description: 'Answer-writing practice, essay preparation and descriptive examination strategy.' },
      { phase: 'Phase 5', title: 'Interview Coaching', description: 'Mock interviews, personality assessment and current-affairs discussion.' },
    ],
    whyChoose: [
      { title: 'TNPSC-Focused Faculty', description: 'Mentors with deep expertise in Tamil Nadu Public Service Commission examination patterns.', icon: '🎓' },
      { title: 'Tamil Nadu Specialisation', description: 'Comprehensive coverage of Tamil Nadu history, culture, polity and economy.', icon: '📋' },
      { title: 'Residential Environment', description: 'A disciplined campus setting supporting focused daily preparation.', icon: '🏛' },
      { title: 'Daily Schedule', description: 'Guided study hours with structured preparation across all subjects.', icon: '⏰' },
      { title: 'Regular Testing', description: 'Prelims and Mains mock tests with detailed analysis and performance tracking.', icon: '📝' },
      { title: 'Current Affairs', description: 'Daily sessions focused on Tamil Nadu and national current affairs.', icon: '📰' },
      { title: 'Individual Mentorship', description: 'Personalised guidance, doubt resolution and strategy sessions.', icon: '🎯' },
      { title: 'Answer Writing', description: 'Mains-oriented answer-writing workshops with individual feedback.', icon: '✍' },
    ],
    residentialFeatures: [
      { title: 'Residential Accommodation', description: 'Campus hostel for a focused and structured preparation experience.', icon: '🏠' },
      { title: 'Guided Study Hours', description: 'Dedicated self-study periods with mentor availability.', icon: '📚' },
      { title: 'Library & Reading Space', description: 'Comprehensive library with Tamil Nadu-specific reference materials.', icon: '📖' },
      { title: 'Mentorship', description: 'Regular one-on-one mentorship sessions.', icon: '🤝' },
      { title: 'Peer Learning', description: 'Group discussions and collaborative study.', icon: '👥' },
      { title: 'Test & Evaluation', description: 'Regular testing with ranking and feedback.', icon: '✅' },
      { title: 'Academic Discipline', description: 'Structured daily routine for consistent preparation.', icon: '📅' },
      { title: 'Student Support', description: 'Counselling and motivational support.', icon: '💪' },
    ],
    teachingMethodology: [
      'Classroom sessions with TNPSC-experienced faculty',
      'Daily current-affairs discussions focused on Tamil Nadu',
      'Weekly answer-writing practice and evaluation',
      'Full-length mock tests under exam conditions',
      'One-on-one mentorship and doubt-clearing sessions',
      'Group discussions and peer-learning activities',
      'Regular revision and strategy workshops',
    ],
    admissionSteps: ['Enquiry', 'Counselling', 'Application', 'Selection / Eligibility Verification', 'Admission', 'Residential Onboarding'],
    faqs: [
      { question: 'What subjects are covered for TNPSC Group I?', answer: 'The programme covers General Studies, Tamil Nadu history and culture, Indian polity, economy, geography, science and technology, current affairs, aptitude and answer writing.' },
      { question: 'Is Tamil medium coaching available?', answer: 'The programme is designed to support aspirants preparing in both English and Tamil mediums. Faculty provide guidance in both languages where applicable.' },
      { question: 'Are previous-year questions covered?', answer: 'Yes, extensive analysis of previous-year TNPSC Group I question papers is an integral part of the preparation strategy.' },
      { question: 'How often are mock tests conducted?', answer: 'Mock tests are conducted regularly, including sectional tests and full-length simulations under examination conditions.' },
      { question: 'Is interview coaching included?', answer: 'Yes, mock interviews and personality development sessions are provided as part of the comprehensive programme.' },
    ],
  },

  /* ─── 3. TNPSC Group II / IIA ───────────────────────────── */
  {
    id: 3,
    name: 'TNPSC Group II / IIA',
    slug: 'tnpsc-group-ii-iia',
    shortDescription:
      'Structured preparation for TNPSC Group II and IIA examinations with strong conceptual learning, Tamil Nadu-focused content, current affairs and extensive test practice.',
    category: 'TNPSC',
    icon: '📑',
    tagline: 'Build Your Foundation for State Services.',
    overview:
      'The TNPSC Group II / IIA Programme prepares aspirants for competitive examinations conducted by the Tamil Nadu Public Service Commission for Group II and Group IIA services. The programme combines conceptual learning with extensive practice and examination-oriented preparation, with special emphasis on Tamil Nadu-specific subjects, development administration, current affairs and aptitude.',
    preparationAreas: [
      'General Studies',
      'Tamil Nadu Development Administration',
      'Indian Polity',
      'History',
      'Economy',
      'Geography',
      'Current Affairs',
      'Aptitude & Mental Ability',
      'Mock Tests',
    ],
    examStructure: [
      { stage: 'Preliminary Examination', description: 'Objective-type paper covering General Studies, aptitude and mental ability for Group II.' },
      { stage: 'Main Examination', description: 'Descriptive papers covering General Studies, Tamil Nadu affairs, Indian polity and related subjects.' },
      { stage: 'Group IIA (Direct)', description: 'Objective-type recruitment examination for specific Group IIA posts conducted by TNPSC.' },
    ],
    courseStructure: [
      { phase: 'Phase 1', title: 'Foundation', description: 'Core subject coverage across General Studies, polity, history and economy.' },
      { phase: 'Phase 2', title: 'Tamil Nadu Focus', description: 'In-depth study of Tamil Nadu administration, history, culture and governance.' },
      { phase: 'Phase 3', title: 'Prelims Intensive', description: 'Focused objective-type practice, revision and speed-building for Prelims.' },
      { phase: 'Phase 4', title: 'Mains Preparation', description: 'Descriptive answer-writing practice and examination strategy development.' },
    ],
    whyChoose: [
      { title: 'TNPSC Expertise', description: 'Faculty with proven experience in TNPSC Group II/IIA examination coaching.', icon: '🎓' },
      { title: 'Tamil Nadu Focus', description: 'Dedicated coverage of Tamil Nadu administration, history and development.', icon: '📋' },
      { title: 'Residential Campus', description: 'Focused learning environment with daily structured preparation.', icon: '🏛' },
      { title: 'Regular Testing', description: 'Frequent sectional and full-length mock tests with analysis.', icon: '📝' },
      { title: 'Current Affairs', description: 'Daily current-affairs sessions relevant to TNPSC examinations.', icon: '📰' },
      { title: 'Doubt Resolution', description: 'Accessible faculty for regular doubt-clearing sessions.', icon: '🎯' },
      { title: 'Aptitude Training', description: 'Dedicated aptitude and mental ability coaching with speed-building exercises.', icon: '🧮' },
      { title: 'Performance Tracking', description: 'Individual performance analysis and improvement guidance.', icon: '📊' },
    ],
    residentialFeatures: [
      { title: 'Residential Accommodation', description: 'Hostel facilities within the campus.', icon: '🏠' },
      { title: 'Guided Study Hours', description: 'Structured self-study with mentor availability.', icon: '📚' },
      { title: 'Library Access', description: 'Reference materials and current-affairs resources.', icon: '📖' },
      { title: 'Mentorship', description: 'Regular mentorship and guidance sessions.', icon: '🤝' },
      { title: 'Peer Learning', description: 'Collaborative study and group discussions.', icon: '👥' },
      { title: 'Test & Evaluation', description: 'Regular assessments with detailed feedback.', icon: '✅' },
      { title: 'Academic Discipline', description: 'Daily routine for consistent preparation.', icon: '📅' },
      { title: 'Student Support', description: 'Academic and motivational support.', icon: '💪' },
    ],
    teachingMethodology: [
      'Interactive classroom sessions covering TNPSC-relevant subjects',
      'Current-affairs analysis with Tamil Nadu focus',
      'Objective-type and descriptive practice sessions',
      'Mock tests under real examination conditions',
      'Individual mentorship and doubt-clearing',
      'Group discussions and peer learning',
    ],
    admissionSteps: ['Enquiry', 'Counselling', 'Application', 'Selection / Eligibility Verification', 'Admission', 'Residential Onboarding'],
    faqs: [
      { question: 'Does the programme cover both Group II and Group IIA?', answer: 'Yes, the programme is designed to prepare aspirants for both Group II and Group IIA examinations conducted by TNPSC.' },
      { question: 'What is the difference between Group II and Group IIA?', answer: 'Group II involves a multi-stage process (Prelims + Mains), while Group IIA is typically a direct recruitment through an objective-type examination.' },
      { question: 'Is aptitude training included?', answer: 'Yes, dedicated aptitude and mental ability sessions are part of the curriculum with regular practice exercises.' },
      { question: 'Are study materials provided?', answer: 'Yes, comprehensive study materials and current-affairs compilations are provided to all students.' },
    ],
  },

  /* ─── 4. TNPSC Group IV ─────────────────────────────────── */
  {
    id: 4,
    name: 'TNPSC Group IV',
    slug: 'tnpsc-group-iv',
    shortDescription:
      'Exam-focused preparation for TNPSC Group IV with systematic coverage of General Studies, Tamil language, aptitude, current affairs and previous-year questions.',
    category: 'TNPSC',
    icon: '📄',
    tagline: 'Your First Step into Government Service.',
    overview:
      'The TNPSC Group IV Programme is designed for candidates preparing for the Combined Civil Services Examination (Group IV) conducted by the Tamil Nadu Public Service Commission. The programme provides systematic coverage of General Studies, General Tamil/English, aptitude, mental ability, current affairs and extensive practice with previous-year questions.',
    preparationAreas: [
      'General Studies',
      'Tamil Language',
      'Aptitude',
      'Mental Ability',
      'Tamil Nadu History',
      'Current Affairs',
      'Previous-Year Questions',
      'Full-Length Tests',
    ],
    examStructure: [
      { stage: 'Single-Stage Examination', description: 'Objective-type examination covering General Studies and General Tamil/English in a single paper.' },
      { stage: 'Certificate Verification', description: 'Document verification and eligibility confirmation for qualified candidates.' },
    ],
    courseStructure: [
      { phase: 'Phase 1', title: 'Foundation', description: 'Core coverage of General Studies, Tamil language and basic concepts.' },
      { phase: 'Phase 2', title: 'Subject Mastery', description: 'In-depth preparation of all subjects with focus on frequently tested topics.' },
      { phase: 'Phase 3', title: 'Practice & Revision', description: 'Intensive practice with previous-year questions, mock tests and revision.' },
    ],
    whyChoose: [
      { title: 'Focused Preparation', description: 'Targeted coaching specifically designed for TNPSC Group IV requirements.', icon: '🎓' },
      { title: 'Tamil & English Support', description: 'Language paper preparation in both Tamil and English mediums.', icon: '📋' },
      { title: 'Previous-Year Analysis', description: 'Thorough analysis of previous-year Group IV question papers.', icon: '📝' },
      { title: 'Speed Training', description: 'Exercises to improve speed and accuracy for objective-type examinations.', icon: '⚡' },
      { title: 'Current Affairs', description: 'Regular current-affairs sessions covering relevant developments.', icon: '📰' },
      { title: 'Mentor Support', description: 'Accessible faculty for doubt clearing and guidance.', icon: '🎯' },
    ],
    residentialFeatures: [
      { title: 'Residential Accommodation', description: 'Campus hostel facilities.', icon: '🏠' },
      { title: 'Guided Study Hours', description: 'Structured self-study periods.', icon: '📚' },
      { title: 'Library Access', description: 'Study materials and reference resources.', icon: '📖' },
      { title: 'Mentorship', description: 'Regular guidance and support.', icon: '🤝' },
      { title: 'Peer Learning', description: 'Group study and discussion.', icon: '👥' },
      { title: 'Test & Evaluation', description: 'Regular mock tests and feedback.', icon: '✅' },
      { title: 'Academic Discipline', description: 'Structured daily routine.', icon: '📅' },
      { title: 'Student Support', description: 'Motivational and academic support.', icon: '💪' },
    ],
    teachingMethodology: [
      'Classroom sessions focused on Group IV syllabus',
      'Daily current-affairs coverage',
      'Objective-type practice with answer-key analysis',
      'Mock tests simulating examination conditions',
      'Individual doubt-clearing sessions',
      'Previous-year question-paper analysis',
    ],
    admissionSteps: ['Enquiry', 'Counselling', 'Application', 'Eligibility Verification', 'Admission', 'Residential Onboarding'],
    faqs: [
      { question: 'What is the exam pattern for TNPSC Group IV?', answer: 'TNPSC Group IV is a single-stage objective-type examination covering General Studies and General Tamil/English.' },
      { question: 'Is Tamil language coaching available?', answer: 'Yes, dedicated coaching for the General Tamil paper is provided as part of the programme.' },
      { question: 'How often are mock tests conducted?', answer: 'Mock tests are conducted weekly, including sectional and full-length tests under exam conditions.' },
      { question: 'Are previous-year question papers covered?', answer: 'Yes, extensive practice and analysis of previous-year TNPSC Group IV papers is integral to the preparation.' },
    ],
  },

  /* ─── 5. Indian Forest Service (IFoS) ──────────────────── */
  {
    id: 5,
    name: 'Indian Forest Service (IFoS)',
    slug: 'indian-forest-service',
    shortDescription:
      'Specialised preparation for the Indian Forest Service Examination combining UPSC-oriented General Studies with focused guidance for environment, ecology and specialised Main Examination subjects.',
    category: 'UPSC',
    icon: '🌿',
    tagline: 'Protect Our Forests. Serve the Nation.',
    overview:
      'The Indian Forest Service Programme is designed for aspirants preparing for the Indian Forest Service Examination conducted by UPSC. The programme provides structured preparation for the Preliminary Examination followed by the Main Examination and Personality Test. Along with General Studies and current affairs, students receive focused guidance for the specialised subjects prescribed for the IFoS Main Examination, including environmental science, ecology and forestry.',
    preparationAreas: [
      'UPSC Prelims',
      'Environment & Ecology',
      'General Studies',
      'Current Affairs',
      'Forestry',
      'Optional Subjects',
      'Mains Answer Writing',
      'Mock Tests',
      'Interview Preparation',
    ],
    examStructure: [
      { stage: 'Preliminary Examination', description: 'Common UPSC Prelims — General Studies Paper I and CSAT Paper II (objective type).' },
      { stage: 'Main Examination', description: 'Written examination with General English, General Knowledge and two optional subjects (Paper I & II each).' },
      { stage: 'Personality Test', description: 'Interview conducted by the UPSC board assessing suitability for the Indian Forest Service.' },
    ],
    courseStructure: [
      { phase: 'Phase 1', title: 'Foundation', description: 'UPSC fundamentals, General Studies and environment/ecology basics.' },
      { phase: 'Phase 2', title: 'Specialisation', description: 'In-depth preparation of IFoS-specific subjects including forestry and environmental science.' },
      { phase: 'Phase 3', title: 'Prelims Intensive', description: 'Focused revision and mock tests for the UPSC Preliminary Examination.' },
      { phase: 'Phase 4', title: 'Mains Preparation', description: 'Answer-writing practice for IFoS Mains with subject-specific evaluation.' },
      { phase: 'Phase 5', title: 'Interview Guidance', description: 'Mock interviews and personality development for the UPSC interview.' },
    ],
    whyChoose: [
      { title: 'IFoS Specialisation', description: 'Dedicated faculty with expertise in Indian Forest Service examination preparation.', icon: '🎓' },
      { title: 'Environment & Ecology', description: 'Comprehensive coverage of environmental science and ecology topics.', icon: '🌍' },
      { title: 'UPSC Integration', description: 'Combined preparation for UPSC Prelims applicable to both CSE and IFoS.', icon: '📋' },
      { title: 'Residential Learning', description: 'Focused campus environment for disciplined preparation.', icon: '🏛' },
      { title: 'Regular Assessments', description: 'Sectional tests, mock exams and performance analysis.', icon: '📝' },
      { title: 'Current Affairs', description: 'Daily sessions with emphasis on environment and conservation developments.', icon: '📰' },
      { title: 'Answer Writing', description: 'IFoS Mains-oriented answer-writing practice with evaluation.', icon: '✍' },
      { title: 'Interview Preparation', description: 'Mock interviews focused on forestry and environmental topics.', icon: '💬' },
    ],
    residentialFeatures: [
      { title: 'Residential Accommodation', description: 'Campus hostel for focused preparation.', icon: '🏠' },
      { title: 'Guided Study Hours', description: 'Structured study with faculty availability.', icon: '📚' },
      { title: 'Library Access', description: 'Forestry and environment reference materials.', icon: '📖' },
      { title: 'Mentorship', description: 'One-on-one guidance for IFoS-specific preparation.', icon: '🤝' },
      { title: 'Peer Learning', description: 'Collaborative study among IFoS aspirants.', icon: '👥' },
      { title: 'Test & Evaluation', description: 'Regular testing with individual feedback.', icon: '✅' },
      { title: 'Academic Discipline', description: 'Consistent daily routine for optimal preparation.', icon: '📅' },
      { title: 'Student Support', description: 'Academic and motivational support.', icon: '💪' },
    ],
    teachingMethodology: [
      'Classroom sessions covering UPSC and IFoS subjects',
      'Environment and ecology workshops',
      'Current-affairs discussion with conservation focus',
      'Answer-writing practice for IFoS Mains',
      'Full-length mock tests under exam conditions',
      'Individual mentorship and strategy sessions',
    ],
    admissionSteps: ['Enquiry', 'Counselling', 'Application', 'Selection / Eligibility Verification', 'Admission', 'Residential Onboarding'],
    faqs: [
      { question: 'Can I prepare for both UPSC CSE and IFoS simultaneously?', answer: 'Yes, the Preliminary Examination is common for both UPSC CSE and IFoS. The programme provides integrated Prelims preparation applicable to both examinations.' },
      { question: 'What optional subjects are supported for IFoS?', answer: 'Guidance for popular IFoS optional subjects is provided. Students can discuss their optional-subject choice during the counselling stage.' },
      { question: 'Is environment and ecology covered in detail?', answer: 'Yes, comprehensive coverage of environment, ecology, biodiversity, conservation and related topics is a core component of the programme.' },
      { question: 'Are study materials provided?', answer: 'Yes, subject-specific study materials, current-affairs compilations and test-series material are provided.' },
    ],
  },

  /* ─── 6. UPSC CAPF ──────────────────────────────────────── */
  {
    id: 6,
    name: 'UPSC CAPF',
    slug: 'upsc-capf',
    shortDescription:
      'Comprehensive preparation for the UPSC Central Armed Police Forces examination with academic guidance, current affairs, essay writing and examination strategy.',
    category: 'UPSC',
    icon: '🛡',
    tagline: 'Defend the Nation. Lead with Honour.',
    overview:
      'The CAPF Programme is designed for aspirants preparing for the Central Armed Police Forces Assistant Commandants Examination conducted by UPSC. The programme combines academic preparation with examination-oriented practice. Students are guided through General Ability and Intelligence, current affairs, Indian polity, history, geography, economy, security-related topics and essay writing, along with preparation awareness for the physical and personality-test stages.',
    preparationAreas: [
      'General Ability & Intelligence',
      'Indian Polity',
      'History',
      'Geography',
      'Economy',
      'Current Affairs',
      'Internal Security',
      'Essay Writing',
      'Mock Tests',
    ],
    examStructure: [
      { stage: 'Paper I — General Ability & Intelligence', description: 'Objective-type paper covering General Studies, current affairs and mental ability.' },
      { stage: 'Paper II — General Studies, Essay & Comprehension', description: 'Descriptive paper including essay, comprehension and précis writing.' },
      { stage: 'Physical Standards / Fitness Test', description: 'Physical fitness assessment as per prescribed standards.' },
      { stage: 'Interview / Personality Test', description: 'Interview conducted by the selection board to assess overall suitability.' },
    ],
    courseStructure: [
      { phase: 'Phase 1', title: 'Foundation', description: 'Core General Studies, Indian polity, history and geography fundamentals.' },
      { phase: 'Phase 2', title: 'Advanced Preparation', description: 'Internal security, current affairs and essay-writing preparation.' },
      { phase: 'Phase 3', title: 'Paper I Intensive', description: 'Objective-type practice, mock tests and speed-building for Paper I.' },
      { phase: 'Phase 4', title: 'Paper II & Essay', description: 'Essay-writing workshops, comprehension practice and descriptive preparation.' },
      { phase: 'Phase 5', title: 'Physical & Interview', description: 'Physical fitness awareness and mock interview practice.' },
    ],
    whyChoose: [
      { title: 'CAPF Expertise', description: 'Faculty with specific experience in UPSC CAPF examination coaching.', icon: '🎓' },
      { title: 'Security Studies', description: 'Comprehensive coverage of internal security and defence-related topics.', icon: '🛡' },
      { title: 'Essay Coaching', description: 'Dedicated essay-writing sessions with individual evaluation.', icon: '✍' },
      { title: 'Residential Environment', description: 'Disciplined campus life supporting focused preparation.', icon: '🏛' },
      { title: 'Regular Testing', description: 'Mock examinations simulating both Paper I and Paper II.', icon: '📝' },
      { title: 'Current Affairs', description: 'Daily sessions covering national security and current developments.', icon: '📰' },
      { title: 'Physical Fitness Awareness', description: 'Guidance on physical fitness requirements and preparation.', icon: '💪' },
      { title: 'Interview Preparation', description: 'Mock interviews and personality development sessions.', icon: '💬' },
    ],
    residentialFeatures: [
      { title: 'Residential Accommodation', description: 'Campus hostel with structured academic routine.', icon: '🏠' },
      { title: 'Guided Study Hours', description: 'Daily self-study with mentor support.', icon: '📚' },
      { title: 'Library Access', description: 'Security and defence studies reference materials.', icon: '📖' },
      { title: 'Mentorship', description: 'Individual guidance and strategy development.', icon: '🤝' },
      { title: 'Peer Learning', description: 'Group discussions on security and current affairs.', icon: '👥' },
      { title: 'Test & Evaluation', description: 'Regular assessments with performance tracking.', icon: '✅' },
      { title: 'Academic Discipline', description: 'Structured routine for consistent preparation.', icon: '📅' },
      { title: 'Student Support', description: 'Motivation and academic counselling.', icon: '💪' },
    ],
    teachingMethodology: [
      'Interactive classroom sessions on General Studies and security topics',
      'Current-affairs analysis with security and defence focus',
      'Essay-writing workshops with individual feedback',
      'Objective and descriptive mock tests',
      'Individual mentorship and strategy sessions',
      'Group discussions on national security topics',
    ],
    admissionSteps: ['Enquiry', 'Counselling', 'Application', 'Selection / Eligibility Verification', 'Admission', 'Residential Onboarding'],
    faqs: [
      { question: 'Is physical fitness training included?', answer: 'The programme focuses on academic preparation. Guidance and awareness regarding physical fitness requirements are provided, but physical training facilities may vary.' },
      { question: 'Can I prepare for CAPF alongside UPSC CSE?', answer: 'The General Studies components overlap significantly. Students can benefit from combined preparation for both examinations.' },
      { question: 'What is the essay preparation like?', answer: 'Dedicated essay-writing sessions are conducted regularly with individual evaluation, feedback and improvement guidance.' },
      { question: 'Are mock tests provided?', answer: 'Yes, regular mock tests simulating both Paper I (objective) and Paper II (descriptive) are part of the programme.' },
    ],
  },

  /* ─── 7. SSC CGL ────────────────────────────────────────── */
  {
    id: 7,
    name: 'SSC CGL',
    slug: 'ssc-cgl',
    shortDescription:
      'Structured SSC CGL preparation focused on Quantitative Aptitude, Reasoning, English Language and General Awareness with intensive practice and mock examinations.',
    category: 'SSC',
    icon: '📊',
    tagline: 'Crack CGL. Begin Your Central Government Career.',
    overview:
      'The SSC CGL Programme is designed for aspirants targeting graduate-level recruitment examinations conducted by the Staff Selection Commission. The programme focuses on building conceptual clarity, speed, accuracy and examination strategy. Regular practice sessions, sectional tests, full-length mock examinations and performance analysis help students develop the skills required for computer-based competitive examinations.',
    preparationAreas: [
      'Quantitative Aptitude',
      'Reasoning',
      'English',
      'General Awareness',
      'Current Affairs',
      'Previous-Year Questions',
      'Sectional Tests',
      'Full-Length Mock Tests',
      'Speed & Accuracy',
    ],
    examStructure: [
      { stage: 'Tier I — Computer-Based Test', description: 'Objective MCQ-based exam covering Quantitative Aptitude, Reasoning, English and General Awareness.' },
      { stage: 'Tier II — Computer-Based Test', description: 'Advanced-level papers in Mathematics, English and relevant subjects based on the post.' },
      { stage: 'Document Verification', description: 'Verification of educational and other eligibility documents for qualified candidates.' },
    ],
    courseStructure: [
      { phase: 'Phase 1', title: 'Foundation', description: 'Core concepts in Quantitative Aptitude, Reasoning, English and General Awareness.' },
      { phase: 'Phase 2', title: 'Advanced Practice', description: 'Advanced problem-solving, shortcut techniques and speed-building exercises.' },
      { phase: 'Phase 3', title: 'Tier I Intensive', description: 'Full-length Tier I mock tests, revision and time-management strategy.' },
      { phase: 'Phase 4', title: 'Tier II Preparation', description: 'Advanced mathematics, English and subject-specific preparation for Tier II.' },
    ],
    whyChoose: [
      { title: 'SSC Expertise', description: 'Faculty with deep experience in SSC CGL examination patterns and coaching.', icon: '🎓' },
      { title: 'Shortcut Techniques', description: 'Speed-building methods and calculation shortcuts for competitive examinations.', icon: '⚡' },
      { title: 'Computer-Based Practice', description: 'Regular practice in a computer-based testing environment.', icon: '💻' },
      { title: 'Residential Learning', description: 'Focused campus environment for consistent daily preparation.', icon: '🏛' },
      { title: 'Regular Mock Tests', description: 'Weekly sectional and full-length mock examinations.', icon: '📝' },
      { title: 'Current Affairs', description: 'Daily current-affairs coverage relevant to SSC examinations.', icon: '📰' },
      { title: 'Performance Analysis', description: 'Detailed score analysis and improvement guidance after each test.', icon: '📊' },
      { title: 'Doubt Resolution', description: 'Accessible faculty for doubt-clearing and concept reinforcement.', icon: '🎯' },
    ],
    residentialFeatures: [
      { title: 'Residential Accommodation', description: 'Campus hostel facilities.', icon: '🏠' },
      { title: 'Guided Study Hours', description: 'Structured self-study with mentor support.', icon: '📚' },
      { title: 'Library Access', description: 'SSC-specific reference and practice materials.', icon: '📖' },
      { title: 'Mentorship', description: 'Individual guidance and strategy sessions.', icon: '🤝' },
      { title: 'Peer Learning', description: 'Competitive practice sessions among peers.', icon: '👥' },
      { title: 'Test & Evaluation', description: 'Frequent tests with performance ranking.', icon: '✅' },
      { title: 'Academic Discipline', description: 'Consistent daily routine.', icon: '📅' },
      { title: 'Student Support', description: 'Motivation and academic counselling.', icon: '💪' },
    ],
    teachingMethodology: [
      'Concept-based classroom sessions for each subject',
      'Daily practice sets and speed-building exercises',
      'Current-affairs sessions relevant to SSC',
      'Sectional and full-length mock tests',
      'Individual doubt-clearing and concept reinforcement',
      'Performance analysis and strategy refinement',
    ],
    admissionSteps: ['Enquiry', 'Counselling', 'Application', 'Eligibility Verification', 'Admission', 'Residential Onboarding'],
    faqs: [
      { question: 'Does the programme cover both Tier I and Tier II?', answer: 'Yes, the programme provides comprehensive preparation for both Tier I and Tier II of the SSC CGL examination.' },
      { question: 'Is computer-based test practice available?', answer: 'Yes, mock tests are conducted in a format that simulates the computer-based testing environment.' },
      { question: 'Are shortcut techniques taught?', answer: 'Yes, speed-building techniques and calculation shortcuts are integral to the Quantitative Aptitude and Reasoning preparation.' },
      { question: 'How are mock tests evaluated?', answer: 'Each mock test is followed by detailed performance analysis, ranking and individual feedback on improvement areas.' },
    ],
  },

  /* ─── 8. SSC CHSL ───────────────────────────────────────── */
  {
    id: 8,
    name: 'SSC CHSL',
    slug: 'ssc-chsl',
    shortDescription:
      'Focused preparation for SSC CHSL with systematic training in Quantitative Aptitude, Reasoning, English and General Awareness, supported by regular practice tests.',
    category: 'SSC',
    icon: '📋',
    tagline: 'Your Gateway to Central Government Positions.',
    overview:
      'The SSC CHSL Programme is designed for aspirants targeting the Combined Higher Secondary Level examination conducted by the Staff Selection Commission. The programme provides systematic preparation in Quantitative Aptitude, General Intelligence and Reasoning, English Language and General Awareness, with emphasis on speed, accuracy and effective time management for computer-based examinations.',
    preparationAreas: [
      'Quantitative Aptitude',
      'General Intelligence',
      'English',
      'General Awareness',
      'Current Affairs',
      'Previous-Year Questions',
      'Mock Tests',
      'Speed & Accuracy',
    ],
    examStructure: [
      { stage: 'Tier I — Computer-Based Test', description: 'Objective MCQ-based examination covering four subjects — Quantitative Aptitude, Reasoning, English and General Awareness.' },
      { stage: 'Tier II — Computer-Based Test', description: 'Advanced-level papers covering relevant subjects for the selected post category.' },
      { stage: 'Document Verification', description: 'Verification of eligibility documents for qualified candidates.' },
    ],
    courseStructure: [
      { phase: 'Phase 1', title: 'Foundation', description: 'Basic concepts across all four subjects with focus on fundamentals.' },
      { phase: 'Phase 2', title: 'Practice & Speed', description: 'Extensive practice, speed-building and shortcut techniques.' },
      { phase: 'Phase 3', title: 'Mock Tests & Revision', description: 'Full-length mock tests, revision and time-management strategy.' },
    ],
    whyChoose: [
      { title: 'SSC Focus', description: 'Coaching specifically designed for SSC CHSL examination patterns.', icon: '🎓' },
      { title: 'Speed Building', description: 'Techniques to improve speed and accuracy for timed examinations.', icon: '⚡' },
      { title: 'Regular Practice', description: 'Daily practice sessions with progressively challenging problems.', icon: '📝' },
      { title: 'Residential Environment', description: 'Focused campus learning for consistent preparation.', icon: '🏛' },
      { title: 'Current Affairs', description: 'Regular current-affairs sessions covering relevant topics.', icon: '📰' },
      { title: 'Performance Tracking', description: 'Mock-test analysis with individual improvement guidance.', icon: '📊' },
    ],
    residentialFeatures: [
      { title: 'Residential Accommodation', description: 'Campus hostel facilities.', icon: '🏠' },
      { title: 'Guided Study Hours', description: 'Structured self-study periods.', icon: '📚' },
      { title: 'Library Access', description: 'Practice materials and references.', icon: '📖' },
      { title: 'Mentorship', description: 'Individual guidance and support.', icon: '🤝' },
      { title: 'Peer Learning', description: 'Group practice and competitive drills.', icon: '👥' },
      { title: 'Test & Evaluation', description: 'Regular tests with scoring and feedback.', icon: '✅' },
      { title: 'Academic Discipline', description: 'Structured daily routine.', icon: '📅' },
      { title: 'Student Support', description: 'Academic and motivational support.', icon: '💪' },
    ],
    teachingMethodology: [
      'Classroom sessions covering CHSL-relevant subjects',
      'Daily speed-building and accuracy practice',
      'Current-affairs sessions',
      'Sectional and full-length mock tests',
      'Doubt-clearing and concept reinforcement',
      'Performance analysis after each mock test',
    ],
    admissionSteps: ['Enquiry', 'Counselling', 'Application', 'Eligibility Verification', 'Admission', 'Residential Onboarding'],
    faqs: [
      { question: 'What is the difference between SSC CGL and SSC CHSL?', answer: 'SSC CGL is for graduate-level recruitment while SSC CHSL is for higher-secondary (10+2) level recruitment. The syllabus overlaps but CGL is relatively more advanced.' },
      { question: 'Is typing skill training provided?', answer: 'The programme focuses on academic preparation. Students may need to develop typing skills separately if required for specific posts.' },
      { question: 'Are mock tests conducted in CBT format?', answer: 'Yes, mock tests simulate the computer-based testing environment of the actual SSC CHSL examination.' },
      { question: 'How long is the programme?', answer: 'The programme covers the complete CHSL preparation cycle. Duration details are shared during the counselling session.' },
    ],
  },

  /* ─── 9. TNUSRB ─────────────────────────────────────────── */
  {
    id: 9,
    name: 'TNUSRB',
    slug: 'tnusrb',
    shortDescription:
      'Focused preparation for TNUSRB recruitment examinations covering General Knowledge, Tamil Nadu affairs, current affairs, aptitude, reasoning and examination practice.',
    category: 'State Services',
    icon: '🏅',
    tagline: 'Join the Force. Protect the People.',
    overview:
      'The TNUSRB Programme is designed for candidates preparing for recruitment examinations conducted by the Tamil Nadu Uniformed Services Recruitment Board. The programme focuses on the academic requirements of the respective recruitment examination while helping candidates develop examination confidence and discipline. Students receive structured coaching, practice tests, current-affairs preparation and guidance aligned with the applicable recruitment process.',
    preparationAreas: [
      'General Knowledge',
      'Tamil Nadu Affairs',
      'Current Affairs',
      'Aptitude',
      'Reasoning',
      'Previous-Year Questions',
      'Mock Tests',
      'Recruitment Process Guidance',
      'Physical-Test Awareness',
    ],
    examStructure: [
      { stage: 'Written Examination', description: 'Objective-type paper covering General Knowledge, current affairs, aptitude and reasoning.' },
      { stage: 'Physical Measurement Test', description: 'Physical measurements and fitness assessment as per recruitment standards.' },
      { stage: 'Physical Efficiency Test', description: 'Physical fitness tests including running, endurance and other prescribed activities.' },
      { stage: 'Document Verification', description: 'Verification of educational qualifications, certificates and eligibility documents.' },
    ],
    courseStructure: [
      { phase: 'Phase 1', title: 'Foundation', description: 'Core General Knowledge, Tamil Nadu affairs and current-affairs fundamentals.' },
      { phase: 'Phase 2', title: 'Practice & Aptitude', description: 'Aptitude and reasoning practice with speed-building exercises.' },
      { phase: 'Phase 3', title: 'Mock Tests & Revision', description: 'Full-length mock tests, previous-year analysis and final revision.' },
    ],
    whyChoose: [
      { title: 'TNUSRB Focus', description: 'Coaching designed specifically for TNUSRB examination requirements.', icon: '🎓' },
      { title: 'Tamil Nadu Affairs', description: 'Comprehensive coverage of Tamil Nadu-specific general knowledge.', icon: '📋' },
      { title: 'Physical-Test Awareness', description: 'Guidance regarding physical measurement and efficiency test requirements.', icon: '💪' },
      { title: 'Residential Learning', description: 'Disciplined campus environment for structured preparation.', icon: '🏛' },
      { title: 'Regular Practice Tests', description: 'Frequent mock examinations simulating TNUSRB patterns.', icon: '📝' },
      { title: 'Current Affairs', description: 'Daily current-affairs sessions covering state and national developments.', icon: '📰' },
      { title: 'Previous-Year Analysis', description: 'Thorough analysis of TNUSRB previous-year question papers.', icon: '🔍' },
      { title: 'Mentor Support', description: 'Accessible faculty for doubt clearing and guidance.', icon: '🎯' },
    ],
    residentialFeatures: [
      { title: 'Residential Accommodation', description: 'Campus hostel facilities.', icon: '🏠' },
      { title: 'Guided Study Hours', description: 'Structured study periods.', icon: '📚' },
      { title: 'Library Access', description: 'Reference and practice materials.', icon: '📖' },
      { title: 'Mentorship', description: 'Individual guidance sessions.', icon: '🤝' },
      { title: 'Peer Learning', description: 'Group study and practice.', icon: '👥' },
      { title: 'Test & Evaluation', description: 'Regular tests with feedback.', icon: '✅' },
      { title: 'Academic Discipline', description: 'Consistent daily routine.', icon: '📅' },
      { title: 'Student Support', description: 'Academic and motivational support.', icon: '💪' },
    ],
    teachingMethodology: [
      'Classroom sessions focused on TNUSRB syllabus',
      'Daily current-affairs and Tamil Nadu affairs coverage',
      'Aptitude and reasoning practice',
      'Mock tests under exam conditions',
      'Previous-year question-paper analysis',
      'Guidance on recruitment process stages',
    ],
    admissionSteps: ['Enquiry', 'Counselling', 'Application', 'Eligibility Verification', 'Admission', 'Residential Onboarding'],
    faqs: [
      { question: 'Does the programme include physical training?', answer: 'The programme focuses on academic preparation. Guidance on physical fitness requirements is provided, but dedicated physical training may need to be arranged separately.' },
      { question: 'Which TNUSRB posts does the programme prepare for?', answer: 'The programme covers academic preparation applicable to various TNUSRB recruitment examinations. Specific post details are discussed during counselling.' },
      { question: 'Is Tamil medium supported?', answer: 'Yes, the programme supports preparation in both Tamil and English mediums.' },
      { question: 'How are mock tests structured?', answer: 'Mock tests follow the TNUSRB examination pattern with objective-type questions, time limits and post-test analysis.' },
    ],
  },

  /* ─── 10. RRB / Railway Examinations ────────────────────── */
  {
    id: 10,
    name: 'RRB / Railway Examinations',
    slug: 'rrb-railway-examinations',
    shortDescription:
      'Comprehensive railway examination preparation covering Mathematics, Reasoning, General Awareness, General Science and current affairs through structured practice and mock tests.',
    category: 'Railway',
    icon: '🚆',
    tagline: 'Board the Journey. Build Your Career.',
    overview:
      'The RRB / Railway Examinations Programme is designed for aspirants preparing for recruitment examinations conducted by the Railway Recruitment Boards. The programme provides comprehensive preparation in Mathematics, General Intelligence and Reasoning, General Awareness, General Science and current affairs, with a focus on speed, accuracy and examination strategy for computer-based tests.',
    preparationAreas: [
      'Mathematics',
      'Reasoning',
      'General Awareness',
      'General Science',
      'Current Affairs',
      'Previous-Year Questions',
      'Mock Tests',
      'Speed & Accuracy',
    ],
    examStructure: [
      { stage: 'Computer-Based Test (CBT 1)', description: 'Screening test covering Mathematics, General Intelligence and Reasoning, and General Awareness.' },
      { stage: 'Computer-Based Test (CBT 2)', description: 'Advanced-level paper with more detailed subject coverage based on the post category.' },
      { stage: 'Computer-Based Aptitude Test', description: 'Aptitude test for specific posts requiring psychometric evaluation (where applicable).' },
      { stage: 'Document Verification & Medical', description: 'Verification of documents and medical fitness examination.' },
    ],
    courseStructure: [
      { phase: 'Phase 1', title: 'Foundation', description: 'Core Mathematics, Reasoning, General Awareness and Science fundamentals.' },
      { phase: 'Phase 2', title: 'Advanced Practice', description: 'Advanced problem-solving, speed-building and shortcut techniques.' },
      { phase: 'Phase 3', title: 'CBT 1 Preparation', description: 'Full-length CBT 1 mock tests, revision and time-management strategy.' },
      { phase: 'Phase 4', title: 'CBT 2 & Advanced', description: 'Advanced-level preparation for CBT 2 with subject-specific coaching.' },
    ],
    whyChoose: [
      { title: 'Railway Focus', description: 'Coaching designed specifically for RRB examination patterns and requirements.', icon: '🎓' },
      { title: 'Mathematics Mastery', description: 'Comprehensive mathematics preparation with shortcut techniques.', icon: '🧮' },
      { title: 'CBT Practice', description: 'Regular computer-based test practice simulating actual exam conditions.', icon: '💻' },
      { title: 'Residential Environment', description: 'Focused campus learning for disciplined preparation.', icon: '🏛' },
      { title: 'General Science', description: 'Thorough coverage of General Science topics relevant to railway exams.', icon: '🔬' },
      { title: 'Current Affairs', description: 'Daily sessions covering railway and general current affairs.', icon: '📰' },
      { title: 'Speed Training', description: 'Exercises to build speed and accuracy for timed examinations.', icon: '⚡' },
      { title: 'Performance Analysis', description: 'Detailed score analysis after each mock test.', icon: '📊' },
    ],
    residentialFeatures: [
      { title: 'Residential Accommodation', description: 'Campus hostel for focused preparation.', icon: '🏠' },
      { title: 'Guided Study Hours', description: 'Structured self-study with mentor support.', icon: '📚' },
      { title: 'Library Access', description: 'Railway exam reference and practice materials.', icon: '📖' },
      { title: 'Mentorship', description: 'Individual guidance and strategy sessions.', icon: '🤝' },
      { title: 'Peer Learning', description: 'Group practice and competitive sessions.', icon: '👥' },
      { title: 'Test & Evaluation', description: 'Frequent mock tests with ranking.', icon: '✅' },
      { title: 'Academic Discipline', description: 'Structured daily routine.', icon: '📅' },
      { title: 'Student Support', description: 'Motivation and academic counselling.', icon: '💪' },
    ],
    teachingMethodology: [
      'Concept-based classroom sessions for each subject',
      'Daily practice sets and speed-building drills',
      'Current-affairs sessions covering railway developments',
      'Sectional and full-length mock tests',
      'Individual doubt-clearing sessions',
      'Performance analysis and strategy refinement',
    ],
    admissionSteps: ['Enquiry', 'Counselling', 'Application', 'Eligibility Verification', 'Admission', 'Residential Onboarding'],
    faqs: [
      { question: 'Which railway examinations does the programme cover?', answer: 'The programme provides preparation applicable to various RRB examinations including NTPC, Group D, ALP and other recruitment examinations.' },
      { question: 'Is General Science covered in detail?', answer: 'Yes, comprehensive General Science preparation covering Physics, Chemistry and Biology topics relevant to railway examinations is provided.' },
      { question: 'Are computer-based mock tests available?', answer: 'Yes, mock tests simulate the computer-based testing environment of RRB examinations.' },
      { question: 'What speed-building techniques are taught?', answer: 'Shortcut methods for calculations, reasoning tricks and time-management strategies are taught to improve speed and accuracy.' },
    ],
  },
];

export default programsData;
