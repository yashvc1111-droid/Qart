import { ArrowLeft, Clock3, ScanLine } from 'lucide-react';
import type { Product } from '../types';

interface ScanHistoryProps {
  history: Product[];
  onBack: () => void;
  onScan: () => void;
}

export function ScanHistory({ history, onBack, onScan }: ScanHistoryProps) {
  return (
    <div className="min-h-screen bg-canvas pb-20">
      <header className="bg-brand-dark px-4 py-4 text-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <button onClick={onBack} className="flex items-center gap-1 text-sm font-bold">
            <ArrowLeft className="h-4 w-4" /> Back
          </button>
          <div className="flex items-center gap-2 font-extrabold">
            <Clock3 className="h-5 w-5" /> Scan History
          </div>
          <button
            onClick={onScan}
            className="flex items-center gap-1 rounded-full bg-white/15 px-3 py-2 text-xs font-bold"
          >
            <ScanLine className="h-4 w-4" /> Scan
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 pt-5">
        <div className="rounded-[24px] bg-white p-4 shadow-soft">
          <h1 className="text-lg font-extrabold text-ink">Recently Scanned</h1>
          <p className="mt-1 text-xs text-muted">Your latest products from this shopping session.</p>
        </div>

        {history.length === 0 ? (
          <div className="mt-4 rounded-[24px] bg-white p-10 text-center shadow-soft">
            <Clock3 className="mx-auto h-10 w-10 text-brand-dark" />
            <h2 className="mt-3 font-extrabold text-ink">No scan history yet</h2>
            <p className="mt-1 text-xs text-muted">Scan a product and it will appear here.</p>
          </div>
        ) : (
          <div className="mt-4 space-y-2">
            {history.map((product) => (
              <div key={product.id} className="flex items-center gap-3 rounded-2xl bg-white p-3 shadow-soft">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-14 w-14 rounded-xl bg-brand-light object-cover"
                />
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] font-bold uppercase text-muted">{product.brand}</p>
                  <p className="truncate text-sm font-extrabold text-ink">{product.name}</p>
                  <p className="text-[11px] text-muted">{product.barcode}</p>
                </div>
                <span className="text-sm font-extrabold text-brand-dark">₹{product.price}</span>
              </div>
            ))}
          </div>
        )}

        <button
          onClick={onScan}
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-brand-dark py-3.5 text-sm font-bold text-white shadow-soft"
        >
          <ScanLine className="h-5 w-5" /> Scan Product
        </button>
      </main>
    </div>
  );
}
