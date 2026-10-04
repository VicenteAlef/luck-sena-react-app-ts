import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/useTheme';

export const ThemeToggle: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggleTheme}
      type="button"
      className={`relative inline-flex items-center justify-center p-2 rounded-md transition-all duration-200 border cursor-pointer ${
        isDark
          ? 'bg-slate-800/80 hover:bg-slate-700 text-amber-400 border-slate-700 shadow-sm'
          : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200 shadow-sm'
      } ${className}`}
      aria-label={`Mudar para tema ${isDark ? 'claro' : 'escuro'}`}
      title={`Alternar para tema ${isDark ? 'claro' : 'escuro'}`}
    >
      <div className="relative w-5 h-5 flex items-center justify-center">
        {isDark ? (
          <Sun className="w-5 h-5 transition-transform duration-300 rotate-0 hover:rotate-45" />
        ) : (
          <Moon className="w-5 h-5 transition-transform duration-300 -rotate-12 hover:rotate-0" />
        )}
      </div>
      <span className="sr-only">Tema {isDark ? 'Escuro' : 'Claro'}</span>
    </button>
  );
};
