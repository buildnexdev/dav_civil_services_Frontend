import { useCallback, useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import { api } from '../../lib/api';
import { payWithRazorpay, type RazorpayOrderResponse } from '../../lib/razorpay';
import type { Student } from '../../types/student';
import './AdminStudents.css';

type Payment = {
  id: number;
  paymentCode: string;
  studentId: number | '';
  studentName: string;
  studentCode: string;
  payerName: string;
  email: string;
  phone: string;
  category: string;
  amount: number;
  method: string;
  razorpayPaymentId: string;
  razorpayOrderId: string;
  status: 'Created' | 'Pending' | 'Completed' | 'Failed';
  createdAt: string;
};

const CATEGORIES = ['Program Fee', 'Hostel Fee', 'Test Series Fee', 'Application Fee', 'Other'];
const PRESETS: Record<string, number> = {
  'Program Fee': 50000,
  'Hostel Fee': 30000,
  'Test Series Fee': 5000,
  'Application Fee': 500,
  Other: 1000,
};

const AdminPayments = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [paying, setPaying] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [testMode, setTestMode] = useState(true);
  const [form, setForm] = useState({
    studentId: '',
    category: 'Program Fee',
    amount: 50000,
    payerName: '',
    email: '',
    phone: '',
  });

  const load = useCallback(async (query = '', status = '') => {
    setLoading(true);
    setError('');
    try {
      const params = new URLSearchParams();
      if (query.trim()) params.set('search', query.trim());
      if (status) params.set('status', status);
      const qs = params.toString();
      const data = await api<{ payments: Payment[] }>(`/api/payments${qs ? `?${qs}` : ''}`);
      setPayments(data.payments);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load payments.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
    api<{ students: Student[] }>('/api/students').then((data) => setStudents(data.students)).catch(() => {});
    api<{ testMode: boolean }>('/api/payments/config').then((data) => setTestMode(data.testMode)).catch(() => {});
  }, [load]);

  const onStudentChange = (studentId: string) => {
    const student = students.find((s) => String(s.id) === studentId);
    setForm((prev) => ({
      ...prev,
      studentId,
      payerName: student?.name || prev.payerName,
      email: student?.email || prev.email,
      phone: student?.phone || prev.phone,
    }));
  };

  const collect = async (e: FormEvent) => {
    e.preventDefault();
    setPaying(true);
    setError('');
    try {
      const order = await api<RazorpayOrderResponse>('/api/payments/order', {
        method: 'POST',
        body: JSON.stringify({
          studentId: form.studentId || undefined,
          category: form.category,
          amount: form.amount,
          payerName: form.payerName,
          email: form.email,
          phone: form.phone,
        }),
      });
      const paid = await payWithRazorpay(order);
      setPayments((prev) => [paid as Payment, ...prev.filter((p) => p.id !== paid.id)]);
      setNotice(`Payment ${paid.paymentCode} completed via Razorpay.`);
      await load(search, statusFilter);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Payment was not completed.');
    } finally {
      setPaying(false);
    }
  };

  const handleDelete = async (item: Payment) => {
    if (!window.confirm(`Delete ${item.paymentCode}?`)) return;
    try {
      await api(`/api/payments/${item.id}`, { method: 'DELETE' });
      setPayments((prev) => prev.filter((p) => p.id !== item.id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not delete payment.');
    }
  };

  const collected = payments.filter((p) => p.status === 'Completed').reduce((sum, p) => sum + Number(p.amount), 0);
  const pending = payments.filter((p) => p.status === 'Pending' || p.status === 'Created').length;
  const failed = payments.filter((p) => p.status === 'Failed').length;

  return (
    <div>
      <div className="student-page-header">
        <h2>Payment Management</h2>
        <form className="student-toolbar" onSubmit={(e) => { e.preventDefault(); load(search, statusFilter); }}>
          <select className="form-control" style={{ width: 150 }} value={statusFilter} onChange={(e) => { setStatusFilter(e.target.value); load(search, e.target.value); }}>
            <option value="">All status</option>
            <option value="Completed">Completed</option>
            <option value="Pending">Pending</option>
            <option value="Created">Created</option>
            <option value="Failed">Failed</option>
          </select>
          <input className="form-control" placeholder="Search payments..." value={search} onChange={(e) => setSearch(e.target.value)} />
          <button type="submit" className="btn btn-outline">Search</button>
        </form>
      </div>

      {testMode && (
        <div className="student-banner success">
          Razorpay Test Mode is on. Use card <strong>4111 1111 1111 1111</strong>, any future expiry, any CVV. No real money is charged.
          <span />
        </div>
      )}
      {notice && <div className="student-banner success">{notice}<button type="button" onClick={() => setNotice('')}>×</button></div>}
      {error && <div className="student-banner error">{error}</div>}

      <div className="stat-cards" style={{ marginBottom: '1.5rem' }}>
        <div className="stat-card"><div className="stat-card-label">Collected</div><div className="stat-card-value">₹{collected.toLocaleString('en-IN')}</div></div>
        <div className="stat-card"><div className="stat-card-label">Pending</div><div className="stat-card-value">{pending}</div></div>
        <div className="stat-card"><div className="stat-card-label">Failed</div><div className="stat-card-value">{failed}</div></div>
        <div className="stat-card"><div className="stat-card-label">Records</div><div className="stat-card-value">{payments.length}</div></div>
      </div>

      <div className="dash-section" style={{ marginBottom: '1.5rem' }}>
        <h3>Collect with Razorpay</h3>
        <form className="student-form-grid" onSubmit={collect} style={{ marginTop: '1rem' }}>
          <div className="form-group">
            <label>Student</label>
            <select className="form-control" value={form.studentId} onChange={(e) => onStudentChange(e.target.value)}>
              <option value="">Guest / application</option>
              {students.map((s) => <option key={s.id} value={s.id}>{s.studentCode} — {s.name}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label>Category</label>
            <select className="form-control" value={form.category} onChange={(e) => setForm((p) => ({ ...p, category: e.target.value, amount: PRESETS[e.target.value] || p.amount }))}>
              {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label>Amount (₹)</label>
            <input type="number" min={1} className="form-control" value={form.amount} onChange={(e) => setForm((p) => ({ ...p, amount: Number(e.target.value) }))} />
          </div>
          <div className="form-group">
            <label>Payer name</label>
            <input className="form-control" value={form.payerName} onChange={(e) => setForm((p) => ({ ...p, payerName: e.target.value }))} />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" className="form-control" value={form.email} onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))} />
          </div>
          <div className="form-group">
            <label>Phone</label>
            <input className="form-control" value={form.phone} onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))} />
          </div>
          <div className="form-group student-span-2">
            <button type="submit" className="btn btn-primary" disabled={paying}>{paying ? 'Opening Razorpay...' : 'Pay with Razorpay'}</button>
          </div>
        </form>
      </div>

      <div className="dash-section">
        {loading ? (
          <p className="student-empty">Loading payments...</p>
        ) : payments.length === 0 ? (
          <p className="student-empty">No payments yet. Collect a test payment with Razorpay.</p>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table className="dash-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Payer</th>
                  <th>Category</th>
                  <th>Amount</th>
                  <th>Razorpay ID</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((p) => (
                  <tr key={p.id}>
                    <td>{p.paymentCode}</td>
                    <td><strong>{p.payerName || p.studentName || '—'}</strong><div className="text-muted">{p.studentCode}</div></td>
                    <td>{p.category}</td>
                    <td>₹{Number(p.amount).toLocaleString('en-IN')}</td>
                    <td>{p.razorpayPaymentId || p.razorpayOrderId || '—'}</td>
                    <td><span className={`status-badge status-${p.status.toLowerCase()}`}>{p.status}</span></td>
                    <td className="student-actions">
                      <button className="btn btn-danger btn-sm" onClick={() => handleDelete(p)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPayments;
