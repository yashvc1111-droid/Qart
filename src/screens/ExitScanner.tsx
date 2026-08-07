import { useState } from 'react';
import { ScanLine, X, CheckCircle, XCircle, DoorOpen, Loader2, RotateCw } from 'lucide-react';
import type { OrderDetails } from '../types';

interface ExitScannerProps {
  order: OrderDetails | null;
  onHome: () => void;
}

type Status = 'idle' | 'scanning' | 'verifying' | 'approved' | 'invalid';

export function ExitScanner({ order, onHome }: ExitScannerProps) {
  const [status, setStatus] = useState<Status>('idle');

  const handleScan = () => {
    if (status === 'scanning' || status === 'verifying') return;
    setStatus('scanning');
    setTimeout(() => setStatus('verifying'), 1500);
    setTimeout(() => {
      const expired = order ? Date.now() - order.createdAt > 5 * 60 * 1000 : true;
      setStatus(expired || !order ? 'invalid' : 'approved');
    }, 2800);
  };

  const reset = () => setStatus('idle');

  return (
    <div className="min-h-screen bg-canvas pb-10">
      <div className="mx-auto max-w-5xl px-4 pt-5 sm:px-6">
        <button
          onClick={onHome}
          className="flex items-center gap-1 text-sm font-bold text-muted transition hover:text-brand-dark"
        >
          <X className="h-4 w-4" /> Cancel
        </button>

        <div className="mx-auto mt-4 max-w-md text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-dark text-white shadow-soft">
            <DoorOpen className="h-6 w-6" />
          </div>
          <h1 className="mt-3 text-xl font-extrabold text-ink">Exit Gate Scanner</h1>
          <p className="mt-1 text-sm text-muted">Scan the QR code from your receipt to exit the store.</p>
        </div>

        {status !== 'approved' && status !== 'invalid' && (
          <div className="relative mx-auto mt-6 aspect-square max-w-xs overflow-hidden rounded-card bg-ink shadow-lift">
            <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/30 to-ink" />

            <div className="absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2">
              <span className="absolute left-0 top-0 h-7 w-7 border-l-4 border-t-4 border-brand-mint rounded-tl-lg" />
              <span className="absolute right-0 top-0 h-7 w-7 border-r-4 border-t-4 border-brand-mint rounded-tr-lg" />
              <span className="absolute bottom-0 left-0 h-7 w-7 border-b-4 border-l-4 border-brand-mint rounded-bl-lg" />
              <span className="absolute bottom-0 right-0 h-7 w-7 border-b-4 border-r-4 border-brand-mint rounded-br-lg" />
              {(status === 'scanning' || status === 'verifying') && (
                <div className="absolute left-2 right-2 top-1/2 h-0.5 -translate-y-1/2 bg-accent shadow-[0_0_12px_2px_rgba(255,122,26,0.7)] animate-scan" />
              )}
            </div>

            {status === 'idle' && (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                <ScanLine className="h-12 w-12 text-white/70" />
                <p className="mt-3 text-sm font-bold">Ready to scan</p>
                <p className="text-xs text-white/60">Hold your QR code in front of the scanner</p>
              </div>
            )}

            {(status === 'scanning' || status === 'verifying') && (
              <div className="absolute bottom-6 left-0 right-0 text-center text-white">
                <p className="text-sm font-bold animate-pulse">
                  {status === 'scanning' ? 'Scanning QR code...' : 'Verifying with server...'}
                </p>
              </div>
            )}
          </div>
        )}

        {status === 'idle' && (
          <div className="mx-auto mt-6 max-w-xs">
            <button
              onClick={handleScan}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-brand-dark py-3.5 text-sm font-bold text-white shadow-soft transition hover:bg-brand active:scale-95"
            >
              <ScanLine className="h-5 w-5" /> Start Scan
            </button>
          </div>
        )}

        {(status === 'scanning' || status === 'verifying') && (
          <div className="mx-auto mt-6 flex max-w-xs items-center justify-center gap-2 text-sm font-bold text-muted">
            <Loader2 className="h-5 w-5 animate-spin text-brand-dark" /> Please wait...
          </div>
        )}

        {status === 'approved' && (
          <div className="mx-auto mt-6 max-w-md animate-pop rounded-card bg-white p-8 text-center shadow-lift">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-brand-light">
              <CheckCircle className="h-11 w-11 text-brand-dark" />
            </div>
            <h2 className="mt-4 text-2xl font-extrabold text-brand-dark">Exit Approved</h2>
            <p className="mt-1 text-sm text-muted">Thank you for shopping with SmartCart!</p>
            {order && (
              <div className="mt-4 rounded-xl bg-canvas p-3 text-left text-sm">
                <div className="flex justify-between"><span className="text-muted">Order ID</span><span className="font-mono font-bold text-ink">{order.orderId}</span></div>
                <div className="mt-1 flex justify-between"><span className="text-muted">Total Paid</span><span className="font-bold text-brand-dark">{`₹${order.total}`}</span></div>
              </div>
            )}
            <button
              onClick={onHome}
              className="mt-5 w-full rounded-xl bg-brand-dark py-3 text-sm font-bold text-white shadow-soft transition hover:bg-brand"
            >
              Done
            </button>
          </div>
        )}

        {status === 'invalid' && (
          <div className="mx-auto mt-6 max-w-md animate-pop rounded-card bg-white p-8 text-center shadow-lift">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-error/10">
              <XCircle className="h-11 w-11 text-error" />
            </div>
            <h2 className="mt-4 text-2xl font-extrabold text-error">Invalid / Expired QR Code</h2>
            <p className="mt-1 text-sm text-muted">This QR code is not valid or has expired. Please visit the billing counter for assistance.</p>
            <div className="mt-5 grid grid-cols-2 gap-3">
              <button
                onClick={reset}
                className="flex items-center justify-center gap-1.5 rounded-xl border border-brand-mint py-3 text-sm font-bold text-brand-dark transition hover:bg-brand-light"
              >
                <RotateCw className="h-4 w-4" /> Try Again
              </button>
              <button
                onClick={onHome}
                className="rounded-xl bg-brand-dark py-3 text-sm font-bold text-white transition hover:bg-brand"
              >
                Go Home
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
