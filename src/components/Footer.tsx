import React from 'react';
import { Link } from 'react-router-dom';
import {
  ExternalLink,
  ShieldCheck,
  Cookie,
  FileText,
  AlertTriangle,
  HeartHandshake,
  Globe,
} from 'lucide-react';
import { LOTTERIES_LIST } from '../utils/lotteriesConfig';

export const Footer: React.FC = () => {
  const openCookiePreferences = () => {
    window.dispatchEvent(new CustomEvent('openCookiePreferences'));
  };

  return (
    <footer className="w-full bg-slate-900 dark:bg-slate-950 text-slate-300 border-t border-slate-800 transition-colors">
      {/* Top Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Coluna 1: Sobre & Marca */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-md bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-emerald-500/20">
                <img
                  src="/icons8-clover-100.png"
                  alt="Trevo"
                  className="w-6 h-6"
                />
              </div>
              <span className="text-2xl carter-one-regular tracking-normal text-white">
                Luck<span className="text-emerald-400">Sena</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Sua plataforma moderna e confiável para consulta de resultados em
              tempo real das Loterias Caixa e gerador estatístico de palpites
              inteligentes para suas apostas.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://vicentedeveloper.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors flex items-center gap-2 text-xs"
                title="Website Vicente Dev"
              >
                <Globe className="w-4 h-4 text-emerald-400" />
                <span>vicentedeveloper.com</span>
              </a>
            </div>
          </div>

          {/* Coluna 2: Loterias Caixa */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              Loterias Disponíveis
            </h3>
            <ul className="grid grid-cols-2 gap-2 text-sm text-slate-400">
              {LOTTERIES_LIST.map((lottery) => (
                <li key={lottery.id}>
                  <Link
                    to={`/${lottery.slug}`}
                    className="hover:text-emerald-400 transition-colors inline-flex items-center gap-1.5"
                  >
                    <span>{lottery.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Coluna 3: Links Úteis e Oficiais */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500" />
              Links Úteis & Oficiais
            </h3>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <a
                  href="https://loterias.caixa.gov.br"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors inline-flex items-center gap-1.5 group"
                >
                  <span>Portal Oficial Loterias Caixa</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-emerald-400" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.loteriasonline.caixa.gov.br"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors inline-flex items-center gap-1.5 group"
                >
                  <span>Loterias Online (Apostas Oficiais)</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-emerald-400" />
                </a>
              </li>
              <li>
                <a
                  href="https://loterias.caixa.gov.br/Paginas/Jogo-Responsavel.aspx"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors inline-flex items-center gap-1.5 group"
                >
                  <HeartHandshake className="w-3.5 h-3.5 text-rose-400" />
                  <span>Programa Jogo Responsável (+18)</span>
                </a>
              </li>
              <li>
                <a
                  href="https://loteriascaixa-api.herokuapp.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors inline-flex items-center gap-1.5 group"
                >
                  <span>API Pública de Resultados</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-emerald-400" />
                </a>
              </li>
            </ul>
          </div>

          {/* Coluna 4: Legal & Privacidade */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-purple-500" />
              Legal & Privacidade
            </h3>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <Link
                  to="/termos-de-uso"
                  className="hover:text-white transition-colors inline-flex items-center gap-1.5"
                >
                  <FileText className="w-3.5 h-3.5 text-slate-500" />
                  <span>Termos de Uso</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/politica-de-privacidade"
                  className="hover:text-white transition-colors inline-flex items-center gap-1.5"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-slate-500" />
                  <span>Política de Privacidade (LGPD)</span>
                </Link>
              </li>
              <li>
                <button
                  type="button"
                  onClick={openCookiePreferences}
                  className="hover:text-emerald-400 transition-colors inline-flex items-center gap-1.5 text-left cursor-pointer"
                >
                  <Cookie className="w-3.5 h-3.5 text-amber-400" />
                  <span>Preferências de Cookies</span>
                </button>
              </li>
            </ul>

            <div className="mt-6 p-3 rounded-md bg-slate-800/60 border border-slate-700/60 text-xs text-slate-400">
              <p className="font-semibold text-slate-300 flex items-center gap-1.5 mb-1">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                Aviso Legal
              </p>
              O LuckSena é um serviço independente sem vínculo com a Caixa
              Econômica Federal. Não realizamos apostas nem pagamos prêmios.
            </div>
          </div>
        </div>

        {/* Disclaimer Bar */}
        <div className="mt-12 pt-8 border-t border-slate-800 text-xs text-slate-400 space-y-3 leading-relaxed">
          <p>
            <strong>Aviso de Responsabilidade:</strong> As marcas e logotipos das
            loterias (Mega-Sena, Lotofácil, Quina, Lotomania, etc.) são marcas
            registradas de titularidade exclusiva da Caixa Econômica Federal. O
            LuckSena utiliza dados públicos apenas com finalidade informativa,
            analítica e recreativa. Apostas são restritas a maiores de 18 anos.
            Jogue com responsabilidade.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-800/80">
            <p className="text-slate-400">
              &copy; {new Date().getFullYear()} LuckSena. Todos os direitos
              reservados.
            </p>
            <a
              href="https://vicentedeveloper.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
            >
              Desenvolvido por Vicente Dev
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
