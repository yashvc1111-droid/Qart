import { useState } from 'react';
import { ArrowLeft, Plus, Minus, Star, CheckCircle, Package, ShieldCheck, Truck, Zap } from 'lucide-react';
import type { Product } from '../types';
import { formatINR } from '../data';
import { useCart } from '../cart';
import { Toast } from '../components/Toast';

interface ProductDetailsProps {
  product: Product;
  onBack: () => void;
  onGoCart: () => void;
}

export function ProductDetails({ product, onBack, onGoCart }: ProductDetailsProps) {
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addItem(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const savings = product.mrp - product.price;
  const discountPct = Math.round((savings / product.mrp) * 100);

  return (
    <div className="min-h-screen bg-canvas pb-28">
      <div className="mx-auto max-w-5xl px-4 pt-5 sm:px-6">
        <button
          onClick={onBack}
          className="flex items-center gap-1 text-sm font-bold text-muted transition hover:text-brand-dark"
        >
          <ArrowLeft className="h-4 w-4" /> Back
        </button>

        <div className="mt-4 grid gap-5 md:grid-cols-2">
          <div className="relative overflow-hidden rounded-card bg-gradient-to-br from-brand-light to-brand-mint shadow-soft animate-fade-up">
            <img
              src={product.image}
              alt={product.name}
              className="aspect-square h-full w-full object-cover"
            />
            {product.offer && (
              <span className="absolute left-4 top-4 rounded-full bg-accent px-3 py-1 text-xs font-bold text-white shadow-soft">
                {product.offer}
              </span>
            )}
            <span className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-xs font-bold text-brand-dark shadow-soft">
              <Star className="h-3 w-3 fill-accent text-accent" /> {product.rating}
            </span>
          </div>

          <div className="animate-fade-up" style={{ animationDelay: '80ms' }}>
            <p className="text-xs font-bold uppercase tracking-wide text-accent">{product.brand}</p>
            <h1 className="mt-1 text-2xl font-extrabold leading-tight text-ink">{product.name}</h1>
            <p className="mt-1 text-sm text-muted">{product.unit} · MRP inclusive of all taxes</p>

            <div className="mt-3 flex items-end gap-2">
              <span className="text-3xl font-extrabold text-brand-dark">{formatINR(product.price)}</span>
              <span className="pb-1 text-sm text-muted line-through">{formatINR(product.mrp)}</span>
              {savings > 0 && (
                <span className="mb-1 rounded-md bg-accent-light px-2 py-0.5 text-xs font-bold text-accent">
                  {discountPct}% off
                </span>
              )}
            </div>

            <div className="mt-3 flex items-center gap-1.5 text-xs text-muted">
              <Star className="h-3.5 w-3.5 fill-accent text-accent" />
              <span className="font-bold text-ink">{product.rating}</span>
              <span>· {product.reviews.toLocaleString('en-IN')} ratings</span>
            </div>

            <div className="mt-4 flex items-center gap-2 rounded-xl bg-brand-light px-3 py-2 text-xs font-semibold text-brand-dark">
              <Package className="h-4 w-4" />
              {product.stock > 0 ? `In stock · ${product.stock} units available` : 'Out of stock'}
            </div>

            <p className="mt-4 text-sm leading-relaxed text-muted">{product.description}</p>

            <div className="mt-4 grid grid-cols-3 gap-2">
              <Feature icon={Truck} label="Fast delivery" />
              <Feature icon={ShieldCheck} label="100% genuine" />
              <Feature icon={Zap} label="Smart checkout" />
            </div>

            <div className="mt-4 rounded-xl bg-canvas p-3">
              <p className="text-xs font-bold uppercase tracking-wide text-muted">Barcode</p>
              <p className="mt-0.5 font-mono text-sm font-bold text-ink">{product.barcode}</p>
            </div>

            <div className="mt-5 flex items-center gap-3">
              <div className="flex items-center gap-1 rounded-xl border border-brand-mint bg-white p-1">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-brand-dark transition hover:bg-brand-light"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-8 text-center text-sm font-extrabold text-ink">{qty}</span>
                <button
                  onClick={() => setQty((q) => Math.min(product.stock, q + 1))}
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-brand-dark transition hover:bg-brand-light"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              <button
                onClick={handleAdd}
                className="flex-1 rounded-xl bg-brand-dark py-3 text-sm font-bold text-white shadow-soft transition hover:bg-brand active:scale-[0.98]"
              >
                Add to Cart · {formatINR(product.price * qty)}
              </button>
            </div>

            <button
              onClick={onGoCart}
              className="mt-3 w-full rounded-xl border border-brand-mint py-3 text-sm font-bold text-brand-dark transition hover:bg-brand-light"
            >
              Go to Cart
            </button>
          </div>
        </div>
      </div>

      <Toast message={`${product.name} added to cart`} show={added} />
    </div>
  );
}

function Feature({ icon: Icon, label }: { icon: typeof Truck; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1 rounded-xl bg-brand-light p-2.5 text-center">
      <Icon className="h-5 w-5 text-brand-dark" />
      <span className="text-[10px] font-bold text-brand-dark">{label}</span>
    </div>
  );
}
