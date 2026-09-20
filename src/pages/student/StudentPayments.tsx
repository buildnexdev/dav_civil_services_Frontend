import { useCallback, useEffect, useState } from 'react';
import { api } from '../../lib/api';
import { payWithRazorpay, type RazorpayOrderResponse } from '../../lib/razorpay';
import '../admin/AdminStudents.css';

type Payment = {
  id: number;
  paymentCode: string;
  category: string;
  amount: number;
  razorpayPaymentId: string;
  status: string;
  createdAt: string;
};

const FEES = [
  { category: 'Program Fee', amount: 50000, note: 'Residential coaching fee' },
  { category: 'Hostel Fee', amount: 30000, note: 'Hostel and mess' },
  { category: 'Test Series Fee', amount: 5000, note: 'Prelims + Mains tests' },
];

const StudentPayments = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [paying, setPaying] = useState('');
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await api<{ payments: Payment[] }>('/api/payments');
      setPayments(data.payments);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load payments.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const pay = async (category: string, amount: number) => {
    setPaying(category);
    setError('');
    try {
      const order = await api<RazorpayOrderResponse>('/api/payments/order', {
        method: 'POST',
        body: JSON.stringify({ category, amount }),
      });
      const paid = await payWithRazorpay(order);
      setNotice(`${paid.category} of ₹${paid.amount.toLocaleString('en-IN')} paid successfully.`);
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Payment was not completed.');
    } finally {
      setPaying('');
    }
  };

  return (
    <div>
      <div className="student-page-header">
        <h2>My Payments</h2>
      </div>
      <div className="student-banner success">
        Razorpay Test Mode: use card 4111 1111 1111 1111, any future expiry, any CVV.
      </div>
      {notice && <div className="student-banner success">{notice}<button type="button" onClick={() => setNotice('')}>×</button></div>}
      {error && <div className="student-banner error">{error}</div>}

      <div className="stat-cards" style={{ marginBottom: '1.5rem' }}>
        {FEES.map((fee) => (
          <div className="stat-card" key={fee.category}>
            <div className="stat-card-label">{fee.category}</div>
            <div className="stat-card-value">₹{fee.amount.toLocaleString('en-IN')}</div>
            <p className="text-muted">{fee.note}</p>
            <button className="btn btn-primary btn-sm" disabled={!!paying} onClick={() => pay(fee.category, fee.amount)}>
              {paying === fee.category ? 'Opening Razorpay...' : 'Pay with Razorpay'}
            </button>
          </div>
        ))}
      </div>

      <div className="dash-section">
        <h3>Payment history</h3>
        {loading ? (
          <p className="student-empty">Loading payments...</p>
        ) : payments.length === 0 ? (
          <p className="student-empty">No payments yet.</p>
        ) : (
          <div style={{ overflowX: 'auto', marginTop: '1rem' }}>
            <table className="dash-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Category</th>
                  <th>Amount</th>
                  <th>Razorpay ID</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((p) => (
                  <tr key={p.id}>
                    <td>{p.paymentCode}</td>
                    <td>{p.category}</td>
                    <td>₹{Number(p.amount).toLocaleString('en-IN')}</td>
                    <td>{p.razorpayPaymentId || '—'}</td>
                    <td><span className={`status-badge status-${p.status.toLowerCase()}`}>{p.status}</span></td>
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

export default StudentPayments;
