import React from 'react';
import { Clover } from 'lucide-react';

export const Title = ({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <h1
      className={`text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white ${className}`}
    >
      {children}
    </h1>
  );
};

export const Title2 = ({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <h2
      className={`text-xl sm:text-2xl font-bold tracking-tight text-slate-800 dark:text-slate-100 ${className}`}
    >
      {children}
    </h2>
  );
};

export interface BallProps {
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  variant?:
    | 'default'
    | 'emerald'
    | 'fuchsia'
    | 'indigo'
    | 'amber'
    | 'teal'
    | 'rose'
    | 'lime'
    | 'sky'
    | 'matched'
    | 'trevo';
  isMatched?: boolean;
  className?: string;
}

const variantStyles: Record<string, string> = {
  default:
    'bg-gradient-to-br from-cyan-600 to-cyan-800 text-white shadow-cyan-600/30',
  emerald:
    'bg-gradient-to-br from-emerald-500 to-emerald-700 text-white shadow-emerald-500/30',
  fuchsia:
    'bg-gradient-to-br from-fuchsia-600 to-purple-800 text-white shadow-fuchsia-500/30',
  indigo:
    'bg-gradient-to-br from-indigo-500 to-indigo-800 text-white shadow-indigo-500/30',
  amber:
    'bg-gradient-to-br from-amber-500 to-orange-700 text-white shadow-amber-500/30',
  teal:
    'bg-gradient-to-br from-teal-500 to-emerald-800 text-white shadow-teal-500/30',
  rose:
    'bg-gradient-to-br from-rose-500 to-red-800 text-white shadow-rose-500/30',
  lime:
    'bg-gradient-to-br from-yellow-400 to-lime-500 text-slate-900 font-extrabold shadow-lime-500/30',
  sky:
    'bg-gradient-to-br from-sky-500 to-blue-700 text-white shadow-sky-500/30',
  trevo:
    'bg-gradient-to-br from-amber-400 to-yellow-600 text-slate-950 font-black shadow-amber-400/40 border-2 border-amber-300',
  matched:
    'bg-gradient-to-br from-green-500 to-emerald-600 text-white ring-4 ring-green-400/50 shadow-lg shadow-emerald-500/40 scale-105',
};

const sizeStyles: Record<string, string> = {
  sm: 'w-8 h-8 text-sm',
  md: 'w-10 h-10 sm:w-11 sm:h-11 text-base sm:text-lg font-bold',
  lg: 'w-12 h-12 sm:w-14 sm:h-14 text-lg sm:text-xl font-extrabold',
};

export const Ball: React.FC<BallProps> = ({
  children,
  size = 'md',
  variant = 'default',
  isMatched = false,
  className = '',
}) => {
  const chosenVariant = isMatched ? 'matched' : variant;

  return (
    <div
      className={`
        inline-flex items-center justify-center shrink-0 rounded-full select-none
        shadow-md transition-transform duration-200 hover:scale-110
        ${sizeStyles[size] || sizeStyles.md}
        ${variantStyles[chosenVariant] || variantStyles.default}
        ${className}
      `}
    >
      <span>{children}</span>
    </div>
  );
};

export const TrevoBall: React.FC<{
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  isMatched?: boolean;
}> = ({ children, size = 'md', isMatched = false }) => {
  return (
    <div className="relative inline-flex items-center justify-center">
      <Ball size={size} variant={isMatched ? 'matched' : 'trevo'}>
        <div className="flex items-center justify-center gap-0.5">
          <Clover className="w-3.5 h-3.5 fill-current opacity-80" />
          <span>{children}</span>
        </div>
      </Ball>
    </div>
  );
};

export const SkeletonBall: React.FC<{ size?: 'sm' | 'md' | 'lg' }> = ({
  size = 'md',
}) => {
  return (
    <div
      className={`
        animate-pulse rounded-full shrink-0 bg-slate-300 dark:bg-slate-700
        ${sizeStyles[size] || sizeStyles.md}
      `}
    />
  );
};

export const Badge: React.FC<{
  children: React.ReactNode;
  variant?: 'emerald' | 'amber' | 'blue' | 'purple' | 'slate' | 'rose';
  className?: string;
}> = ({ children, variant = 'slate', className = '' }) => {
  const styles: Record<string, string> = {
    slate:
      'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700',
    emerald:
      'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800',
    amber:
      'bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800',
    rose:
      'bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-800',
    blue:
      'bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800',
    purple:
      'bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800',
  };

  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-xs font-semibold border ${styles[variant]} ${className}`}
    >
      {children}
    </span>
  );
};
