import React, { useState } from 'react';
import {
  Dices,
  Copy,
  Check,
  Trophy,
} from 'lucide-react';
import type { LotteryConfig, LotteryApiData } from '../types/lottery';
import { Ball, TrevoBall, Title2, Badge } from './Commons';
import {
  sortearNumeros,
  sortearTrevos,
  sortearMesSorte,
  sortearTimeCoracao,
  sortearSuperSete,
  sortearBilhetesFederal,
  conferirAcertos,
} from '../utils/drawer';
import { trackEvent } from '../services/analytics';

interface NumberGeneratorProps {
  config: LotteryConfig;
  latestData?: LotteryApiData | null;
}

export const NumberGenerator: React.FC<NumberGeneratorProps> = ({
  config,
  latestData,
}) => {
  const [quantity, setQuantity] = useState<number>(config.defaultPickQuantity);
  const [trevosQuantity, setTrevosQuantity] = useState<number>(
    config.minTrevos || 2,
  );
  const [generatedNumbers, setGeneratedNumbers] = useState<number[]>([]);
  const [generatedTrevos, setGeneratedTrevos] = useState<number[]>([]);
  const [generatedMes, setGeneratedMes] = useState<string>('');
  const [generatedTime, setGeneratedTime] = useState<string>('');
  const [generatedSuperSete, setGeneratedSuperSete] = useState<number[][]>([]);
  const [generatedFederal, setGeneratedFederal] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [checkResult, setCheckResult] = useState<{
    totalAcertos: number;
    acertos: (number | string)[];
  } | null>(null);

  const getBallVariant = () => {
    switch (config.id) {
      case 'megasena':
        return 'emerald';
      case 'lotofacil':
        return 'fuchsia';
      case 'quina':
        return 'indigo';
      case 'lotomania':
        return 'amber';
      case 'maismilionaria':
        return 'teal';
      case 'duplasena':
        return 'rose';
      case 'diadesorte':
        return 'amber';
      case 'timemania':
        return 'lime';
      case 'supersete':
        return 'teal';
      case 'federal':
        return 'sky';
      default:
        return 'default';
    }
  };

  const ballVariant = getBallVariant();

  const handleGenerate = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsGenerating(true);
    setCheckResult(null);

    setTimeout(() => {
      if (config.hasColumns) {
        const cols = sortearSuperSete(quantity);
        setGeneratedSuperSete(cols);
      } else if (config.isFederal) {
        const bilhetes = sortearBilhetesFederal(quantity);
        setGeneratedFederal(bilhetes);
      } else {
        const numbers = sortearNumeros(
          config.minNumber,
          config.maxNumber,
          quantity,
        );
        setGeneratedNumbers(numbers);

        if (config.hasTrevos) {
          const trevos = sortearTrevos(trevosQuantity);
          setGeneratedTrevos(trevos);
        }
        if (config.hasMesSorte) {
          setGeneratedMes(sortearMesSorte());
        }
        if (config.hasTimeCoracao) {
          setGeneratedTime(sortearTimeCoracao());
        }
      }

      setIsGenerating(false);
      trackEvent('gerar_palpite', 'Gerador', config.name, quantity);
    }, 250);
  };

  const handleCopy = () => {
    let text = '';
    if (config.hasColumns && generatedSuperSete.length > 0) {
      text = generatedSuperSete
        .map((col, idx) => `Col ${idx + 1}: ${col.join(', ')}`)
        .join(' | ');
    } else if (config.isFederal && generatedFederal.length > 0) {
      text = `Bilhetes Federal: ${generatedFederal.join(', ')}`;
    } else if (generatedNumbers.length > 0) {
      text = `Palpite ${config.name}: ${generatedNumbers
        .map((n) => String(n).padStart(2, '0'))
        .join(' - ')}`;
      if (generatedTrevos.length > 0) {
        text += ` | Trevos: ${generatedTrevos.join(', ')}`;
      }
      if (generatedMes) {
        text += ` | Mês: ${generatedMes}`;
      }
      if (generatedTime) {
        text += ` | Time: ${generatedTime}`;
      }
    }

    if (text) {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      trackEvent('copiar_palpite', 'Gerador', config.name);
    }
  };

  const handleCheckLatest = () => {
    if (!latestData || !latestData.dezenas || generatedNumbers.length === 0)
      return;
    const result = conferirAcertos(generatedNumbers, latestData.dezenas);
    setCheckResult(result);
    trackEvent('conferir_palpite', 'Gerador', config.name, result.totalAcertos);
  };

  const hasNumbers =
    generatedNumbers.length > 0 ||
    generatedSuperSete.length > 0 ||
    generatedFederal.length > 0;

  if (config.isFederal) {
    return null;
  }

  return (
    <section
      id="gerador"
      className="p-6 sm:p-8 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md my-8 transition-colors"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: config.primaryColor }}
            />
            <Title2>Gerador de Palpites Inteligente</Title2>
          </div>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Gere combinações aleatórias baseadas nas regras oficiais da{' '}
            <strong>{config.fullName}</strong>.
          </p>
        </div>

        <Badge variant="emerald" className="self-start sm:self-auto py-1 px-3">
          Estatisticamente Balanceado
        </Badge>
      </div>

      {/* Formulário de Seleção */}
      <form
        onSubmit={handleGenerate}
        className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 items-end"
      >
        {/* Quantidade de Dezenas */}
        <div>
          <label
            htmlFor="quantity-select"
            className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-2"
          >
            {config.hasColumns
              ? 'Total de Números nas Colunas'
              : config.isFederal
              ? 'Quantidade de Bilhetes'
              : 'Quantidade de Dezenas'}
          </label>
          <select
            id="quantity-select"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="w-full px-4 py-2.5 rounded-md border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-colors"
          >
            {config.allowedPickQuantities.map((q) => (
              <option key={q} value={q}>
                {q} {config.isFederal ? 'bilhete(s)' : 'números'}
                {q === config.defaultPickQuantity ? ' (Jogo padrão)' : ''}
              </option>
            ))}
          </select>
        </div>

        {/* Quantidade de Trevos (+Milionária) */}
        {config.hasTrevos && (
          <div>
            <label
              htmlFor="trevos-select"
              className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-2"
            >
              Quantidade de Trevos (1 a 6)
            </label>
            <select
              id="trevos-select"
              value={trevosQuantity}
              onChange={(e) => setTrevosQuantity(Number(e.target.value))}
              className="w-full px-4 py-2.5 rounded-md border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-colors"
            >
              {[2, 3, 4, 5, 6].map((t) => (
                <option key={t} value={t}>
                  {t} trevos {t === 2 ? '(Padrão)' : ''}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Botão Gerar */}
        <div>
          <button
            type="submit"
            disabled={isGenerating}
            className="w-full h-11 px-6 rounded-md font-bold text-white bg-emerald-600 hover:bg-emerald-500 active:scale-95 shadow-md shadow-emerald-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <Dices
              className={`w-5 h-5 ${isGenerating ? 'animate-spin' : ''}`}
            />
            <span>
              {isGenerating ? 'Sorteando...' : 'Gerar Números da Sorte'}
            </span>
          </button>
        </div>
      </form>

      {/* Resultados Gerados */}
      {hasNumbers && (
        <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 animate-in fade-in duration-300">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Seu Palpite Gerado:
              </span>
              <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                Boa sorte! Guarde seus números e jogue responsavelmente.
              </p>
            </div>

            <div className="flex items-center gap-2">
              {latestData && latestData.dezenas && generatedNumbers.length > 0 && (
                <button
                  type="button"
                  onClick={handleCheckLatest}
                  className="px-3.5 py-2 rounded-md text-xs font-bold border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-1.5 cursor-pointer"
                  title="Conferir quantos números deste palpite coincidem com o último sorteio"
                >
                  <Trophy className="w-3.5 h-3.5 text-amber-500" />
                  <span>Conferir no Concurso {latestData.concurso}</span>
                </button>
              )}

              <button
                type="button"
                onClick={handleCopy}
                className="px-3.5 py-2 rounded-md text-xs font-bold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 transition-colors flex items-center gap-1.5 cursor-pointer"
                title="Copiar números gerados"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                    <span className="text-emerald-500">Copiado!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copiar</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Feedback de Conferência */}
          {checkResult && (
            <div className="mb-6 p-4 rounded-md bg-emerald-500/10 border border-emerald-500/30 text-emerald-800 dark:text-emerald-300 animate-in fade-in duration-200 flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center gap-2.5">
                <Trophy className="w-5 h-5 text-amber-500" />
                <span className="text-sm font-semibold">
                  Seu palpite teria acertado{' '}
                  <strong>{checkResult.totalAcertos}</strong> número(s) no
                  concurso {latestData?.concurso}!
                  {checkResult.totalAcertos > 0 &&
                    ` (Dezenas: ${checkResult.acertos
                      .map((n) => String(n).padStart(2, '0'))
                      .join(', ')})`}
                </span>
              </div>
              <Badge variant="emerald">
                {checkResult.totalAcertos >= 4
                  ? 'Grande Palpite!'
                  : 'Simulação de Teste'}
              </Badge>
            </div>
          )}

          {/* Bolas Geradas */}
          <div className="p-6 rounded-md bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
            {/* Super Sete Columns Layout */}
            {config.hasColumns && generatedSuperSete.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3">
                {generatedSuperSete.map((col, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/80 text-center"
                  >
                    <div className="text-[11px] font-bold text-slate-400 mb-2">
                      Coluna {idx + 1}
                    </div>
                    <div className="flex flex-wrap justify-center gap-1.5">
                      {col.map((num, i) => (
                        <Ball key={i} size="sm" variant={ballVariant}>
                          {num}
                        </Ball>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : config.isFederal && generatedFederal.length > 0 ? (
              /* Federal Tickets Layout */
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {generatedFederal.map((bilhete, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-center shadow-sm"
                  >
                    <div className="text-xs font-semibold text-slate-400">
                      Bilhete #{idx + 1}
                    </div>
                    <div className="text-2xl font-black text-slate-900 dark:text-white tracking-widest mt-1 font-mono">
                      {bilhete}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* Standard Lotteries Numbers Layout */
              <div>
                <div className="flex flex-wrap gap-2.5 sm:gap-3">
                  {generatedNumbers.map((num) => {
                    const isMatched =
                      checkResult !== null &&
                      checkResult.acertos.some(
                        (a) => Number(a) === Number(num),
                      );

                    return (
                      <Ball
                        key={num}
                        size={generatedNumbers.length > 20 ? 'sm' : 'md'}
                        variant={ballVariant}
                        isMatched={isMatched}
                      >
                        {String(num).padStart(2, '0')}
                      </Ball>
                    );
                  })}
                </div>

                {/* +Milionária Trevos */}
                {config.hasTrevos && generatedTrevos.length > 0 && (
                  <div className="mt-5 pt-4 border-t border-slate-200 dark:border-slate-700 flex items-center gap-3">
                    <span className="text-xs font-bold text-amber-600 dark:text-amber-400">
                      Trevos da Sorte:
                    </span>
                    <div className="flex gap-2">
                      {generatedTrevos.map((t) => (
                        <TrevoBall key={t} size="sm">
                          {t}
                        </TrevoBall>
                      ))}
                    </div>
                  </div>
                )}

                {/* Dia de Sorte Mês */}
                {config.hasMesSorte && generatedMes && (
                  <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-700 text-sm text-slate-700 dark:text-slate-300">
                    Mês de Sorte sorteado:{' '}
                    <strong className="text-amber-600 dark:text-amber-400 font-bold">
                      {generatedMes}
                    </strong>
                  </div>
                )}

                {/* Timemania Time */}
                {config.hasTimeCoracao && generatedTime && (
                  <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-700 text-sm text-slate-700 dark:text-slate-300">
                    Time do Coração sorteado:{' '}
                    <strong className="text-emerald-600 dark:text-emerald-400 font-bold">
                      {generatedTime}
                    </strong>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
