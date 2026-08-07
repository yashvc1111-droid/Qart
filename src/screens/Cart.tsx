import { ArrowLeft, Plus, Minus, Trash2, ScanLine, ShoppingBag, Tag, ShieldCheck } from 'lucide-react';
import { useCart } from '../cart';
import { formatINR } from '../data';
import { TopBar } from '../components/TopBar';

interface CartProps {
  onBack: () => void;
  onCheckout: () => void;
  onScan: () => void;
}

export function Cart({ onBack, onCheckout, onScan }: CartProps) {
  const { items, updateQuantity, removeItem, subtotal, totalSavings, count } = useCart();

  const tax = Math.round(subtotal * 0.05);
  const total = subtotal + tax;

  return (
    <div className="min-h-screen bg-canvas pb-32">
      <TopBar title="Shopping Cart" onCartClick={onCheckout} showCart />

      <div className="mx-auto max-w-5xl px-4 pt-5 sm:px-6">
        <button
          onClick={onBack}
          className="flex items-center gap-1 text-sm font-bold text-muted transition hover:text-brand-dark"
        >
          <ArrowLeft className="h-4 w-4" /> Continue shopping
        </button>

        {items.length === 0 ? (
          <div className="mt-10 flex flex-col items-center justify-center rounded-card bg-white p-12 text-center shadow-soft">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-brand-light">
              <ShoppingBag className="h-10 w-10 text-brand-dark" />
            </div>
            <h2 className="mt-4 text-lg font-extrabold text-ink">Your cart is empty</h2>
            <p className="mt-1 text-sm text-muted">Scan products to start adding items to your cart.</p>
            <button
              onClick={onScan}
              className="mt-5 flex items-center gap-2 rounded-full bg-brand-dark px-5 py-3 text-sm font-bold text-white shadow-soft transition hover:bg-brand active:scale-95"
            >
              <ScanLine className="h-5 w-5" /> Scan a Product
            </button>
          </div>
        ) : (
          <div className="mt-4 grid gap-5 lg:grid-cols-3">
            <div className="space-y-3 lg:col-span-2">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-extrabold text-ink">{count} item{count !== 1 && 's'} in cart</h2>
                <button onClick={onScan} className="flex items-center gap-1 text-xs font-bold text-brand-dark hover:underline">
                  <ScanLine className="h-3.5 w-3.5" /> Add more
                </button>
              </div>

              {items.map(({ product, quantity }) => (
                <div
                  key={product.id}
                  className="flex gap-3 rounded-card bg-white p-3 shadow-soft ring-1 ring-brand-mint/20 animate-slide-in"
                >
                  <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-brand-light">
                    <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col">
                    <p className="text-[11px] font-bold uppercase text-muted">{product.brand}</p>
                    <p className="truncate text-sm font-bold text-ink">{product.name}</p>
                    <p className="text-xs text-muted">{product.unit}</p>
                    <div className="mt-1 flex items-center gap-2">
                      <span className="text-sm font-extrabold text-brand-dark">{formatINR(product.price)}</span>
                      <span className="text-[11px] text-muted line-through">{formatINR(product.mrp)}</span>
                    </div>
                    <div className="mt-auto flex items-center justify-between pt-2">
                      <div className="flex items-center gap-1 rounded-lg border border-brand-mint bg-canvas p-0.5">
                        <button
                          onClick={() => updateQuantity(product.id, quantity - 1)}
                          className="flex h-7 w-7 items-center justify-center rounded-md text-brand-dark transition hover:bg-white"
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="w-6 text-center text-xs font-extrabold text-ink">{quantity}</span>
                        <button
                          onClick={() => updateQuantity(product.id, quantity + 1)}
                          className="flex h-7 w-7 items-center justify-center rounded-md text-brand-dark transition hover:bg-white"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(product.id)}
                        className="flex items-center gap-1 text-xs font-bold text-error transition hover:bg-error/10 rounded-lg px-2 py-1"
                      >
                        <Trash2 className="h-3.5 w-3.5" /> Remove
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col items-end justify-between">
                    <span className="text-sm font-extrabold text-ink">{formatINR(product.price * quantity)}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="lg:sticky lg:top-20 lg:self-start">
              <div className="rounded-card bg-white p-5 shadow-soft ring-1 ring-brand-mint/20">
                <h3 className="text-sm font-extrabold text-ink">Bill Summary</h3>
                <div className="mt-4 space-y-2.5 text-sm">
                  <Row label={`Item total (${count})`} value={formatINR(subtotal + totalSavings)} />
                  <Row label="Product savings" value={`- ${formatINR(totalSavings)}`} accent />
                  <Row label="Taxes & fees (5%)" value={formatINR(tax)} />
                  <div className="my-2 border-t border-dashed border-brand-mint" />
                  <div className="flex items-center justify-between">
                    <span className="text-base font-extrabold text-ink">To Pay</span>
                    <span className="text-base font-extrabold text-brand-dark">{formatINR(total)}</span>
                  </div>
                </div>

                {totalSavings > 0 && (
                  <div className="mt-3 flex items-center gap-1.5 rounded-lg bg-accent-light px-3 py-2 text-xs font-bold text-accent">
                    <Tag className="h-3.5 w-3.5" /> You saved {formatINR(totalSavings)} on this order!
                  </div>
                )}

                <button
                  onClick={onCheckout}
                  className="mt-4 w-full rounded-xl bg-brand-dark py-3.5 text-sm font-bold text-white shadow-soft transition hover:bg-brand active:scale-[0.98]"
                >
                  Proceed to Checkout
                </button>
                <p className="mt-3 flex items-center justify-center gap-1.5 text-[11px] text-muted">
                  <ShieldCheck className="h-3.5 w-3.5 text-brand-dark" /> Secure self-checkout
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
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
