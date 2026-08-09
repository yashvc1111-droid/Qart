import { useEffect, useMemo, useState } from 'react';
import {
  Search,
  ScanLine,
  Star,
  MapPin,
  Bell,
  Zap,
  Flame,
  Sparkles,
  ListChecks,
  Clock3,
  ArrowRight,
  ShoppingBag,
  ChevronRight,
} from 'lucide-react';
import { CATEGORIES, OFFERS, PRODUCTS, HERO_IMAGE, formatINR } from '../data';
import type { Product } from '../types';
import { TopBar } from '../components/TopBar';

interface HomeProps {
  userName: string;
  onNavigate: (screen: any) => void;
  onSelectProduct: (p: Product) => void;
  shoppingListCount?: number;
  onOpenHistory?: () => void;
}

const TAG_STYLES: Record<string, { label: string; className: string }> = {
  bestseller: { label: 'BESTSELLER', className: 'bg-accent text-white' },
  new: { label: 'NEW', className: 'bg-brand-dark text-white' },
  deal: { label: 'HOT DEAL', className: 'bg-red-500 text-white' },
};

export function Home({
  userName,
  onNavigate,
  onSelectProduct,
  shoppingListCount = 0,
  onOpenHistory,
}: HomeProps) {
  const [query, setQuery] = useState('');
  const [activeCat, setActiveCat] = useState('all');
  const [heroSlide, setHeroSlide] = useState(0);

  const firstName = userName?.split(' ')[0] || 'there';

  useEffect(() => {
    const timer = window.setInterval(() => {
      setHeroSlide((s) => (s + 1) % 3);
    }, 4500);
    return () => window.clearInterval(timer);
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    return PRODUCTS.filter((p) => {
      const categoryMatch = activeCat === 'all' || p.category === activeCat;
      const queryMatch =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q);

      return categoryMatch && queryMatch;
    });
  }, [query, activeCat]);

  return (
    <div className="min-h-screen overflow-x-hidden bg-canvas pb-28">
      <TopBar title="Home" onCartClick={() => onNavigate('cart')} showCart />

      {/* Search */}
      <div className="sticky top-[60px] z-30 bg-canvas/85 px-4 pb-2 pt-3 backdrop-blur-xl sm:px-6">
        <div className="mx-auto flex max-w-5xl gap-2">
          <div className="group flex flex-1 items-center gap-2 rounded-2xl bg-white px-4 py-3 shadow-soft ring-1 ring-brand-mint/30 transition duration-300 focus-within:-translate-y-0.5 focus-within:ring-2 focus-within:ring-brand-dark">
            <Search className="h-5 w-5 text-muted transition group-focus-within:scale-110 group-focus-within:text-brand-dark" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search Amul, Maggi, Tata Salt..."
              className="w-full bg-transparent text-sm font-semibold text-ink outline-none placeholder:text-muted/70"
            />
          </div>

          <button
            onClick={() => onNavigate('scanner')}
            className="relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-brand-dark text-white shadow-soft transition duration-300 hover:scale-105 hover:bg-brand active:scale-95"
          >
            <span className="absolute inset-0 animate-ping rounded-2xl bg-white/10" />
            <ScanLine className="relative h-5 w-5" />
          </button>
        </div>
      </div>

      <main className="mx-auto max-w-5xl px-4 sm:px-6">
        {/* Greeting */}
        <div className="mt-4 flex items-center justify-between">
          <div>
            <p className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-muted">
              <MapPin className="h-3.5 w-3.5" /> Qart Store · Pune
            </p>
            <h1 className="mt-1 text-xl font-black tracking-tight text-ink sm:text-2xl">
              Namaste, {firstName} <span className="inline-block animate-bounce">👋</span>
            </h1>
          </div>

          <button className="relative flex h-10 w-10 items-center justify-center rounded-full bg-white text-brand-dark shadow-soft transition hover:-translate-y-1 hover:shadow-lift">
            <Bell className="h-5 w-5" />
            <span className="absolute right-1.5 top-1.5 h-2.5 w-2.5 rounded-full bg-accent ring-2 ring-white" />
          </button>
        </div>

        {/* Animated hero */}
        {!query && (
          <section className="relative mt-4 overflow-hidden rounded-[28px] bg-[#063b24] shadow-lift" style={{ minHeight: 250 }}>
            <img
              src={HERO_IMAGE}
              alt="Fresh groceries"
              className="absolute inset-0 h-full w-full object-cover opacity-45 transition duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-[#043820] via-[#075a35]/85 to-[#0b2c1e]/75" />

            {/* Decorative animated orbs */}
            <div className="absolute -right-10 -top-16 h-48 w-48 animate-pulse rounded-full bg-emerald-300/10 blur-2xl" />
            <div className="absolute -bottom-20 left-20 h-44 w-44 animate-pulse rounded-full bg-orange-400/10 blur-3xl" />

            <div className="absolute right-5 top-5 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[9px] font-black tracking-widest text-white backdrop-blur-md">
              Qart  •  {heroSlide + 1}/3
            </div>

            <div className="relative z-10 flex min-h-[250px] flex-col justify-center p-5 sm:p-8">
              <div className="flex items-center gap-2">
                <span className="animate-pulse rounded-full bg-accent px-3 py-1 text-[9px] font-black tracking-widest text-white">
                  SELF CHECKOUT
                </span>
                <span className="text-[9px] font-bold text-white/60">NO QUEUE</span>
              </div>

              <h2 className="mt-3 max-w-md text-2xl font-black leading-[1.05] text-white sm:text-4xl">
                {heroSlide === 0 && <>Scan. Shop. <span className="text-orange-300">Pay.</span> Walk out.</>}
                {heroSlide === 1 && <>Your shopping, <span className="text-orange-300">your way.</span></>}
                {heroSlide === 2 && <>Skip the queue. <span className="text-orange-300">Save time.</span></>}
              </h2>

              <p className="mt-2 max-w-sm text-xs leading-relaxed text-white/75 sm:text-sm">
                {heroSlide === 0 && 'Scan products yourself, build your cart and pay before heading to the exit.'}
                {heroSlide === 1 && 'Create your list first, then tick products off as you scan them around the store.'}
                {heroSlide === 2 && 'A faster Indian supermarket experience designed for quick everyday shopping.'}
              </p>

              <button
                onClick={() => onNavigate('scanner')}
                className="group mt-4 flex w-fit items-center gap-2 rounded-full bg-white px-4 py-3 text-xs font-black text-brand-dark shadow-lift transition duration-300 hover:gap-3 hover:bg-brand-light active:scale-95"
              >
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-dark text-white">
                  <ScanLine className="h-3.5 w-3.5" />
                </span>
                Start Scanning
                <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
              </button>
            </div>

            {/* Steps */}
            <div className="absolute bottom-4 right-5 hidden items-center gap-1.5 sm:flex">
              {['SCAN', 'CART', 'PAY', 'EXIT'].map((step, i) => (
                <div key={step} className="flex items-center gap-1.5">
                  <span className={`rounded-full px-2.5 py-1 text-[8px] font-black ${i === 0 ? 'bg-accent text-white' : 'bg-white/10 text-white/60'}`}>
                    {step}
                  </span>
                  {i < 3 && <ChevronRight className="h-3 w-3 text-white/30" />}
                </div>
              ))}
            </div>

            <div className="absolute bottom-4 left-5 flex gap-1.5">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className={`h-1.5 rounded-full transition-all duration-500 ${heroSlide === i ? 'w-7 bg-orange-300' : 'w-1.5 bg-white/30'}`}
                />
              ))}
            </div>
          </section>
        )}

        {/* Animated quick actions */}
        {!query && (
          <section className="mt-4 grid grid-cols-3 gap-2.5">
            <button
              onClick={() => onNavigate('shoppingList')}
              className="group relative overflow-hidden rounded-2xl bg-white p-3 text-left shadow-soft ring-1 ring-brand-mint/25 transition duration-300 hover:-translate-y-1 hover:shadow-lift"
            >
              <div className="absolute -right-5 -top-5 h-16 w-16 rounded-full bg-brand-light transition duration-500 group-hover:scale-[2]" />
              <div className="relative">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-light text-brand-dark transition duration-300 group-hover:rotate-6 group-hover:scale-110">
                  <ListChecks className="h-5 w-5" />
                </div>
                <p className="mt-2 text-xs font-black text-ink">My List</p>
                <p className="text-[10px] text-muted">{shoppingListCount ? `${shoppingListCount} items` : 'Plan shopping'}</p>
              </div>
            </button>

            <button
              onClick={() => onNavigate('scanner')}
              className="group relative overflow-hidden rounded-2xl bg-brand-dark p-3 text-left text-white shadow-soft transition duration-300 hover:-translate-y-1 hover:bg-brand hover:shadow-lift"
            >
              <span className="absolute -right-5 -top-5 h-20 w-20 rounded-full bg-white/10 transition duration-500 group-hover:scale-[1.8]" />
              <div className="relative">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/15 transition group-hover:rotate-12">
                  <ScanLine className="h-5 w-5" />
                </div>
                <p className="mt-2 text-xs font-black">Scan Item</p>
                <p className="text-[10px] text-white/60">Add instantly</p>
              </div>
            </button>

            <button
              onClick={onOpenHistory ?? (() => onNavigate('history'))}
              className="group relative overflow-hidden rounded-2xl bg-white p-3 text-left shadow-soft ring-1 ring-brand-mint/25 transition duration-300 hover:-translate-y-1 hover:shadow-lift"
            >
              <div className="absolute -bottom-6 -right-4 h-16 w-16 rounded-full bg-orange-50 transition duration-500 group-hover:scale-[2]" />
              <div className="relative">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-50 text-accent transition group-hover:-rotate-6 group-hover:scale-110">
                  <Clock3 className="h-5 w-5" />
                </div>
                <p className="mt-2 text-xs font-black text-ink">History</p>
                <p className="text-[10px] text-muted">Recent scans</p>
              </div>
            </button>
          </section>
        )}

        {/* Offers */}
        {!query && (
          <section className="mt-7">
            <div className="mb-3 flex items-end justify-between">
              <div>
                <div className="flex items-center gap-1.5">
                  <Sparkles className="h-4 w-4 animate-pulse text-accent" />
                  <p className="text-[10px] font-black uppercase tracking-widest text-accent">Deals for you</p>
                </div>
                <h2 className="mt-0.5 text-lg font-black text-ink">Today's Offers</h2>
              </div>
              <span className="rounded-full bg-orange-50 px-2.5 py-1 text-[9px] font-black text-accent">
                LIMITED TIME
              </span>
            </div>

            <div className="no-scrollbar -mx-4 flex gap-3 overflow-x-auto px-4 pb-2">
              {OFFERS.map((offer, index) => (
                <div
                  key={offer.id}
                  className="group relative min-w-[250px] overflow-hidden rounded-[22px] shadow-soft ring-1 ring-brand-mint/20 transition duration-500 hover:-translate-y-1 hover:shadow-lift"
                >
                  <img
                    src={offer.image}
                    alt={offer.title}
                    className="h-32 w-full object-cover transition duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-white/90 px-2 py-1 text-[8px] font-black text-brand-dark">
                    <Flame className="h-3 w-3 text-accent" /> DEAL #{index + 1}
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                    <span className="rounded-full bg-accent px-2 py-0.5 text-[8px] font-black">{offer.code}</span>
                    <h3 className="mt-1 text-sm font-black">{offer.title}</h3>
                    <p className="text-[10px] text-white/75">{offer.subtitle}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Categories */}
        <section className="mt-6">
          <div className="mb-2 flex items-center justify-between">
            <h2 className="text-sm font-black text-ink">Shop by Category</h2>
            <span className="text-[9px] font-bold text-muted">Swipe →</span>
          </div>

          <div className="no-scrollbar -mx-4 flex gap-2.5 overflow-x-auto px-4 pb-1">
            {CATEGORIES.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCat(category.id)}
                className={`group flex min-w-[78px] shrink-0 flex-col items-center gap-1.5 rounded-2xl px-2.5 py-2.5 transition duration-300 ${
                  activeCat === category.id
                    ? 'scale-105 bg-brand-dark text-white shadow-lift'
                    : 'bg-white text-muted shadow-soft ring-1 ring-brand-mint/20 hover:-translate-y-1 hover:bg-brand-light'
                }`}
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-xl transition duration-300 group-hover:scale-110 group-hover:rotate-3">
                  {category.emoji}
                </span>
                <span className="text-[10px] font-black">{category.name}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Products */}
        <section className="mt-7">
          <div className="mb-3 flex items-end justify-between">
            <div>
              <p className="text-[9px] font-black uppercase tracking-widest text-muted">
                {query ? 'Search results' : 'Fresh picks'}
              </p>
              <h2 className="text-lg font-black text-ink">
                {query ? `${filtered.length} Products` : 'Popular Products'}
              </h2>
            </div>

            {!query && (
              <span className="flex items-center gap-1 rounded-full bg-orange-50 px-2.5 py-1 text-[9px] font-black text-accent">
                <Flame className="h-3.5 w-3.5 animate-pulse" /> TRENDING
              </span>
            )}
          </div>

          {filtered.length === 0 ? (
            <div className="rounded-3xl bg-white p-10 text-center shadow-soft">
              <p className="text-3xl">🔍</p>
              <p className="mt-2 text-sm font-bold text-muted">No products found. Try another search.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-3 lg:grid-cols-4">
              {filtered.map((product) => {
                const tag = product.tag ? TAG_STYLES[product.tag] : null;

                return (
                  <button
                    key={product.id}
                    onClick={() => onSelectProduct(product)}
                    className="group relative flex min-h-[300px] flex-col overflow-hidden rounded-[24px] bg-white text-left shadow-soft ring-1 ring-brand-mint/20 transition duration-300 hover:-translate-y-2 hover:shadow-lift active:scale-[0.985]"
                  >
                    <div className="relative aspect-square overflow-hidden bg-brand-light">
                      <img
                        src={product.image}
                        alt={product.name}
                        loading="lazy"
                        className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 transition group-hover:opacity-100" />

                      {product.offer && (
                        <span className="absolute left-2.5 top-2.5 rounded-full bg-accent px-2 py-1 text-[9px] font-black text-white shadow-soft">
                          {product.offer}
                        </span>
                      )}

                      {tag && (
                        <span className={`absolute right-2.5 top-2.5 rounded-full px-2 py-1 text-[8px] font-black shadow-soft ${tag.className}`}>
                          {tag.label}
                        </span>
                      )}

                      <span className="absolute bottom-2.5 right-2.5 flex h-9 w-9 translate-y-2 items-center justify-center rounded-full bg-white text-brand-dark opacity-0 shadow-lift transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                        <ArrowRight className="h-4 w-4" />
                      </span>
                    </div>

                    <div className="flex flex-1 flex-col p-3">
                      <p className="text-[9px] font-black uppercase tracking-wider text-muted">{product.brand}</p>
                      <p className="mt-1 line-clamp-2 text-sm font-black leading-tight text-ink">{product.name}</p>
                      <p className="mt-1 text-[10px] text-muted">{product.unit}</p>

                      <div className="mt-2 flex items-center gap-1">
                        <span className="flex items-center gap-0.5 rounded-md bg-brand-light px-1.5 py-1 text-[9px] font-black text-brand-dark">
                          <Star className="h-2.5 w-2.5 fill-accent text-accent" /> {product.rating}
                        </span>
                        <span className="text-[9px] text-muted">({product.reviews})</span>
                      </div>

                      <div className="mt-auto flex items-end justify-between pt-3">
                        <div>
                          <p className="text-base font-black text-brand-dark">{formatINR(product.price)}</p>
                          {product.mrp > product.price && (
                            <p className="text-[10px] text-muted line-through">{formatINR(product.mrp)}</p>
                          )}
                        </div>

                        <span className="flex items-center gap-1 rounded-xl bg-brand-dark px-2.5 py-2 text-[9px] font-black text-white transition duration-300 group-hover:bg-accent">
                          <ShoppingBag className="h-3 w-3" /> View
                        </span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </section>
      </main>

      {/* Floating scanner */}
      <button
        onClick={() => onNavigate('scanner')}
        className="fixed bottom-5 right-5 z-40 flex items-center gap-2 overflow-hidden rounded-full bg-accent px-5 py-3.5 text-sm font-black text-white shadow-lift transition duration-300 hover:scale-105 hover:brightness-110 active:scale-95"
      >
        <span className="absolute inset-0 animate-pulse bg-white/10" />
        <ScanLine className="relative h-5 w-5" />
        <span className="relative">Scan Item</span>
      </button>
    </div>
  );
}
