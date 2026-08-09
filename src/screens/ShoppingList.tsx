import { ArrowLeft, Check, ListChecks, Plus, ScanLine, Trash2 } from 'lucide-react';
import { PRODUCTS } from '../data';
import type { Product } from '../types';

interface ShoppingListProps {
  productIds: string[];
  checkedIds: string[];
  onBack: () => void;
  onAddProduct: (productId: string) => void;
  onRemoveProduct: (productId: string) => void;
  onScan: () => void;
  onNewList: () => void;
}

export function ShoppingList({
  productIds,
  checkedIds,
  onBack,
  onAddProduct,
  onRemoveProduct,
  onScan,
  onNewList,
}: ShoppingListProps) {
  const listedProducts = productIds
    .map((id) => PRODUCTS.find((p) => p.id === id))
    .filter((p): p is Product => Boolean(p));

  const availableProducts = PRODUCTS.filter((p) => !productIds.includes(p.id));
  const checkedCount = listedProducts.filter((p) => checkedIds.includes(p.id)).length;

  return (
    <div className="min-h-screen bg-canvas pb-28">
      <div className="sticky top-0 z-30 bg-brand-dark px-4 py-4 text-white shadow-soft">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-1 text-sm font-bold text-white/90 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>
          <div className="flex items-center gap-2">
            <ListChecks className="h-5 w-5" />
            <span className="font-extrabold">My Shopping List</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onNewList}
              className="rounded-full bg-white/15 px-3 py-2 text-xs font-bold hover:bg-white/25"
            >
              New List
            </button>
            <button
              onClick={onScan}
              className="flex items-center gap-1 rounded-full bg-white/15 px-3 py-2 text-xs font-bold hover:bg-white/25"
            >
              <ScanLine className="h-4 w-4" /> Scan
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 pt-5 sm:px-6">
        <div className="rounded-card bg-white p-5 shadow-soft ring-1 ring-brand-mint/30">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-muted">Before you shop</p>
              <h1 className="mt-1 text-xl font-extrabold text-ink">
                {checkedCount} / {listedProducts.length} collected
              </h1>
            </div>
            <span className="text-2xl">🛒</span>
          </div>

          <div className="mt-4 h-2 overflow-hidden rounded-full bg-brand-light">
            <div
              className="h-full rounded-full bg-brand-dark transition-all duration-500"
              style={{
                width: `${listedProducts.length ? (checkedCount / listedProducts.length) * 100 : 0}%`,
              }}
            />
          </div>
          <p className="mt-2 text-xs text-muted">
            Scan items in any order. Qart will tick them automatically.
          </p>
        </div>

        {listedProducts.length === 0 ? (
          <div className="mt-5 rounded-card bg-white p-10 text-center shadow-soft">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand-light">
              <ListChecks className="h-8 w-8 text-brand-dark" />
            </div>
            <h2 className="mt-4 text-lg font-extrabold text-ink">Your list is empty</h2>
            <p className="mt-1 text-sm text-muted">
              Add the products you want to remember while shopping.
            </p>
          </div>
        ) : (
          <div className="mt-5 space-y-2.5">
            {listedProducts.map((product) => {
              const checked = checkedIds.includes(product.id);

              return (
                <div
                  key={product.id}
                  className={`flex items-center gap-3 rounded-2xl bg-white p-3 shadow-soft ring-1 transition ${
                    checked ? 'ring-brand-mint opacity-80' : 'ring-brand-mint/20'
                  }`}
                >
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                      checked ? 'bg-brand-dark text-white' : 'bg-brand-light text-brand-dark'
                    }`}
                  >
                    {checked ? <Check className="h-5 w-5" /> : <ListChecks className="h-5 w-5" />}
                  </div>

                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-12 w-12 rounded-xl bg-brand-light object-cover"
                  />

                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] font-bold uppercase text-muted">{product.brand}</p>
                    <p className={`text-sm font-bold ${checked ? 'text-muted line-through' : 'text-ink'}`}>
                      {product.name}
                    </p>
                    <p className="text-[11px] text-muted">{product.unit}</p>
                  </div>

                  <button
                    onClick={() => onRemoveProduct(product.id)}
                    className="rounded-lg p-2 text-error hover:bg-error/10"
                    aria-label={`Remove ${product.name}`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              );
            })}
          </div>
        )}

        <div className="mt-6 rounded-card bg-white p-4 shadow-soft ring-1 ring-brand-mint/20">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-extrabold text-ink">Add another item</h2>
            <span className="text-[11px] text-muted">{availableProducts.length} available</span>
          </div>

          <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
            {availableProducts.slice(0, 8).map((product) => (
              <button
                key={product.id}
                onClick={() => onAddProduct(product.id)}
                className="flex items-center gap-3 rounded-xl border border-brand-mint/40 p-2.5 text-left transition hover:bg-brand-light"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-11 w-11 rounded-lg bg-brand-light object-cover"
                />
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-xs font-bold text-ink">{product.name}</span>
                  <span className="block text-[11px] text-muted">{product.unit}</span>
                </span>
                <Plus className="h-4 w-4 shrink-0 text-brand-dark" />
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={onScan}
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-brand-dark py-3.5 text-sm font-bold text-white shadow-soft transition hover:bg-brand active:scale-[0.98]"
        >
          <ScanLine className="h-5 w-5" /> Start Shopping & Scan Items
        </button>
      </div>
    </div>
  );
}
