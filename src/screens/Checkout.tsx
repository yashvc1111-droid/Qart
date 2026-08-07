import { useState } from 'react';
import { ArrowLeft, Smartphone, CreditCard, Wallet, ShieldCheck, Loader2, CheckCircle, Zap } from 'lucide-react';
import { useCart } from '../cart';
import { formatINR } from '../data';
import type { OrderDetails, PaymentMethod } from '../types';
import { TopBar } from '../components/TopBar';

interface CheckoutProps {
  onBack: () => void;
  onSuccess: (order: OrderDetails) => void;
}

const METHODS: { id: PaymentMethod; label: string; sub: string; icon: typeof Smartphone; emoji: string }[] = [
  { id: 'upi', label: 'UPI', sub: 'GPay, PhonePe, Paytm', icon: Smartphone, emoji: '📱' },
  { id: 'card', label: 'Card', sub: 'Debit / Credit card', icon: CreditCard, emoji: '💳' },
  { id: 'wallet', label: 'Wallet', sub: 'Paytm, Amazon Pay', icon: Wallet, emoji: '👛' },
];

export function Checkout({ onBack, onSuccess }: CheckoutProps) {
  const { items, subtotal, totalSavings, count, clear } = useCart();
  const [method, setMethod] = useState<PaymentMethod>('upi');
  const [processing, setProcessing] = useState(false);

  const tax = Math.round(subtotal * 0.05);
  const total = subtotal + tax;

  const handlePay = () => {
    setProcessing(true);
    setTimeout(() => {
      const order: OrderDetails = {
        orderId: 'SC' + Date.now().toString().slice(-8),
        total,
        subtotal,
        discount: totalSavings,
        tax,
        paymentMethod: METHODS.find((m) => m.id === method)!.label,
        itemCount: count,
        createdAt: Date.now(),
        qrToken: 'SC-EXIT-' + Math.random().toString(36).slice(2, 10).toUpperCase(),
      };
      clear();
      setProcessing(false);
      onSuccess(order);
    }, 2200);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-canvas">
        <TopBar title="Checkout" onCartClick={onBack} showCart={false} />
        <div className="mx-auto max-w-md px-6 pt-20 text-center">
          <p className="text-lg font-bold text-ink">Your cart is empty.</p>
          <button onClick={onBack} className="mt-4 rounded-xl bg-brand-dark px-5 py-3 text-sm font-bold text-white">
            Go back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-canvas pb-32">
      <TopBar title="Checkout" onCartClick={onBack} showCart={false} />

      <div className="mx-auto max-w-5xl px-4 pt-5 sm:px-6">
        <button
          onClick={onBack}
          className="flex items-center gap-1 text-sm font-bold text-muted transition hover:text-brand-dark"
        >
          <ArrowLeft className="h-4 w-4" /> Back to cart
        </button>

        <div className="mt-4 grid gap-5 lg:grid-cols-3">
          <div className="space-y-5 lg:col-span-2">
            <div className="rounded-card bg-white p-5 shadow-soft ring-1 ring-brand-mint/20">
              <h2 className="text-sm font-extrabold text-ink">Order Summary</h2>
              <div className="mt-3 max-h-72 space-y-2.5 overflow-y-auto pr-1">
                {items.map(({ product, quantity }) => (
                  <div key={product.id} className="flex items-center gap-3">
                    <div className="h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-brand-light">
                      <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-ink">{product.name}</p>
                      <p className="text-xs text-muted">{formatINR(product.price)} × {quantity}</p>
                    </div>
                    <span className="text-sm font-bold text-ink">{formatINR(product.price * quantity)}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-card bg-white p-5 shadow-soft ring-1 ring-brand-mint/20">
              <h2 className="text-sm font-extrabold text-ink">Payment Method</h2>
              <div className="mt-3 grid gap-2.5 sm:grid-cols-3">
                {METHODS.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setMethod(m.id)}
                    className={`relative flex flex-col items-start gap-1 rounded-xl border-2 p-3 text-left transition ${
                      method === m.id
                        ? 'border-brand-dark bg-brand-light'
                        : 'border-brand-mint bg-white hover:bg-canvas'
                    }`}
                  >
                    {method === m.id && (
                      <CheckCircle className="absolute right-2 top-2 h-4 w-4 text-brand-dark" />
                    )}
                    <m.icon className="h-6 w-6 text-brand-dark" />
                    <p className="text-sm font-bold text-ink">{m.label}</p>
                    <p className="text-[11px] text-muted">{m.sub}</p>
                  </button>
                ))}
              </div>

              {method === 'upi' && (
                <div className="mt-3 rounded-xl bg-canvas p-3 animate-fade-up">
                  <label className="text-xs font-bold uppercase text-muted">Enter UPI ID</label>
                  <input
                    placeholder="yourname@okhdfcbank"
                    className="mt-1 w-full rounded-lg border border-brand-mint bg-white px-3 py-2.5 text-sm font-medium outline-none focus:border-brand"
                  />
                </div>
              )}
              {method === 'card' && (
                <div className="mt-3 space-y-2 rounded-xl bg-canvas p-3 animate-fade-up">
                  <input placeholder="Card number" className="w-full rounded-lg border border-brand-mint bg-white px-3 py-2.5 text-sm font-medium outline-none focus:border-brand" />
                  <div className="grid grid-cols-2 gap-2">
                    <input placeholder="MM/YY" className="rounded-lg border border-brand-mint bg-white px-3 py-2.5 text-sm font-medium outline-none focus:border-brand" />
                    <input placeholder="CVV" className="rounded-lg border border-brand-mint bg-white px-3 py-2.5 text-sm font-medium outline-none focus:border-brand" />
                  </div>
                </div>
              )}
              {method === 'wallet' && (
                <div className="mt-3 rounded-xl bg-canvas p-3 text-sm text-muted animate-fade-up">
                  You will be redirected to your wallet to approve the payment of <span className="font-bold text-ink">{formatINR(total)}</span>.
                </div>
              )}
            </div>
          </div>

          <div className="lg:sticky lg:top-20 lg:self-start">
            <div className="rounded-card bg-white p-5 shadow-soft ring-1 ring-brand-mint/20">
              <h3 className="text-sm font-extrabold text-ink">Payment Details</h3>
              <div className="mt-4 space-y-2.5 text-sm">
                <Row label={`Item total (${count})`} value={formatINR(subtotal + totalSavings)} />
                <Row label="Product savings" value={`- ${formatINR(totalSavings)}`} accent />
                <Row label="Taxes & fees" value={formatINR(tax)} />
                <div className="my-2 border-t border-dashed border-brand-mint" />
                <div className="flex items-center justify-between">
                  <span className="text-base font-extrabold text-ink">Amount Payable</span>
                  <span className="text-base font-extrabold text-brand-dark">{formatINR(total)}</span>
                </div>
              </div>

              <button
                onClick={handlePay}
                disabled={processing}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-accent py-3.5 text-sm font-bold text-white shadow-soft transition hover:brightness-110 active:scale-[0.98] disabled:opacity-70"
              >
                {processing ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" /> Processing payment...
                  </>
                ) : (
                  <><Zap className="h-4 w-4" /> Pay {formatINR(total)} Now</>
                )}
              </button>

              <div className="mt-3 flex items-center justify-center gap-1.5 text-[11px] text-muted">
                <ShieldCheck className="h-3.5 w-3.5 text-brand-dark" /> 100% secure & encrypted payment
              </div>
            </div>
          </div>
        </div>
      </div>

      {processing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/50 backdrop-blur-sm">
          <div className="rounded-card bg-white p-8 text-center shadow-lift">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand-light">
              <Loader2 className="h-8 w-8 animate-spin text-brand-dark" />
            </div>
            <p className="mt-4 text-sm font-bold text-ink">Processing your payment</p>
            <p className="mt-1 text-xs text-muted">Please do not close this window</p>
          </div>
        </div>
      )}
    </div>
  );
}

function Row({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-muted">{label}</span>
      <span className={accent ? 'font-bold text-accent' : 'font-semibold text-ink'}>{value}</span>
    </div>
  );
}
