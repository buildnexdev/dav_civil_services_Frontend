import { api } from './api';

export type RazorpayOrderResponse = {
  keyId: string;
  orderId?: string;
  amountPaise: number;
  payment: {
    id: number;
    paymentCode: string;
    amount: number;
    category: string;
    payerName: string;
    email: string;
    phone: string;
    status: string;
  };
};

type CheckoutPrefill = {
  name?: string;
  email?: string;
  contact?: string;
};

declare global {
  interface Window {
    Razorpay?: new (options: Record<string, unknown>) => { open: () => void };
  }
}

export function loadRazorpay(): Promise<NonNullable<Window['Razorpay']>> {
  return new Promise((resolve, reject) => {
    if (window.Razorpay) {
      resolve(window.Razorpay);
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => {
      if (window.Razorpay) resolve(window.Razorpay);
      else reject(new Error('Razorpay checkout failed to load.'));
    };
    script.onerror = () => reject(new Error('Could not load Razorpay checkout.'));
    document.body.appendChild(script);
  });
}

export async function payWithRazorpay(order: RazorpayOrderResponse, prefill: CheckoutPrefill = {}) {
  const RazorpayCheckout = await loadRazorpay();
  return new Promise((resolve, reject) => {
    const checkout = new RazorpayCheckout({
      key: order.keyId,
      amount: order.amountPaise,
      currency: 'INR',
      name: 'DAV Civil Services',
      description: `${order.payment.category} • ${order.payment.paymentCode}`,
      order_id: order.orderId || undefined,
      prefill: {
        name: prefill.name || order.payment.payerName,
        email: prefill.email || order.payment.email,
        contact: prefill.contact || order.payment.phone,
      },
      notes: {
        paymentCode: order.payment.paymentCode,
        category: order.payment.category,
      },
      theme: { color: '#5C4030' },
      handler: async (response: {
        razorpay_payment_id: string;
        razorpay_order_id?: string;
        razorpay_signature?: string;
      }) => {
        try {
          const data = await api<{ payment: RazorpayOrderResponse['payment'] }>('/api/payments/verify', {
            method: 'POST',
            body: JSON.stringify({
              paymentId: order.payment.id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id || order.orderId,
              razorpay_signature: response.razorpay_signature,
            }),
          });
          resolve(data.payment);
        } catch (err) {
          reject(err);
        }
      },
      modal: {
        ondismiss: () => reject(new Error('Payment was cancelled.')),
      },
    });
    checkout.open();
  });
}
