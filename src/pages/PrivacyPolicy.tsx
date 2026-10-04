import React, { useEffect } from 'react';
import { Title, Title2 } from '../components/Commons';
import FadeIn from '../components/FadeIn';
import { ShieldCheck, Lock, Cookie, Eye, UserCheck } from 'lucide-react';

export const PrivacyPolicy: React.FC = () => {
  useEffect(() => {
    document.title = 'Política de Privacidade e LGPD - LuckSena';
    window.scrollTo(0, 0);
  }, []);

  const openCookiePreferences = () => {
    window.dispatchEvent(new CustomEvent('openCookiePreferences'));
  };

  return (
    <FadeIn direction="up" delay={100} className="max-w-4xl mx-auto py-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
          <ShieldCheck className="w-8 h-8" />
        </div>
        <div>
          <Title>Política de Privacidade & Cookies</Title>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Em conformidade com a LGPD (Lei nº 13.709/2018) • Atualizado em Outubro de 2026
          </p>
        </div>
      </div>

      <div className="prose dark:prose-invert max-w-none space-y-8 text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
        {/* Introdução */}
        <div className="p-6 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <Title2 className="text-emerald-600 dark:text-emerald-400 mb-3 flex items-center gap-2">
            <Lock className="w-5 h-5" />
            1. Compromisso com sua Privacidade
          </Title2>
          <p>
            No <strong>LuckSena</strong>, a privacidade e a segurança dos dados
            dos nossos usuários são prioridades absolutas. Esta Política de
            Privacidade descreve de maneira transparente como as informações são
            tratadas ao navegar em nossa aplicação.
          </p>
          <p className="mt-2">
            O site não exige criação de conta, não armazena dados de cartões, não
            solicita senhas nem CPF, e opera sob o princípio da minimização de
            dados.
          </p>
        </div>

        {/* Coleta de Dados e Cookies */}
        <div className="p-6 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <Title2 className="text-emerald-600 dark:text-emerald-400 mb-3 flex items-center gap-2">
            <Cookie className="w-5 h-5" />
            2. Cookies e Armazenamento Local (LocalStorage)
          </Title2>
          <p>
            Utilizamos armazenamento no próprio navegador do usuário com
            propósitos legítimos e transparentes:
          </p>
          <ul className="list-disc pl-5 mt-3 space-y-2">
            <li>
              <strong>Cookies e Chaves Estritamente Necessárias:</strong> Salvar
              a sua preferência de modo escuro ou claro (
              <code className="text-xs bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">
                lucksena_theme
              </code>
              ), o registro do seu consentimento de privacidade e cache temporário
              das requisições das loterias para navegação ultrarrápida.
            </li>
            <li>
              <strong>Cookies Analíticos (Google Analytics):</strong> Mediante
              seu consentimento expresso, utilizamos o serviço Google Analytics
              para entender o volume de acessos, páginas de loterias mais
              procuradas e estabilidade técnica da plataforma.
            </li>
          </ul>

          <div className="mt-4 p-4 rounded-md bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <p className="text-sm font-bold text-slate-900 dark:text-white">
                Deseja alterar seu consentimento agora?
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Você pode autorizar ou revogar cookies analíticos a qualquer
                momento.
              </p>
            </div>
            <button
              type="button"
              onClick={openCookiePreferences}
              className="px-4 py-2 rounded-md text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm transition-all cursor-pointer shrink-0"
            >
              Configurar Preferências
            </button>
          </div>
        </div>

        {/* Google Analytics e Anonimização */}
        <div className="p-6 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <Title2 className="text-emerald-600 dark:text-emerald-400 mb-3 flex items-center gap-2">
            <Eye className="w-5 h-5" />
            3. Google Analytics e Anonimização de IP
          </Title2>
          <p>
            Quando ativado pelo usuário, o Google Analytics coleta métricas
            estatísticas genéricas (como tipo de navegador, sistema operacional e
            tempo médio de permanência). O recurso de{' '}
            <strong>anonimização de IP (IP Anonymization)</strong> está ativado,
            de modo que o seu endereço IP não é armazenado de forma completa ou
            identificável pela equipe do LuckSena.
          </p>
          <p className="mt-2">
            Se você optar por "Apenas Essenciais" no aviso de cookies, os scripts
            de análise não serão carregados em sua sessão.
          </p>
        </div>

        {/* Direitos LGPD */}
        <div className="p-6 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <Title2 className="text-emerald-600 dark:text-emerald-400 mb-3 flex items-center gap-2">
            <UserCheck className="w-5 h-5" />
            4. Seus Direitos como Titular de Dados (LGPD)
          </Title2>
          <p>
            Nos termos do Artigo 18 da Lei Federal nº 13.709/2018 (LGPD), você
            tem o direito de:
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-1.5">
            <li>Confirmar a existência de tratamento de dados;</li>
            <li>Revogar o consentimento a qualquer momento;</li>
            <li>
              Eliminar dados locais armazenados limpando o histórico do seu
              navegador;
            </li>
            <li>
              Navegar de forma anônima sem qualquer bloqueio das funcionalidades
              essenciais de consulta de resultados e palpites.
            </li>
          </ul>
        </div>

        {/* Contato DPO / Desenvolvedor */}
        <div className="p-6 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <Title2 className="text-emerald-600 dark:text-emerald-400 mb-3">
            5. Encarregado pelo Tratamento e Contato
          </Title2>
          <p>
            Para esclarecer quaisquer questões sobre esta política ou exercer seus
            direitos garantidos pela legislação, você pode entrar em contato
            diretamente com o desenvolvedor responsável através do canal
            oficial:
          </p>
          <p className="mt-2">
            Website:{' '}
            <a
              href="https://vicentedeveloper.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-500 hover:underline font-bold"
            >
              https://vicentedeveloper.com
            </a>
          </p>
        </div>
      </div>
    </FadeIn>
  );
};
