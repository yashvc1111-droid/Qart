import { useEffect, useState } from 'react';
import { ScanLine, X, Camera, RefreshCw, ChevronRight } from 'lucide-react';
import { PRODUCTS } from '../data';
import type { Product } from '../types';
import { TopBar } from '../components/TopBar';

interface ScannerProps {
  onBack: () => void;
  onScan: (p: Product) => void;
}

const SCAN_STEPS = ['Detecting barcode', 'Reading digits', 'Matching product'];

export function Scanner({ onBack, onScan }: ScannerProps) {
  const [scanning, setScanning] = useState(false);
  const [step, setStep] = useState(0);
  const [scannedProduct, setScannedProduct] = useState<Product | null>(null);
  const [scanIndex, setScanIndex] = useState(0);

  useEffect(() => {
    if (!scanning) return;
    setStep(0);
    setScannedProduct(null);
    const stepTimer = setInterval(() => {
      setStep((s) => {
        if (s >= SCAN_STEPS.length - 1) {
          clearInterval(stepTimer);
          const product = PRODUCTS[scanIndex % PRODUCTS.length];
          setScanIndex((i) => i + 1);
          setTimeout(() => setScannedProduct(product), 400);
          return s;
        }
        return s + 1;
      });
    }, 700);
    return () => clearInterval(stepTimer);
  }, [scanning, scanIndex]);

  const reset = () => {
    setScanning(false);
    setStep(0);
    setScannedProduct(null);
  };

  return (
    <div className="min-h-screen bg-canvas pb-10">
      <TopBar title="Scan Product" onCartClick={onBack} showCart={false} />

      <div className="mx-auto max-w-5xl px-4 pt-5 sm:px-6">
        <button
          onClick={onBack}
          className="mb-4 flex items-center gap-1 text-sm font-bold text-muted transition hover:text-brand-dark"
        >
          <X className="h-4 w-4" /> Cancel scan
        </button>

        <div className="relative mx-auto aspect-[3/4] max-w-sm overflow-hidden rounded-card bg-ink shadow-lift">
          <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/40 via-ink to-brand-dark/50" />
          <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(circle at 50% 30%, rgba(255,255,255,0.15), transparent 60%)' }} />

          {scanning && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative h-56 w-56">
                <div className="absolute inset-0 rounded-full border-2 border-brand-mint/40" />
                <div className="absolute inset-0 animate-pulse-ring rounded-full border-2 border-brand-mint" />
                <div className="absolute left-1/2 top-1/2 h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/20" />
              </div>
            </div>
          )}

          <div className="absolute left-1/2 top-1/2 h-52 w-64 -translate-x-1/2 -translate-y-1/2">
            <span className="absolute left-0 top-0 h-7 w-7 border-l-4 border-t-4 border-brand-mint rounded-tl-lg" />
            <span className="absolute right-0 top-0 h-7 w-7 border-r-4 border-t-4 border-brand-mint rounded-tr-lg" />
            <span className="absolute bottom-0 left-0 h-7 w-7 border-b-4 border-l-4 border-brand-mint rounded-bl-lg" />
            <span className="absolute bottom-0 right-0 h-7 w-7 border-b-4 border-r-4 border-brand-mint rounded-br-lg" />
            {scanning && (
              <div className="absolute left-2 right-2 top-1/2 h-0.5 -translate-y-1/2 bg-accent shadow-[0_0_12px_2px_rgba(255,122,26,0.7)] animate-scan" />
            )}
          </div>

          {!scanning && (
            <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center text-white">
              <Camera className="h-12 w-12 text-white/70" />
              <p className="mt-3 text-sm font-bold">Point your camera at a product barcode</p>
              <p className="mt-1 text-xs text-white/60">Align the barcode within the frame</p>
            </div>
          )}

          {scanning && !scannedProduct && (
            <div className="absolute bottom-6 left-0 right-0 text-center">
              <p className="text-sm font-bold text-white animate-pulse">{SCAN_STEPS[step]}...</p>
              <div className="mx-auto mt-2 h-1 w-32 overflow-hidden rounded-full bg-white/20">
                <div
                  className="h-full bg-accent transition-all duration-700"
                  style={{ width: `${((step + 1) / SCAN_STEPS.length) * 100}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {!scanning && (
          <button
            onClick={() => setScanning(true)}
            className="mx-auto mt-6 flex items-center gap-2 rounded-full bg-brand-dark px-6 py-3.5 text-sm font-bold text-white shadow-soft transition hover:bg-brand active:scale-95"
          >
            <ScanLine className="h-5 w-5" /> Start Scanning
          </button>
        )}

        {scanning && scannedProduct && (
          <div className="mx-auto mt-6 max-w-sm animate-pop rounded-card bg-white p-4 shadow-lift">
            <div className="flex items-center gap-3">
              <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-brand-light">
                <img src={scannedProduct.image} alt={scannedProduct.name} className="h-full w-full object-cover" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[11px] font-bold uppercase text-muted">{scannedProduct.brand}</p>
                <p className="truncate text-sm font-bold text-ink">{scannedProduct.name}</p>
                <p className="text-xs text-muted">Barcode: {scannedProduct.barcode}</p>
              </div>
            </div>
            <div className="mt-3 flex gap-2">
              <button
                onClick={reset}
                className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-brand-mint py-2.5 text-sm font-bold text-brand-dark transition hover:bg-brand-light"
              >
                <RefreshCw className="h-4 w-4" /> Rescan
              </button>
              <button
                onClick={() => onScan(scannedProduct)}
                className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-brand-dark py-2.5 text-sm font-bold text-white transition hover:bg-brand"
              >
                View Details <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        <div className="mx-auto mt-6 max-w-sm rounded-card bg-white p-4 shadow-soft">
          <p className="text-xs font-bold uppercase tracking-wide text-muted">Recent barcodes</p>
          <div className="mt-2 space-y-1.5">
            {PRODUCTS.slice(0, 3).map((p) => (
              <div key={p.id} className="flex items-center justify-between rounded-lg bg-canvas px-3 py-2">
                <span className="font-mono text-xs text-ink">{p.barcode}</span>
                <span className="text-xs font-semibold text-muted">{p.name.split(' ').slice(0, 2).join(' ')}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
