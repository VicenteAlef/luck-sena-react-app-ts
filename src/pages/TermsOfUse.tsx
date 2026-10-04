import React, { useEffect } from 'react';
import { Title, Title2 } from '../components/Commons';
import FadeIn from '../components/FadeIn';
import { FileText, ShieldAlert, CheckCircle2, AlertOctagon } from 'lucide-react';

export const TermsOfUse: React.FC = () => {
  useEffect(() => {
    document.title = 'Termos de Uso - LuckSena';
    window.scrollTo(0, 0);
  }, []);

  return (
    <FadeIn direction="up" delay={100} className="max-w-4xl mx-auto py-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
          <FileText className="w-8 h-8" />
        </div>
        <div>
          <Title>Termos de Uso</Title>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Última atualização: Outubro de 2026
          </p>
        </div>
      </div>

      <div className="prose dark:prose-invert max-w-none space-y-8 text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
        {/* Seção 1 */}
        <div className="p-6 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <Title2 className="text-emerald-600 dark:text-emerald-400 mb-3 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5" />
            1. Natureza Informativa e do Serviço
          </Title2>
          <p>
            O <strong>LuckSena</strong> é uma plataforma web independente
            desenvolvida exclusivamente com finalidades{' '}
            <strong>informativas, estatísticas e recreativas</strong>. O site
            reúne dados públicos de sorteios das loterias federais do Brasil e
            oferece utilitários para geração de combinações numéricas aleatórias
            (palpites).
          </p>
          <p className="mt-2">
            <strong>Não realizamos apostas, intermediações ou cobranças de valores.</strong>{' '}
            Nenhuma aposta pode ser registrada diretamente nesta plataforma, e
            nenhum prêmio monetário é pago ou garantido pelo LuckSena.
          </p>
        </div>

        {/* Seção 2 */}
        <div className="p-6 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <Title2 className="text-emerald-600 dark:text-emerald-400 mb-3 flex items-center gap-2">
            <ShieldAlert className="w-5 h-5" />
            2. Vínculo e Marcas Registradas
          </Title2>
          <p>
            O LuckSena <strong>não possui nenhum vínculo institucional, comercial, parceria ou representação oficial</strong>{' '}
            com a <strong>Caixa Econômica Federal</strong> ou com o Governo
            Federal do Brasil.
          </p>
          <p className="mt-2">
            Os nomes e marcas comerciais, incluindo, mas não se limitando a:{' '}
            <em>Mega-Sena</em>, <em>Lotofácil</em>, <em>Quina</em>,{' '}
            <em>Lotomania</em>, <em>+Milionária</em>, <em>Dupla Sena</em>,{' '}
            <em>Dia de Sorte</em>, <em>Timemania</em>, <em>Super Sete</em> e{' '}
            <em>Loteria Federal</em>, são de propriedade e titularidade
            exclusiva da <strong>Caixa Econômica Federal</strong>. O uso destes
            nomes no site ocorre unicamente em caráter referencial para
            identificação dos concursos públicos oficiais.
          </p>
        </div>

        {/* Seção 3 */}
        <div className="p-6 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <Title2 className="text-emerald-600 dark:text-emerald-400 mb-3 flex items-center gap-2">
            <AlertOctagon className="w-5 h-5" />
            3. Restrição Etária e Jogo Responsável
          </Title2>
          <p>
            De acordo com a legislação brasileira vigente (Lei Federal nº
            13.756/2018 e Estatuto da Criança e do Adolescente), a participação
            em jogos de loteria e apostas é terminantemente proibida para
            menores de 18 (dezoito) anos.
          </p>
          <p className="mt-2">
            Encorajamos enfaticamente a prática de <strong>Jogo Responsável</strong>. Loterias
            devem ser encaradas exclusivamente como entretenimento. Nunca aposte
            valores que possam comprometer seu orçamento ou subsistência familiar.
          </p>
        </div>

        {/* Seção 4 */}
        <div className="p-6 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <Title2 className="text-emerald-600 dark:text-emerald-400 mb-3">
            4. Ausência de Garantia de Ganhos
          </Title2>
          <p>
            Os números gerados pela ferramenta de palpites são obtidos por meio
            de algoritmos de números pseudoaleatórios e simulações estatísticas.
            Não há qualquer garantia implícita ou explícita de acertos, premiações
            ou aumento matemático de chances reais em relação à probabilidade
            oficial determinada pelas regras da Caixa Econômica Federal.
          </p>
        </div>

        {/* Seção 5 */}
        <div className="p-6 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <Title2 className="text-emerald-600 dark:text-emerald-400 mb-3">
            5. Isenção de Responsabilidade sobre Dados
          </Title2>
          <p>
            Embora nos esforcemos para manter os resultados e estimativas
            atualizados e sincronizados em tempo hábil através de APIs públicas,
            podem ocorrer atrasos, instabilidades de rede ou inconsistências
            temporárias.
          </p>
          <p className="mt-2 font-medium">
            Em caso de dúvidas ou para fins legais de recebimento de prêmios, o
            usuário deve sempre conferir o bilhete físico ou digital através dos
            canais oficiais da Caixa Econômica Federal (Casas Lotéricas ou{' '}
            <a
              href="https://loterias.caixa.gov.br"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-500 hover:underline"
            >
              loterias.caixa.gov.br
            </a>
            ).
          </p>
        </div>

        {/* Seção 6 */}
        <div className="p-6 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <Title2 className="text-emerald-600 dark:text-emerald-400 mb-3">
            6. Contato e Dúvidas
          </Title2>
          <p>
            Caso você tenha sugestões, correções ou perguntas a respeito destes
            Termos de Uso, entre em contato através do site do desenvolvedor:{' '}
            <a
              href="https://vicentedeveloper.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-500 hover:underline font-bold"
            >
              vicentedeveloper.com
            </a>
            .
          </p>
        </div>
      </div>
    </FadeIn>
  );
};
