import { useEffect, useRef, useState } from 'react';
import QRCode from 'qrcode';
import { CheckCircle, Clock, DoorOpen, Download } from 'lucide-react';
import type { OrderDetails } from '../types';
import { formatINR } from '../data';

interface SuccessProps {
  order: OrderDetails;
  onExit: () => void;
  onHome: () => void;
}

const VALIDITY_MS = 5 * 60 * 1000;

export function Success({ order, onExit, onHome }: SuccessProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [remaining, setRemaining] = useState(VALIDITY_MS);
  const [expired, setExpired] = useState(false);

  useEffect(() => {
    if (canvasRef.current) {
      QRCode.toCanvas(canvasRef.current, order.qrToken, {
        width: 220,
        margin: 2,
        color: { dark: '#006B3C', light: '#FFFFFF' },
      }).catch(() => {});
    }
  }, [order.qrToken]);

  useEffect(() => {
    const interval = setInterval(() => {
      setRemaining((r) => {
        const next = r - 1000;
        if (next <= 0) {
          clearInterval(interval);
          setExpired(true);
          return 0;
        }
        return next;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const mins = Math.floor(remaining / 60000);
  const secs = Math.floor((remaining % 60000) / 1000);

  const downloadQR = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = `Qart-${order.orderId}.png`;
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <div className="min-h-screen bg-canvas pb-16">
      <div className="mx-auto max-w-md px-4 pt-8 sm:px-6">
        <div className="flex flex-col items-center rounded-card bg-white p-6 text-center shadow-lift animate-pop">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-light">
            <CheckCircle className="h-9 w-9 text-brand-dark" />
          </div>
          <h1 className="mt-3 text-xl font-extrabold text-ink">Payment Successful</h1>
          <p className="mt-1 text-sm text-muted">Your order has been confirmed. Show the QR at the exit gate.</p>

          <div className="mt-4 w-full rounded-xl bg-brand-light p-3 text-left">
            <div className="flex justify-between text-sm">
              <span className="text-muted">Order ID</span>
              <span className="font-mono font-bold text-ink">{order.orderId}</span>
            </div>
            <div className="mt-1.5 flex justify-between text-sm">
              <span className="text-muted">Amount Paid</span>
              <span className="font-bold text-brand-dark">{formatINR(order.total)}</span>
            </div>
            <div className="mt-1.5 flex justify-between text-sm">
              <span className="text-muted">Payment Mode</span>
              <span className="font-semibold text-ink">{order.paymentMethod}</span>
            </div>
            <div className="mt-1.5 flex justify-between text-sm">
              <span className="text-muted">Items</span>
              <span className="font-semibold text-ink">{order.itemCount}</span>
            </div>
          </div>
        </div>

        <div className="mt-5 rounded-card bg-white p-6 text-center shadow-soft">
          <div className="relative inline-block">
            <canvas ref={canvasRef} className="rounded-xl" />
            {expired && (
              <div className="absolute inset-0 flex flex-col items-center justify-center rounded-xl bg-white/90 backdrop-blur-sm">
                <Clock className="h-8 w-8 text-error" />
                <p className="mt-1 text-xs font-bold text-error">QR Expired</p>
              </div>
            )}
          </div>
          <div className="mt-3 flex items-center justify-center gap-1.5">
            <Clock className={`h-4 w-4 ${expired ? 'text-error' : 'text-accent'}`} />
            <p className={`text-sm font-bold ${expired ? 'text-error' : 'text-ink'}`}>
              {expired ? 'QR code expired' : `Valid for ${mins}:${secs.toString().padStart(2, '0')}`}
            </p>
          </div>
          <p className="mt-1 text-xs text-muted">Present this QR at the exit scanner to leave the store.</p>

          <button
            onClick={downloadQR}
            className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-xl border border-brand-mint py-2.5 text-xs font-bold text-brand-dark transition hover:bg-brand-light"
          >
            <Download className="h-4 w-4" /> Download QR
          </button>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3">
          <button
            onClick={onHome}
            className="rounded-xl border border-brand-mint py-3 text-sm font-bold text-brand-dark transition hover:bg-brand-light"
          >
            New Shopping
          </button>
          <button
            onClick={onExit}
            className="flex items-center justify-center gap-1.5 rounded-xl bg-brand-dark py-3 text-sm font-bold text-white shadow-soft transition hover:bg-brand active:scale-95"
          >
            <DoorOpen className="h-4 w-4" /> Go to Exit
          </button>
        </div>
      </div>
    </div>
  );
}
