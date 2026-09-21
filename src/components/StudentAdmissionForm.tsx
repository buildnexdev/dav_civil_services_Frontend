import { useMemo, type ChangeEvent, type ReactNode } from 'react';
import {
  BATCHES,
  COMMUNITIES,
  INCOME_BRACKETS,
  OTHER_FLAGS,
  PROGRAMS,
  RELIGIONS,
  SCHOLARSHIPS,
  STATUSES,
  type FileField,
  type FlagKey,
  type Student,
} from '../types/student';
import { fileUrl } from '../lib/api';
import './StudentAdmissionForm.css';

type Props = {
  form: Student;
  files: Partial<Record<FileField, File | null>>;
  readOnly?: boolean;
  showLoginFields?: boolean;
  showAcademic?: boolean;
  onChange: (field: keyof Student, value: string | boolean) => void;
  onFile: (field: FileField, file: File | null) => void;
};

const Field = ({
  label,
  required,
  hint,
  wide,
  children,
}: {
  label: string;
  required?: boolean;
  hint?: string;
  wide?: boolean;
  children: ReactNode;
}) => (
  <div className={wide ? 'adm-field-wide' : 'adm-field'}>
    <label>
      {label}
      {required ? <span className="adm-req"> *</span> : null}
    </label>
    <div className="adm-control">
      {children}
      {hint ? <p className="adm-hint">{hint}</p> : null}
    </div>
  </div>
);

function isImageFile(name?: string | null) {
  return Boolean(name && /\.(jpe?g|png|webp|gif)$/i.test(name));
}

function fileLabel(pathOrName?: string | null) {
  if (!pathOrName) return 'Uploaded file';
  return pathOrName.split('/').pop() || pathOrName;
}

const FileInput = ({
  field,
  required,
  form,
  files,
  readOnly,
  accept = '.pdf,.jpg,.jpeg,.png,.webp',
  onFile,
}: {
  field: FileField;
  required?: boolean;
  form: Student;
  files: Props['files'];
  readOnly?: boolean;
  accept?: string;
  onFile: Props['onFile'];
}) => {
  const existing = form[field];
  const chosen = files[field];
  const previewSrc = useMemo(() => {
    if (chosen) return URL.createObjectURL(chosen);
    if (existing) return fileUrl(existing, form.updatedAt);
    return '';
  }, [chosen, existing, form.updatedAt]);
  const previewName = chosen?.name || fileLabel(existing);
  const showImage = previewSrc && isImageFile(previewName);

  return (
    <div className="adm-file">
      {!readOnly && (
        <input
          type="file"
          className="form-control"
          accept={accept}
          required={required && !existing && !chosen}
          onChange={(e: ChangeEvent<HTMLInputElement>) => onFile(field, e.target.files?.[0] || null)}
        />
      )}
      {previewSrc ? (
        <a className="adm-preview" href={previewSrc} target="_blank" rel="noreferrer">
          {showImage ? (
            <img src={previewSrc} alt={previewName} />
          ) : (
            <span className="adm-preview-doc">PDF</span>
          )}
          <span>{chosen ? `Selected: ${previewName}` : previewName}</span>
        </a>
      ) : (
        <span className="adm-hint">No file uploaded</span>
      )}
    </div>
  );
};

