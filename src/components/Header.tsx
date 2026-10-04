import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

const mainNavItems = [
  { to: '/', label: 'Início' },
  { to: '/mega-sena', label: 'Mega-Sena' },
  { to: '/lotofacil', label: 'Lotofácil' },
  { to: '/quina', label: 'Quina' },
  { to: '/lotomania', label: 'Lotomania' },
  { to: '/mais-milionaria', label: '+Milionária' },
];

const moreNavItems = [
  { to: '/dupla-sena', label: 'Dupla Sena', color: 'text-rose-500' },
  { to: '/dia-de-sorte', label: 'Dia de Sorte', color: 'text-amber-500' },
  { to: '/timemania', label: 'Timemania', color: 'text-yellow-500' },
  { to: '/super-sete', label: 'Super Sete', color: 'text-teal-500' },
  { to: '/federal', label: 'Federal', color: 'text-sky-500' },
];

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const getNavLinkClass = ({ isActive }: { isActive: boolean }) =>
    `px-3 py-2 rounded-md text-sm font-medium transition-all duration-150 ${
      isActive
        ? 'bg-emerald-600 text-white shadow-sm'
        : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
    }`;

  const closeMenus = () => {
    setMobileMenuOpen(false);
    setDropdownOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/85 dark:bg-slate-900/85 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo & Brand */}
          <Link
            to="/"
            onClick={closeMenus}
            className="flex items-center gap-3 group"
          >
            <div className="relative flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-md bg-gradient-to-tr from-emerald-600 to-teal-500 text-white shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform">
              <img
                src="/icons8-clover-100.png"
                alt="Trevo da Sorte"
                className="w-7 h-7 sm:w-8 sm:h-8 drop-shadow"
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl sm:text-2xl carter-one-regular tracking-normal text-slate-900 dark:text-white">
                  Luck<span className="text-emerald-500">Sena</span>
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 hidden sm:block">
                Resultados em tempo real & palpites inteligentes
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {mainNavItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={getNavLinkClass}
              >
                {item.label}
              </NavLink>
            ))}

            {/* Dropdown "Mais Loterias" */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setDropdownOpen((prev) => !prev)}
                onBlur={() => setTimeout(() => setDropdownOpen(false), 200)}
                className="flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <span>Outras Loterias</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    dropdownOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-52 rounded-md bg-white dark:bg-slate-800 shadow-xl border border-slate-200 dark:border-slate-700 py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                    Mais Jogos Oficiais
                  </div>
                  {moreNavItems.map((sub) => (
                    <Link
                      key={sub.to}
                      to={sub.to}
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center justify-between px-3 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700/60 transition-colors"
                    >
                      <span className="font-medium">{sub.label}</span>
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </nav>

          {/* Right Side Actions: Theme Switcher & Mobile Menu Button */}
          <div className="flex items-center gap-2">
            <ThemeToggle />

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="lg:hidden p-2 rounded-md text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 cursor-pointer"
              aria-label="Abrir menu principal"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 pt-3 pb-6 space-y-1 shadow-lg max-h-[80vh] overflow-y-auto">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 px-3 py-1">
            Loterias Principais
          </div>
          {mainNavItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={closeMenus}
              className={({ isActive }) =>
                `flex items-center justify-between px-3 py-2.5 rounded-md text-sm font-medium ${
                  isActive
                    ? 'bg-emerald-600 text-white'
                    : 'text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}

          <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 px-3 pt-3 py-1">
            Outras Loterias Caixa
          </div>
          {moreNavItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={closeMenus}
              className={({ isActive }) =>
                `flex items-center justify-between px-3 py-2.5 rounded-md text-sm font-medium ${
                  isActive
                    ? 'bg-emerald-600 text-white'
                    : 'text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`
              }
            >
              <span>{item.label}</span>
              <span className="text-xs text-slate-400">Ver resultados</span>
            </NavLink>
          ))}

          <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex justify-between px-3 text-xs text-slate-500">
            <span>Resultados atualizados</span>
            <Link
              to="/politica-de-privacidade"
              onClick={closeMenus}
              className="text-emerald-500 hover:underline"
            >
              Privacidade
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
