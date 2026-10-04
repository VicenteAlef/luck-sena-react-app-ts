import React from 'react';
import { Link } from 'react-router-dom';
import {
  Calendar,
  ArrowRight,
  TrendingUp,
  RefreshCw,
  Trophy,
  Ticket,
} from 'lucide-react';
import type { LotteryConfig, LotteryApiData } from '../types/lottery';
import { Ball, TrevoBall, SkeletonBall, Badge } from './Commons';
import { formatCurrency } from '../services/lotteryApi';

interface LotteryCardProps {
  config: LotteryConfig;
  data: LotteryApiData | null;
  loading: boolean;
  onRefresh?: () => void;
}

export const LotteryCard: React.FC<LotteryCardProps> = ({
  config,
  data,
  loading,
  onRefresh,
}) => {
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

  return (
    <div className="relative group rounded-lg p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between">
      {/* Top Header of Card */}
      <div>
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <div
              className={`w-3.5 h-3.5 rounded-full`}
              style={{ backgroundColor: config.primaryColor }}
            />
            <div>
              <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">
                {config.name}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {config.drawDays}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {data?.acumulou && !config.isFederal && (
              <Badge variant="rose" className="animate-pulse">
                Acumulou!
              </Badge>
            )}
            {config.isFederal && (
              <Badge variant="blue">
                Prêmios Fixos
              </Badge>
            )}
            {onRefresh && (
              <button
                type="button"
                onClick={onRefresh}
                className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                title="Atualizar resultado"
              >
                <RefreshCw
                  className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`}
                />
              </button>
            )}
          </div>
        </div>

        {/* Concurso e Data Info */}
        <div className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400 mb-4 pb-3 border-b border-slate-100 dark:border-slate-800">
          <Calendar className="w-3.5 h-3.5" />
          {loading && !data ? (
            <div className="h-4 w-32 bg-slate-200 dark:bg-slate-700 animate-pulse rounded-sm" />
          ) : data ? (
            <span>
              {config.isFederal ? 'Extração' : 'Concurso'}{' '}
              <strong>{data.concurso}</strong> ({data.data})
            </span>
          ) : (
            <span>{config.isFederal ? 'Extração recente' : 'Concurso recente'}</span>
          )}
        </div>

        {/* Drawn Numbers / Tickets Section */}
        <div className="my-4">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2.5 flex items-center justify-between">
            <span>
              {config.isFederal ? 'Bilhetes Sorteados (1º ao 5º)' : 'Dezenas Sorteadas'}
            </span>
            {config.isFederal && (
              <span className="text-[10px] lowercase font-normal text-slate-400">
                bilhetes de 5 dígitos
              </span>
            )}
          </div>

          {loading && !data ? (
            config.isFederal ? (
              <div className="space-y-2">
                <div className="h-12 w-full bg-slate-200 dark:bg-slate-700 animate-pulse rounded-md" />
                <div className="grid grid-cols-2 gap-1.5">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div
                      key={i}
                      className="h-10 bg-slate-200 dark:bg-slate-700 animate-pulse rounded-md"
                    />
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {Array.from({
                  length: Math.min(config.defaultPickQuantity, 8),
                }).map((_, i) => (
                  <SkeletonBall key={i} size="sm" />
                ))}
              </div>
            )
          ) : data && data.dezenas && data.dezenas.length > 0 ? (
            <div>
              {/* Federal Special handling: Bilhetes Sorteados em vez de bolinhas de dezenas */}
              {config.isFederal ? (
                <div className="space-y-2">
                  {/* 1º Prêmio com destaque */}
                  <div className="p-2.5 rounded-md bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800/80 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Ticket className="w-4 h-4 text-sky-600 dark:text-sky-400" />
                      <div>
                        <span className="text-xs font-bold text-sky-800 dark:text-sky-300 block">
                          1º Prêmio
                        </span>
                        {data.premiacoes?.[0]?.valorPremio ? (
                          <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                            {formatCurrency(data.premiacoes[0].valorPremio)}
                          </span>
                        ) : null}
                      </div>
                    </div>
                    <span className="font-mono text-base font-black text-slate-900 dark:text-white tracking-widest bg-white dark:bg-slate-900 px-2.5 py-1 rounded-sm border border-sky-100 dark:border-sky-900 shadow-xs">
                      {data.dezenas[0]}
                    </span>
                  </div>

                  {/* 2º ao 5º Prêmios */}
                  <div className="grid grid-cols-2 gap-1.5">
                    {data.dezenas.slice(1, 5).map((num, i) => {
                      const prizeIdx = i + 1;
                      const prizeVal = data.premiacoes?.[prizeIdx]?.valorPremio;
                      return (
                        <div
                          key={i}
                          className="p-2 rounded-md bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 flex items-center justify-between"
                        >
                          <div>
                            <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 block">
                              {prizeIdx + 1}º Prêmio
                            </span>
                            {prizeVal ? (
                              <span className="text-[10px] text-slate-400">
                                {formatCurrency(prizeVal)}
                              </span>
                            ) : null}
                          </div>
                          <span className="font-mono text-xs font-black text-slate-800 dark:text-slate-200 tracking-wider">
                            {num}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : config.isDuplaSena && data.dezenas.length >= 12 ? (
                <div className="space-y-3">
                  <div>
                    <span className="text-[11px] font-bold text-slate-400 block mb-1">
                      1º Sorteio
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {data.dezenas.slice(0, 6).map((num, i) => (
                        <Ball
                          key={`s1-${i}`}
                          size="sm"
                          variant={ballVariant}
                        >
                          {num}
                        </Ball>
                      ))}
                    </div>
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-slate-400 block mb-1">
                      2º Sorteio
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {data.dezenas.slice(6, 12).map((num, i) => (
                        <Ball
                          key={`s2-${i}`}
                          size="sm"
                          variant="rose"
                        >
                          {num}
                        </Ball>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-wrap gap-1.5">
                  {data.dezenas.map((num, i) => (
                    <Ball
                      key={`num-${i}`}
                      size={data.dezenas.length > 15 ? 'sm' : 'sm'}
                      variant={ballVariant}
                    >
                      {num}
                    </Ball>
                  ))}
                </div>
              )}

              {/* Mais Milionária Trevos */}
              {config.hasTrevos && data.trevos && data.trevos.length > 0 && (
                <div className="mt-3 pt-3 border-t border-dashed border-slate-200 dark:border-slate-800 flex items-center gap-2">
                  <span className="text-xs font-bold text-amber-600 dark:text-amber-400">
                    Trevos:
                  </span>
                  <div className="flex gap-1.5">
                    {data.trevos.map((t, i) => (
                      <TrevoBall key={`trevo-${i}`} size="sm">
                        {t}
                      </TrevoBall>
                    ))}
                  </div>
                </div>
              )}

              {/* Dia de Sorte Mês */}
              {config.hasMesSorte && data.mesSorte && (
                <div className="mt-3 pt-2 text-xs text-amber-600 dark:text-amber-400 font-semibold">
                  Mês da Sorte: <strong>{data.mesSorte}</strong>
                </div>
              )}

              {/* Timemania Time do Coração */}
              {config.hasTimeCoracao && data.timeCoracao && (
                <div className="mt-3 pt-2 text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
                  Time do Coração: <strong>{data.timeCoracao}</strong>
                </div>
              )}
            </div>
          ) : (
            <p className="text-xs text-slate-400 italic">
              Resultado indisponível no momento.
            </p>
          )}
        </div>
      </div>

      {/* Bottom Section: Next Draw Estimate & Action */}
      <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800">
        {config.isFederal ? (
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                  <Trophy className="w-3 h-3 text-sky-500" />
                  Prêmio Principal (1º Bilhete)
                </span>
                <div className="text-lg sm:text-xl font-black text-slate-900 dark:text-white tracking-tight mt-0.5">
                  {formatCurrency(data?.premiacoes?.[0]?.valorPremio || 500000)}
                </div>
              </div>
              <div className="text-right text-[11px] text-slate-400 font-medium">
                <span className="text-sky-600 dark:text-sky-400 font-bold block">
                  {data?.dataProximoConcurso ? `Sorteio em: ${data.dataProximoConcurso}` : 'Quartas e Sábados'}
                </span>
                <span className="text-[10px] text-slate-400">Não acumula</span>
              </div>
            </div>

            <div>
              <Link
                to={`/${config.slug}`}
                className="w-full flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-md text-xs font-bold text-white bg-sky-700 hover:bg-sky-600 shadow-sm transition-all group-hover:scale-[1.01]"
              >
                <span>Ver Bilhetes & Regras da Federal</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3 text-emerald-500" />
                  Próximo Prêmio Estimado
                </span>
                <div className="text-lg sm:text-xl font-black text-slate-900 dark:text-white tracking-tight mt-0.5">
                  {formatCurrency(data?.valorEstimadoProximoConcurso)}
                </div>
              </div>
              {data?.dataProximoConcurso && (
                <div className="text-right text-[11px] text-slate-400 font-medium">
                  Sorteio em:
                  <div className="font-semibold text-slate-700 dark:text-slate-300">
                    {data.dataProximoConcurso}
                  </div>
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-2">
              <Link
                to={`/${config.slug}`}
                className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-md text-xs font-bold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 transition-colors"
              >
                <span>Ver Detalhes</span>
              </Link>

              <Link
                to={`/${config.slug}#gerador`}
                className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-md text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 shadow-sm shadow-emerald-600/20 transition-all group-hover:scale-[1.02]"
              >
                <span>Gerar Palpite</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