const StudentAdmissionForm = ({
  form,
  files,
  readOnly,
  showLoginFields,
  showAcademic = true,
  onChange,
  onFile,
}: Props) => {
  const disabled = Boolean(readOnly);

  return (
    <div className="adm-form">
      <section className="adm-section">
        <h3>I. Student Details</h3>
        <div className="adm-grid">
          <Field label="Name of the student" required>
            <input className="form-control" value={form.name} required disabled={disabled} onChange={(e) => onChange('name', e.target.value)} />
          </Field>
          <Field label="Nationality" required hint="If Non-Indian please specify here">
            <input className="form-control" value={form.nationality} required disabled={disabled} onChange={(e) => onChange('nationality', e.target.value)} />
          </Field>
          <Field label="Gender" required>
            <div className="adm-radios">
              {['Male', 'Female'].map((g) => (
                <label key={g} className="adm-check">
                  <input type="radio" name="gender" value={g} checked={form.gender === g} disabled={disabled} onChange={() => onChange('gender', g)} required />
                  {g}
                </label>
              ))}
            </div>
          </Field>
          <Field label="Religion" required>
            <select className="form-control" value={form.religion} required disabled={disabled} onChange={(e) => onChange('religion', e.target.value)}>
              <option value="">-Select-</option>
              {RELIGIONS.map((r) => <option key={r} value={r}>{r}</option>)}
            </select>
          </Field>
          <Field label="Program applying for" required>
            <select className="form-control" value={form.program} required disabled={disabled} onChange={(e) => onChange('program', e.target.value)}>
              <option value="">-Select-</option>
              {PROGRAMS.map((p) => <option key={p} value={p}>{p}</option>)}
            </select>
          </Field>
          <Field label="Community" required>
            <select className="form-control" value={form.community} required disabled={disabled} onChange={(e) => onChange('community', e.target.value)}>
              <option value="">-Select-</option>
              {COMMUNITIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </Field>
          <Field label="Date of birth" required>
            <input type="date" className="form-control" value={form.dob} required disabled={disabled} onChange={(e) => onChange('dob', e.target.value)} />
          </Field>
          <Field label="Mother tongue" required>
            <input className="form-control" value={form.motherTongue} required disabled={disabled} onChange={(e) => onChange('motherTongue', e.target.value)} />
          </Field>
          <Field label="Upload student's birth certificate" required>
            <FileInput field="birthCertificate" required form={form} files={files} readOnly={readOnly} onFile={onFile} />
          </Field>
          <Field label="Upload student's photograph" required>
            <FileInput field="photograph" required form={form} files={files} readOnly={readOnly} accept=".jpg,.jpeg,.png,.webp" onFile={onFile} />
          </Field>
          <Field label="Student Aadhaar number">
            <input className="form-control" placeholder="############" maxLength={12} value={form.aadhaarNumber} disabled={disabled} onChange={(e) => onChange('aadhaarNumber', e.target.value.replace(/\D/g, ''))} />
          </Field>
        </div>
      </section>

      <section className="adm-section">
        <h3>II. Family Details</h3>
        <div className="adm-grid">
          <Field label="Father's name" required>
            <input className="form-control" value={form.fatherName} required disabled={disabled} onChange={(e) => onChange('fatherName', e.target.value)} />
          </Field>
          <Field label="Mother's name" required>
            <input className="form-control" value={form.motherName} required disabled={disabled} onChange={(e) => onChange('motherName', e.target.value)} />
          </Field>
          <Field label="Father's educational qualification" required>
            <input className="form-control" value={form.fatherQualification} required disabled={disabled} onChange={(e) => onChange('fatherQualification', e.target.value)} />
          </Field>
          <Field label="Mother's educational qualification" required>
            <input className="form-control" value={form.motherQualification} required disabled={disabled} onChange={(e) => onChange('motherQualification', e.target.value)} />
          </Field>
          <Field label="Upload highest educational qualification proof">
            <FileInput field="fatherQualificationProof" form={form} files={files} readOnly={readOnly} onFile={onFile} />
          </Field>
          <Field label="Upload highest educational qualification proof">
            <FileInput field="motherQualificationProof" form={form} files={files} readOnly={readOnly} onFile={onFile} />
          </Field>
          <Field label="Father's occupation, designation & employer" required>
            <input className="form-control" value={form.fatherOccupation} required disabled={disabled} onChange={(e) => onChange('fatherOccupation', e.target.value)} />
          </Field>
          <Field label="Mother's occupation, designation & employer">
            <input className="form-control" value={form.motherOccupation} disabled={disabled} onChange={(e) => onChange('motherOccupation', e.target.value)} />
          </Field>
          <Field label="Upload occupation proof">
            <FileInput field="fatherOccupationProof" form={form} files={files} readOnly={readOnly} onFile={onFile} />
          </Field>
          <Field label="Upload occupation proof">
            <FileInput field="motherOccupationProof" form={form} files={files} readOnly={readOnly} onFile={onFile} />
          </Field>
          <Field label="Family's total annual income" required>
            <select className="form-control" value={form.annualIncome} required disabled={disabled} onChange={(e) => onChange('annualIncome', e.target.value)}>
              <option value="">-Select-</option>
              {INCOME_BRACKETS.map((v) => <option key={v} value={v}>{v}</option>)}
            </select>
          </Field>
          <Field label="Upload income certificate" required hint="Attach Latest Payslip/ITR/Income Certificate">
            <FileInput field="incomeCertificate" required form={form} files={files} readOnly={readOnly} onFile={onFile} />
          </Field>
        </div>
      </section>

      <section className="adm-section">
        <h3>III. Preferred contact details</h3>
        <div className="adm-grid">
          <Field label="Primary mobile no." required>
            <div className="adm-phone">
              <span>+91</span>
              <input className="form-control" placeholder="81234 56789" maxLength={10} value={form.phone} required disabled={disabled} onChange={(e) => onChange('phone', e.target.value.replace(/\D/g, ''))} />
            </div>
          </Field>
          <Field label="Address line 1" required>
            <input className="form-control" value={form.address} required disabled={disabled} onChange={(e) => onChange('address', e.target.value)} />
          </Field>
          <Field label="Alternate mobile no.">
            <div className="adm-phone">
              <span>+91</span>
              <input className="form-control" placeholder="81234 56789" maxLength={10} value={form.alternatePhone} disabled={disabled} onChange={(e) => onChange('alternatePhone', e.target.value.replace(/\D/g, ''))} />
            </div>
          </Field>
          <Field label="Address line 2">
            <input className="form-control" value={form.addressLine2} disabled={disabled} onChange={(e) => onChange('addressLine2', e.target.value)} />
          </Field>
          <Field label="Primary email ID" required>
            <input type="email" className="form-control" value={form.email} required disabled={disabled} onChange={(e) => onChange('email', e.target.value)} />
          </Field>
          <Field label="City" required>
            <input className="form-control" value={form.city} required disabled={disabled} onChange={(e) => onChange('city', e.target.value)} />
          </Field>
          <Field label="Alternate email ID">
            <input type="email" className="form-control" value={form.alternateEmail} disabled={disabled} onChange={(e) => onChange('alternateEmail', e.target.value)} />
          </Field>
          <Field label="State" required>
            <input className="form-control" value={form.state} required disabled={disabled} onChange={(e) => onChange('state', e.target.value)} />
          </Field>
          <Field label="Address proof (Govt. issued)" required>
            <FileInput field="addressProof" required form={form} files={files} readOnly={readOnly} onFile={onFile} />
          </Field>
          <Field label="Country">
            <input className="form-control" value={form.country} disabled={disabled} onChange={(e) => onChange('country', e.target.value)} />
          </Field>
          <div className="adm-spacer" />
          <Field label="Pincode" required>
            <input className="form-control" placeholder="######" maxLength={6} value={form.pincode} required disabled={disabled} onChange={(e) => onChange('pincode', e.target.value.replace(/\D/g, ''))} />
          </Field>
        </div>
      </section>

      <section className="adm-section">
        <h3>IV. Other details. (If false details are furnished the application will be disqualified)</h3>
        <div className="adm-grid">
          <Field label="Multiple options can be ticked" wide>
            <div className="adm-checks">
              {OTHER_FLAGS.map((item) => (
                <label key={item.key} className="adm-check">
                  <input
                    type="checkbox"
                    checked={Boolean(form[item.key as FlagKey])}
                    disabled={disabled}
                    onChange={(e) => onChange(item.key, e.target.checked)}
                  />
                  {item.label}
                </label>
              ))}
            </div>
          </Field>
          <Field label="Please provide relevant details for the above" wide>
            <textarea className="form-control adm-textarea" rows={5} value={form.otherDetails} disabled={disabled} onChange={(e) => onChange('otherDetails', e.target.value)} />
          </Field>
          <Field label="Please upload relevant documents" wide>
            <FileInput field="otherDocuments" form={form} files={files} readOnly={readOnly} onFile={onFile} />
          </Field>
        </div>
      </section>

      {showAcademic && (
        <section className="adm-section">
          <h3>V. Programme & hostel</h3>
          <div className="adm-grid">
            <Field label="Batch">
              <select className="form-control" value={form.batch} disabled={disabled} onChange={(e) => onChange('batch', e.target.value)}>
                {BATCHES.map((b) => <option key={b} value={b}>{b}</option>)}
              </select>
            </Field>
            <Field label="Status">
              <select className="form-control" value={form.status} disabled={disabled} onChange={(e) => onChange('status', e.target.value)}>
                {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </Field>
            <Field label="Scholarship">
              <select className="form-control" value={form.scholarship} disabled={disabled} onChange={(e) => onChange('scholarship', e.target.value)}>
                {SCHOLARSHIPS.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </Field>
            <Field label="Hostel">
              <input className="form-control" value={form.hostel} disabled={disabled} onChange={(e) => onChange('hostel', e.target.value)} />
            </Field>
            <Field label="Room">
              <input className="form-control" value={form.room} disabled={disabled} onChange={(e) => onChange('room', e.target.value)} />
            </Field>
            <Field label="Attendance %">
              <input type="number" min="0" max="100" className="form-control" value={form.attendance} disabled={disabled} onChange={(e) => onChange('attendance', e.target.value)} />
            </Field>
            <Field label="Performance %">
              <input type="number" min="0" max="100" className="form-control" value={form.performance} disabled={disabled} onChange={(e) => onChange('performance', e.target.value)} />
            </Field>
            {showLoginFields && (
              <>
                <Field label="Portal username (optional)">
                  <input className="form-control" value={form.username || ''} disabled={disabled} onChange={(e) => onChange('username', e.target.value)} autoComplete="off" />
                </Field>
                <Field label="Portal password">
                  <input type="password" className="form-control" value={form.password || ''} disabled={disabled} onChange={(e) => onChange('password', e.target.value)} autoComplete="new-password" placeholder="Required with username; leave blank on edit to keep" />
                </Field>
              </>
            )}
          </div>
        </section>
      )}
    </div>
  );
};

export default StudentAdmissionForm;
