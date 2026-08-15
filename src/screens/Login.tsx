import { useState } from 'react';
import { ScanLine, ShieldCheck, Zap, Smartphone, ArrowRight } from 'lucide-react';
import { HERO_IMAGE } from '../data';

interface LoginProps {
  onLogin: (name: string) => void;
}

export function Login({ onLogin }: LoginProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || phone.trim().length < 10) return;
    onLogin(name.trim());
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-white">
  <img
    src={HERO_IMAGE}
    alt=""
    className="absolute inset-0 h-full w-full object-cover"
  />
      <div className="relative mx-auto flex min-h-screen max-w-md flex-col justify-center px-5 py-10">
        <div className="mb-8 flex items-center gap-3 text-white animate-fade-up">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 text-2xl font-extrabold backdrop-blur">
            S
          </div>
          <div>
            <h1 className="text-xl font-extrabold tracking-tight">Qart</h1>
            <p className="text-xs text-white/70">Self-Checkout · Smart Supermarket</p>
          </div>
        </div>

        <div className="rounded-card bg-white p-6 shadow-lift animate-fade-up sm:p-8" style={{ animationDelay: '80ms' }}>
          <h2 className="text-2xl font-extrabold text-ink">Welcome back</h2>
          <p className="mt-1 text-sm text-muted">Sign in to start your smart shopping journey.</p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-muted">Full Name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Rahul Sharma"
                className="w-full rounded-xl border border-brand-mint bg-canvas px-4 py-3 text-sm font-medium text-ink outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-muted">Mobile Number</label>
              <div className="flex items-center rounded-xl border border-brand-mint bg-canvas px-4 transition focus-within:border-brand focus-within:ring-2 focus-within:ring-brand/20">
                <span className="text-sm font-bold text-muted">+91</span>
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                  inputMode="numeric"
                  placeholder="98765 43210"
                  className="w-full bg-transparent px-3 py-3 text-sm font-medium text-ink outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={!name.trim() || phone.length < 10}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-dark py-3.5 text-sm font-bold text-white shadow-soft transition hover:bg-brand active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
            >
              Start Shopping <ArrowRight className="h-4 w-4" />
            </button>
          </form>

          <div className="mt-6 grid grid-cols-3 gap-2 text-center">
            {[
              { icon: ScanLine, label: 'Scan & Go' },
              { icon: Zap, label: 'Fast Checkout' },
              { icon: ShieldCheck, label: 'Secure Exit' },
            ].map((f) => (
              <div key={f.label} className="rounded-xl bg-brand-light p-3">
                <f.icon className="mx-auto h-5 w-5 text-brand-dark" />
                <p className="mt-1.5 text-[11px] font-bold text-brand-dark">{f.label}</p>
              </div>
            ))}
          </div>
        </div>

        <p className="mt-6 flex items-center justify-center gap-1.5 text-center text-xs text-white/60">
          <Smartphone className="h-3.5 w-3.5" /> Demo build · Frontend only · Ready for Spring Boot + MySQL
        </p>
      </div>
    </div>
  );
}