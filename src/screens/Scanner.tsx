import { useEffect, useState } from 'react';
import { ArrowLeft, CheckCircle2, RefreshCw, ScanLine } from 'lucide-react';
import { PRODUCTS } from '../data';
import type { Product } from '../types';

interface ScannerProps {
  onBack: () => void;
  onScan: (p: Product) => void;
  onProductDetected?: (p: Product) => void;
}

const SCAN_STEPS = [
  'Searching for barcode...',
  'Reading barcode...',
  'Identifying product...',
];

export function Scanner({ onBack, onScan, onProductDetected }: ScannerProps) {
  const [scanning, setScanning] = useState(false);
  const [step, setStep] = useState(0);
  const [scannedProduct, setScannedProduct] = useState<Product | null>(null);

  const startScan = () => {
    setScannedProduct(null);
    setStep(0);
    setScanning(true);
  };

  useEffect(() => {
    if (!scanning) return;

    const timer = setInterval(() => {
      setStep((current) => {
        if (current >= SCAN_STEPS.length - 1) {
          clearInterval(timer);

          // Simulation: each scan randomly selects a product from the catalog.
          const product = PRODUCTS[Math.floor(Math.random() * PRODUCTS.length)];

          setTimeout(() => {
            setScannedProduct(product);
            onProductDetected?.(product);
            onScan(product);
            setScanning(false);
          }, 500);

          return current;
        }
        return current + 1;
      });
    }, 750);

    return () => clearInterval(timer);
  }, [scanning, onProductDetected, onScan]);

  return (
    <div className="min-h-screen bg-canvas pb-20">
      <header className="bg-brand-dark px-4 py-4 text-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <button onClick={onBack} className="flex items-center gap-1 text-sm font-bold">
            <ArrowLeft className="h-4 w-4" /> Back
          </button>
          <div className="flex items-center gap-2 font-extrabold">
            <ScanLine className="h-5 w-5" /> Scan Product
          </div>
          <span className="text-xs text-white/70">Simulation</span>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 pt-5">
        <div className="overflow-hidden rounded-[28px] bg-[#092c1d] shadow-lift">
          <div className="relative h-[440px]">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-64 w-64 rounded-full border border-white/25" />
              <div className="absolute h-48 w-48 rounded-full border border-white/20" />
            </div>

            <div className="absolute left-[15%] right-[15%] top-[22%] h-1 rounded-full bg-orange-400 shadow-[0_0_14px_rgba(251,146,60,0.8)] animate-pulse" />
            <div className="absolute left-[15%] top-[18%] h-10 w-10 rounded-tl-xl border-l-4 border-t-4 border-emerald-200" />
            <div className="absolute right-[15%] top-[18%] h-10 w-10 rounded-tr-xl border-r-4 border-t-4 border-emerald-200" />
            <div className="absolute bottom-[18%] left-[15%] h-10 w-10 rounded-bl-xl border-b-4 border-l-4 border-emerald-200" />
            <div className="absolute bottom-[18%] right-[15%] h-10 w-10 rounded-br-xl border-b-4 border-r-4 border-emerald-200" />

            <div className="absolute bottom-8 left-0 right-0 text-center text-sm font-bold text-white/90">
              {scanning ? SCAN_STEPS[step] : 'Point the scanner at a product barcode'}
            </div>
          </div>
        </div>

        {scannedProduct && !scanning && (
          <div className="mt-5 rounded-[24px] bg-white p-4 shadow-lift">
            <div className="flex items-center gap-3">
              <img
                src={scannedProduct.image}
                alt={scannedProduct.name}
                className="h-16 w-16 rounded-xl bg-brand-light object-cover"
              />
              <div className="min-w-0 flex-1">
                <p className="text-[10px] font-bold uppercase text-muted">{scannedProduct.brand}</p>
                <h2 className="truncate text-base font-extrabold text-ink">{scannedProduct.name}</h2>
                <p className="text-xs text-muted">Barcode: {scannedProduct.barcode}</p>
              </div>
              <CheckCircle2 className="h-7 w-7 shrink-0 text-brand-dark" />
            </div>

            <div className="mt-3 rounded-xl bg-brand-light px-3 py-2 text-center text-xs font-bold text-brand-dark">
              Product detected successfully
            </div>
          </div>
        )}

        <button
          onClick={startScan}
          disabled={scanning}
          className="mx-auto mt-5 flex w-full max-w-sm items-center justify-center gap-2 rounded-full bg-brand-dark px-6 py-4 text-sm font-extrabold text-white shadow-soft transition hover:bg-brand active:scale-95 disabled:opacity-50"
        >
          {scanning ? (
            <>
              <RefreshCw className="h-5 w-5 animate-spin" /> Scanning...
            </>
          ) : (
            <>
              <ScanLine className="h-5 w-5" /> {scannedProduct ? 'Scan Another Product' : 'Start Scanning'}
            </>
          )}
        </button>

        <p className="mx-auto mt-3 max-w-sm text-center text-[11px] text-muted">
          Demo mode: every scan randomly selects a different product from the SmartCart catalog.
        </p>
      </main>
    </div>
  );
}
