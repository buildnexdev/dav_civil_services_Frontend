export const PROGRAMS = ['UPSC CSE', 'TNPSC', 'SSC CGL', 'IFoS', 'CAPF'];
export const BATCHES = ['2025-A', '2025-B', '2024-A', '2024-B'];
export const SCHOLARSHIPS = ['None', 'Merit', 'Academic Excellence', 'Need-Based', 'Social Support'];
export const RELIGIONS = ['Hindu', 'Muslim', 'Christian', 'Sikh', 'Buddhist', 'Jain', 'Parsi', 'Other'];
export const COMMUNITIES = ['OC / General', 'BC', 'MBC', 'SC', 'ST', 'EWS', 'Other'];
export const INCOME_BRACKETS = [
  'Below ₹2.5 Lakh',
  '₹2.5 Lakh – ₹5 Lakh',
  '₹5 Lakh – ₹10 Lakh',
  '₹10 Lakh – ₹25 Lakh',
  'Above ₹25 Lakh',
];
export const STATUSES = ['Active', 'Inactive', 'Graduated'] as const;

export const OTHER_FLAGS = [
  { key: 'flagSingleParent', label: 'Single Parent' },
  { key: 'flagDefenceCivil', label: 'Parent in Defence forces/civil servant' },
  { key: 'flagDifferentlyAbled', label: 'Differently abled (Child or Parent)' },
  { key: 'flagSpecialChild', label: 'Special child' },
  { key: 'flagGuardianship', label: 'Student under Guardianship' },
  { key: 'flagSportsArts', label: 'State/National recognition in Sports/Arts etc (Child or Parent)' },
  { key: 'flagParentAlumni', label: 'Parent is an alumnus/alumna' },
  { key: 'flagOneChildSibling', label: 'Applying for only one child (Sibling already studying at DAV)' },
  { key: 'flagTwoChildren', label: 'Applying for two children (Siblings but not Twins)' },
  { key: 'flagTwins', label: 'Applying for two children (Twins)' },
] as const;

export const FILE_FIELDS = [
  'birthCertificate',
  'photograph',
  'fatherQualificationProof',
  'motherQualificationProof',
  'fatherOccupationProof',
  'motherOccupationProof',
  'incomeCertificate',
  'addressProof',
  'otherDocuments',
] as const;

export type StudentStatus = (typeof STATUSES)[number];
export type FileField = (typeof FILE_FIELDS)[number];
export type FlagKey = (typeof OTHER_FLAGS)[number]['key'];

export type Student = {
  id: number;
  studentCode: string;
  userId?: number | null;
  name: string;
  program: string;
  batch: string;
  phone: string;
  email: string;
  attendance: number;
  performance: number;
  scholarship: string;
  status: StudentStatus;
  gender: string;
  dob: string;
  address: string;
  addressLine2: string;
  state: string;
  district: string;
  city: string;
  country: string;
  pincode: string;
  tenth: number | '';
  twelfth: number | '';
  degree: string;
  university: string;
  gradYear: number | '';
  hostel: string;
  room: string;
  nationality: string;
  religion: string;
  community: string;
  motherTongue: string;
  aadhaarNumber: string;
  birthCertificate: string;
  photograph: string;
  fatherName: string;
  motherName: string;
  fatherQualification: string;
  motherQualification: string;
  fatherQualificationProof: string;
  motherQualificationProof: string;
  fatherOccupation: string;
  motherOccupation: string;
  fatherOccupationProof: string;
  motherOccupationProof: string;
  annualIncome: string;
  incomeCertificate: string;
  alternatePhone: string;
  alternateEmail: string;
  addressProof: string;
  flagSingleParent: boolean;
  flagDefenceCivil: boolean;
  flagDifferentlyAbled: boolean;
  flagSpecialChild: boolean;
  flagGuardianship: boolean;
  flagSportsArts: boolean;
  flagParentAlumni: boolean;
  flagOneChildSibling: boolean;
  flagTwoChildren: boolean;
  flagTwins: boolean;
  otherDetails: string;
  otherDocuments: string;
  updatedAt?: string;
  username?: string;
  password?: string;
};

export const emptyStudent: Student = {
  id: 0,
  studentCode: '',
  name: '',
  program: '',
  batch: '2025-A',
  phone: '',
  email: '',
  attendance: 0,
  performance: 0,
  scholarship: 'None',
  status: 'Active',
  gender: '',
  dob: '',
  address: '',
  addressLine2: '',
  state: '',
  district: '',
  city: '',
  country: 'India',
  pincode: '',
  tenth: '',
  twelfth: '',
  degree: '',
  university: '',
  gradYear: '',
  hostel: '',
  room: '',
  nationality: 'Indian',
  religion: '',
  community: '',
  motherTongue: '',
  aadhaarNumber: '',
  birthCertificate: '',
  photograph: '',
  fatherName: '',
  motherName: '',
  fatherQualification: '',
  motherQualification: '',
  fatherQualificationProof: '',
  motherQualificationProof: '',
  fatherOccupation: '',
  motherOccupation: '',
  fatherOccupationProof: '',
  motherOccupationProof: '',
  annualIncome: '',
  incomeCertificate: '',
  alternatePhone: '',
  alternateEmail: '',
  addressProof: '',
  flagSingleParent: false,
  flagDefenceCivil: false,
  flagDifferentlyAbled: false,
  flagSpecialChild: false,
  flagGuardianship: false,
  flagSportsArts: false,
  flagParentAlumni: false,
  flagOneChildSibling: false,
  flagTwoChildren: false,
  flagTwins: false,
  otherDetails: '',
  otherDocuments: '',
  updatedAt: '',
  username: '',
  password: '',
};

export function studentToFormData(student: Student, files: Partial<Record<FileField, File | null>>) {
  const data = new FormData();
  const skip = new Set(['id', 'userId', 'updatedAt', ...FILE_FIELDS]);

  (Object.keys(student) as (keyof Student)[]).forEach((key) => {
    if (skip.has(key)) return;
    const value = student[key];
    if (value === undefined || value === null) return;
    data.append(String(key), typeof value === 'boolean' ? (value ? '1' : '0') : String(value));
  });

  FILE_FIELDS.forEach((field) => {
    const file = files[field];
    if (file) data.append(field, file);
  });

  return data;
}
