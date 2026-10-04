import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Cookie,
  ShieldCheck,
  Check,
  X,
  Sliders,
} from 'lucide-react';
import {
  getCookieConsent,
  setCookieConsent,
} from '../services/analytics';
import type { CookieConsentStatus } from '../services/analytics';

export const CookieConsent: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(true);

  useEffect(() => {
    // Verifica se já há consentimento registrado
    const consent = getCookieConsent();
    if (!consent) {
      // Delay suave para não assustar o usuário assim que a tela abre
      const timer = setTimeout(() => setIsVisible(true), 800);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    // Permite reabrir o modal a partir de qualquer ponto da aplicação (ex: Footer)
    const handleOpen = () => {
      const consent = getCookieConsent();
      setAnalyticsEnabled(consent === 'accepted' || consent === null);
      setIsModalOpen(true);
      setIsVisible(true);
    };

    window.addEventListener('openCookiePreferences', handleOpen);
    return () => {
      window.removeEventListener('openCookiePreferences', handleOpen);
    };
  }, []);

  const handleAcceptAll = () => {
    setCookieConsent('accepted');
    setIsVisible(false);
    setIsModalOpen(false);
  };

  const handleAcceptEssential = () => {
    setCookieConsent('essential');
    setIsVisible(false);
    setIsModalOpen(false);
  };

  const handleSavePreferences = () => {
    const status: CookieConsentStatus = analyticsEnabled
      ? 'accepted'
      : 'essential';
    setCookieConsent(status);
    setIsVisible(false);
    setIsModalOpen(false);
  };

  if (!isVisible && !isModalOpen) {
    return null;
  }

  return (
    <>
      {/* Banner Flutuante Inferior */}
      {!isModalOpen && (
        <aside
          role="region"
          aria-label="Consentimento de Cookies"
          className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-lg z-50 p-5 rounded-md bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-slate-200 dark:border-slate-800 shadow-xl text-slate-800 dark:text-slate-200 animate-in slide-in-from-bottom duration-300"
        >
          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-md bg-amber-500/10 text-amber-600 dark:text-amber-400 shrink-0">
              <Cookie className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <h4 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                Privacidade & Cookies
              </h4>
              <p className="mt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Utilizamos cookies para melhorar a experiência do usuário,
                lembrar seu tema (claro/escuro) e analisar métricas anônimas com
                Google Analytics conforme nossa{' '}
                <Link
                  to="/politica-de-privacidade"
                  className="text-emerald-600 dark:text-emerald-400 font-semibold hover:underline"
                >
                  Política de Privacidade
                </Link>
                .
              </p>
            </div>
          </div>

          <div className="mt-4 flex flex-col sm:flex-row items-center justify-end gap-2 pt-2 border-t border-slate-100 dark:border-slate-800/80">
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="w-full sm:w-auto px-3 py-2 text-xs font-semibold rounded-md text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              Personalizar
            </button>
            <button
              type="button"
              onClick={handleAcceptEssential}
              className="w-full sm:w-auto px-3 py-2 text-xs font-semibold rounded-md border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              Apenas Essenciais
            </button>
            <button
              type="button"
              onClick={handleAcceptAll}
              className="w-full sm:w-auto px-4 py-2 text-xs font-bold rounded-md bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-600/20 transition-all cursor-pointer"
            >
              Aceitar Todos
            </button>
          </div>
        </aside>
      )}

      {/* Modal de Detalhes / Personalização */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-lg rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-6 text-slate-800 dark:text-slate-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                  <Sliders className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  Preferências de Privacidade
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="mt-3 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Você pode escolher quais categorias de cookies autoriza neste
              navegador. Suas preferências serão salvas e podem ser alteradas a
              qualquer momento no rodapé do site.
            </p>

            <div className="mt-5 space-y-4">
              {/* Categoria 1: Essenciais */}
              <div className="p-4 rounded-md border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-emerald-500" />
                    <span className="font-bold text-sm text-slate-900 dark:text-white">
                      Cookies Estritamente Necessários
                    </span>
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-sm">
                    Sempre Ativos
                  </span>
                </div>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  Responsáveis pelo funcionamento básico do site, como memorizar
                  sua escolha de tema (modo escuro/claro) e preferências de
                  privacidade. Não coletam dados pessoais.
                </p>
              </div>

              {/* Categoria 2: Analíticos Google Analytics */}
              <div className="p-4 rounded-md border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Cookie className="w-5 h-5 text-amber-500" />
                    <div>
                      <span className="font-bold text-sm text-slate-900 dark:text-white block">
                        Cookies Analíticos (Google Analytics)
                      </span>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={analyticsEnabled}
                      onChange={(e) => setAnalyticsEnabled(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-300 dark:bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                  </label>
                </div>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  Permitem mensurar o número de acessos e páginas mais
                  visitadas de forma totalmente anônima e agregada, ajudando na
                  melhoria contínua das funcionalidades.
                </p>
              </div>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row items-center justify-end gap-2 pt-4 border-t border-slate-200 dark:border-slate-800">
              <button
                type="button"
                onClick={handleAcceptEssential}
                className="w-full sm:w-auto px-4 py-2 text-xs font-semibold rounded-md border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              >
                Rejeitar Analíticos
              </button>
              <button
                type="button"
                onClick={handleSavePreferences}
                className="w-full sm:w-auto px-4 py-2 text-xs font-bold rounded-md bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-600/20 transition-all cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Check className="w-4 h-4" />
                Salvar Preferências
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
