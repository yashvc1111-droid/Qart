import { useMemo, useState } from 'react';
import { Search, ScanLine, Star, TrendingDown, MapPin, Bell, Zap, Flame, Sparkles, ListChecks } from 'lucide-react';
import { CATEGORIES, OFFERS, PRODUCTS, HERO_IMAGE, formatINR } from '../data';
import type { Product } from '../types';
import { TopBar } from '../components/TopBar';

interface HomeProps {
  userName: string;
  onNavigate: (screen: 'cart' | 'scanner' | 'product' | 'shoppingList') => void;
  onSelectProduct: (p: Product) => void;
  shoppingListCount: number;
  onOpenHistory: () => void;
}

const TAG_STYLES: Record<string, { label: string; class: string }> = {
  bestseller: { label: 'Bestseller', class: 'bg-accent text-white' },
  new: { label: 'New', class: 'bg-brand-dark text-white' },
  deal: { label: 'Hot Deal', class: 'bg-error text-white' },
};

export function Home({ userName, onNavigate, onSelectProduct, shoppingListCount, onOpenHistory }: HomeProps) {
  const [query, setQuery] = useState('');
  const [activeCat, setActiveCat] = useState('all');

  const filtered = useMemo(() => {
    return PRODUCTS.filter((p) => {
      const matchesCat = activeCat === 'all' || p.category === activeCat;
      const q = query.trim().toLowerCase();
      const matchesQuery =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q);
      return matchesCat && matchesQuery;
    });
  }, [query, activeCat]);

  return (
    <div className="min-h-screen bg-canvas pb-28">
      <TopBar title="Home" onCartClick={() => onNavigate('cart')} showCart />

      <div className="sticky top-[60px] z-20 bg-canvas/90 px-4 pt-3 backdrop-blur-md sm:px-6">
        <div className="mx-auto flex max-w-5xl items-center gap-2">
          <div className="flex flex-1 items-center gap-2 rounded-2xl bg-white px-4 py-3 shadow-soft ring-1 ring-brand-mint/40">
            <Search className="h-5 w-5 text-muted" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search Amul, Maggi, Tata Salt..."
              className="w-full bg-transparent text-sm font-medium text-ink outline-none placeholder:text-muted/70"
            />
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <button
              onClick={() => onNavigate('shoppingList')}
              className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-brand-dark shadow-soft ring-1 ring-brand-mint/40 transition hover:bg-brand-light active:scale-95"
              aria-label="Shopping list"
            >
              <ListChecks className="h-5 w-5" />
              {shoppingListCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1 text-[10px] font-extrabold text-white">
                  {shoppingListCount}
                </span>
              )}
            </button>

            <button
              onClick={() => onNavigate('scanner')}
              className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-dark text-white shadow-soft transition hover:bg-brand active:scale-95"
              aria-label="Scan barcode"
            >
              <ScanLine className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="mt-3 flex items-center justify-between">
          <div>
            <p className="text-sm text-muted flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5" /> Delivering to · Home
            </p>
            <h1 className="text-lg font-extrabold text-ink">Namaste, {userName.split(' ')[0]} 👋</h1>
          </div>
          <button className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-soft text-brand-dark">
            <Bell className="h-5 w-5" />
          </button>
        </div>

        <button
          onClick={() => onNavigate('shoppingList')}
          className="mt-3 flex w-full items-center justify-between rounded-2xl bg-white px-4 py-3 text-left shadow-soft ring-1 ring-brand-mint/30 transition hover:bg-brand-light"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-light text-brand-dark">
              <ListChecks className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-extrabold text-ink">My Shopping List</p>
              <p className="text-[11px] text-muted">
                {shoppingListCount === 0
                  ? 'Add items before you shop'
                  : `${shoppingListCount} item${shoppingListCount !== 1 ? 's' : ''} saved`}
              </p>
            </div>
          </div>
          <span className="text-xs font-bold text-brand-dark">Open →</span>
        </button>

        {!query && (
          <div
            className="relative mt-4 overflow-hidden rounded-card shadow-soft"
            style={{ aspectRatio: '16 / 7' }}
          >
            <img src={HERO_IMAGE} alt="Fresh groceries" className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/85 via-brand-dark/50 to-transparent" />
            <div className="relative flex h-full flex-col justify-center p-5 sm:p-8">
              <span className="w-fit rounded-full bg-accent px-3 py-1 text-[11px] font-bold text-white">FRESH ARRIVALS</span>
              <h2 className="mt-2 max-w-xs text-xl font-extrabold leading-tight text-white sm:text-2xl">
                Fresh groceries, smarter checkout
              </h2>
              <p className="mt-1 max-w-xs text-xs text-white/80 sm:text-sm">
                Scan, pay and walk out in minutes with SmartCart self-checkout.
              </p>
              <button
                onClick={() => onNavigate('scanner')}
                className="mt-3 flex w-fit items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-bold text-brand-dark shadow-soft transition hover:bg-brand-light"
              >
                <ScanLine className="h-4 w-4" /> Start Scanning
              </button>
            </div>
          </div>
        )}

        {!query && (
          <div className="mt-5">
            <div className="mb-2.5 flex items-center gap-1.5">
              <Sparkles className="h-4 w-4 text-accent" />
              <h2 className="text-sm font-extrabold text-ink">Today's Offers</h2>
            </div>
            <div className="no-scrollbar -mx-4 flex gap-3 overflow-x-auto px-4 pb-1">
              {OFFERS.map((o) => (
                <div
                  key={o.id}
                  className="relative min-w-[230px] shrink-0 overflow-hidden rounded-card shadow-soft ring-1 ring-brand-mint/30"
                >
                  <img src={o.image} alt={o.title} className="h-24 w-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                    <span className="rounded-full bg-accent px-2 py-0.5 text-[10px] font-bold">{o.code}</span>
                    <h3 className="mt-1 text-sm font-extrabold leading-tight">{o.title}</h3>
                    <p className="text-[11px] text-white/85">{o.subtitle}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="no-scrollbar -mx-4 mt-5 flex gap-2.5 overflow-x-auto px-4">
          {CATEGORIES.map((c) => (
            <button
              key={c.id}
              onClick={() => setActiveCat(c.id)}
              className={`flex shrink-0 flex-col items-center gap-1.5 rounded-2xl px-3 py-2.5 transition ${
                activeCat === c.id
                  ? 'bg-brand-dark text-white shadow-soft'
                  : 'bg-white text-muted hover:bg-brand-light'
              }`}
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 text-xl">
                {c.emoji}
              </span>
              <span className="text-[11px] font-bold">{c.name}</span>
            </button>
          ))}
        </div>

        <div className="mt-6">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-extrabold text-ink">
              {query ? `Results (${filtered.length})` : 'Popular Products'}
            </h2>
            {!query && (
              <span className="flex items-center gap-1 text-xs font-bold text-accent">
                <Flame className="h-3.5 w-3.5" /> Trending now
              </span>
            )}
          </div>

          {filtered.length === 0 ? (
            <div className="rounded-card bg-white p-10 text-center shadow-soft">
              <p className="text-3xl">🔍</p>
              <p className="mt-2 text-sm font-semibold text-muted">No products found. Try a different search.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-3 lg:grid-cols-4">
              {filtered.map((p) => {
                const tag = p.tag ? TAG_STYLES[p.tag] : null;
                return (
                  <button
                    key={p.id}
                    onClick={() => onSelectProduct(p)}
                    className="group flex flex-col overflow-hidden rounded-card bg-white text-left shadow-soft ring-1 ring-brand-mint/20 transition hover:-translate-y-1.5 hover:shadow-lift"
                  >
                    <div className="relative aspect-square overflow-hidden bg-brand-light">
                      <img
                        src={p.image}
                        alt={p.name}
                        loading="lazy"
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                      />
                      {p.offer && (
                        <span className="absolute left-2 top-2 rounded-full bg-accent px-2 py-0.5 text-[10px] font-bold text-white shadow-soft">
                          {p.offer}
                        </span>
                      )}
                      {tag && (
                        <span className={`absolute right-2 top-2 rounded-full px-2 py-0.5 text-[10px] font-bold shadow-soft ${tag.class}`}>
                          {tag.label}
                        </span>
                      )}
                    </div>
                    <div className="flex flex-1 flex-col p-3">
                      <p className="text-[10px] font-bold uppercase tracking-wide text-muted">{p.brand}</p>
                      <p className="mt-0.5 line-clamp-2 text-sm font-bold leading-tight text-ink">{p.name}</p>
                      <p className="mt-0.5 text-[11px] text-muted">{p.unit}</p>
                      <div className="mt-1.5 flex items-center gap-1">
                        <span className="flex items-center gap-0.5 rounded-md bg-brand-light px-1.5 py-0.5 text-[10px] font-bold text-brand-dark">
                          <Star className="h-2.5 w-2.5 fill-accent text-accent" /> {p.rating}
                        </span>
                        <span className="text-[10px] text-muted">({p.reviews})</span>
                      </div>
                      <div className="mt-auto pt-2 flex items-end justify-between">
                        <div>
                          <p className="text-base font-extrabold text-brand-dark">{formatINR(p.price)}</p>
                          <p className="text-[11px] text-muted line-through">{formatINR(p.mrp)}</p>
                        </div>
                        <span className="flex items-center gap-0.5 rounded-lg bg-brand-dark px-2 py-1 text-[10px] font-bold text-white opacity-0 transition group-hover:opacity-100">
                          <Zap className="h-3 w-3" /> Add
                        </span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <button
        onClick={() => onNavigate('scanner')}
        className="fixed bottom-5 right-5 z-20 flex items-center gap-2 rounded-full bg-accent px-5 py-3.5 text-sm font-bold text-white shadow-lift transition hover:brightness-110 active:scale-95"
      >
        <ScanLine className="h-5 w-5" /> Scan Item
      </button>
    </div>
  );
}
