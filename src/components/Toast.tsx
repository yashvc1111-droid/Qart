import { CheckCircle, XCircle } from 'lucide-react';

interface ToastProps {
  message: string;
  type?: 'success' | 'error';
  show: boolean;
}

export function Toast({ message, type = 'success', show }: ToastProps) {
  if (!show) return null;
  const Icon = type === 'success' ? CheckCircle : XCircle;
  return (
    <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 animate-fade-up">
      <div
        className={`flex items-center gap-2.5 rounded-2xl px-5 py-3 text-sm font-semibold text-white shadow-lift ${
          type === 'success' ? 'bg-brand-dark' : 'bg-error'
        }`}
      >
        <Icon className="h-5 w-5" />
        {message}
      </div>
    </div>
  );
}
