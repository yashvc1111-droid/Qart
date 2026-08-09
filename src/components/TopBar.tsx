import { ShoppingCart } from 'lucide-react';
import { useCart } from '../cart';
import { formatINR } from '../data';

interface TopBarProps {
  title: string;
  onCartClick: () => void;
  onBack?: () => void;
  showCart: boolean;
}

export function TopBar({ title, onCartClick, showCart }: TopBarProps) {
  const { count, subtotal } = useCart();
  return (
    <header className="sticky top-0 z-30 bg-brand-dark text-white shadow-soft">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3.5 sm:px-6">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/15 text-lg font-extrabold">
            S
          </div>
          <div className="leading-tight">
            <p className="text-sm font-extrabold tracking-tight">Qart</p>
            <p className="text-[11px] text-white/70">{title}</p>
          </div>
        </div>
        {showCart && (
          <button
            onClick={onCartClick}
            className="relative flex items-center gap-2 rounded-full bg-white/15 px-3.5 py-2 text-sm font-semibold transition hover:bg-white/25 active:scale-95"
          >
            <ShoppingCart className="h-4.5 w-4.5" />
            <span className="hidden sm:inline">{formatINR(subtotal)}</span>
            {count > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1 text-[11px] font-bold text-white animate-pop">
                {count}
              </span>
            )}
          </button>
        )}
      </div>
    </header>
  );
}
