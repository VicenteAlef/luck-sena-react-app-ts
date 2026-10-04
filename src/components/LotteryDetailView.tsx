import React, { useEffect } from 'react';
import type { LotteryType } from '../types/lottery';
import { LOTTERIES_CONFIG } from '../utils/lotteriesConfig';
import { useLottery } from '../context/useLottery';
import { Title, Title2, Ball, TrevoBall, SkeletonBall, Badge } from './Commons';
import { NumberGenerator } from './NumberGenerator';
import FadeIn from './FadeIn';
import {
  Calendar,
  TrendingUp,
  RefreshCw,
  HelpCircle,
  Users,
  Info,
  Trophy,
  Ticket,
} from 'lucide-react';
import { formatCurrency } from '../services/lotteryApi';

export const LotteryDetailView: React.FC<{ lotteryType: LotteryType }> = ({
  lotteryType,
}) => {
  const config = LOTTERIES_CONFIG[lotteryType];
  const { getLotteryData, isLotteryLoading, refreshLottery } = useLottery();

  const data = getLotteryData(lotteryType);
  const loading = isLotteryLoading(lotteryType);

  useEffect(() => {
    document.title = `LuckSena - ${config.fullName} | Resultados e Gerador de Palpites`;
    window.scrollTo(0, 0);
  }, [config]);

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
    <FadeIn direction="up" delay={100} className="space-y-8">
      {/* Top Banner Header */}
      <div className="p-6 sm:p-10 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 transition-colors">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <span
              className="w-4 h-4 rounded-full shadow-sm"
              style={{ backgroundColor: config.primaryColor }}
            />
            <Title>{config.fullName}</Title>
            {data?.acumulou && !config.isFederal && (
              <Badge variant="rose" className="animate-pulse py-1 px-3">
                Acumulou!
              </Badge>
            )}
            {config.isFederal && (
              <Badge variant="blue" className="py-1 px-3">
                Prêmios Fixos por Série
              </Badge>
            )}
          </div>
          <p className="text-slate-600 dark:text-slate-300 max-w-2xl text-sm sm:text-base leading-relaxed">
            {config.description}
          </p>
          <div className="text-xs text-slate-400 font-medium">
            Sorteios: <strong>{config.drawDays}</strong>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => refreshLottery(lotteryType)}
            disabled={loading}
            className="px-4 py-2.5 rounded-md border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-bold transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            <span>{loading ? 'Atualizando...' : 'Atualizar Dados'}</span>
          </button>
        </div>
      </div>

      {/* Grid: Último Resultado & Próximo Concurso */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Coluna 1 & 2: Resultado do Último Sorteio */}
        <div className="lg:col-span-2 p-6 sm:p-8 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Último Sorteio Realizado
                </span>
                <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mt-0.5">
                  {loading && !data ? (
                    <div className="h-6 w-40 bg-slate-200 dark:bg-slate-700 animate-pulse rounded-sm" />
                  ) : (
                    `${config.isFederal ? 'Extração' : 'Concurso'} ${data?.concurso || 'Recente'}`
                  )}
                </h3>
              </div>
              {data?.data && (
                <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-medium bg-slate-100 dark:bg-slate-800/80 px-3 py-1.5 rounded-md">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{data.data}</span>
                </div>
              )}
            </div>

            {/* Dezenas Sorteadas ou Bilhetes da Federal */}
            <div className="my-6">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-3">
                {config.isFederal
                  ? 'Bilhetes Sorteados (Prêmios Principais):'
                  : 'Dezenas Sorteadas:'}
              </span>

              {loading && !data ? (
                config.isFederal ? (
                  <div className="space-y-3">
                    <div className="h-20 w-full bg-slate-200 dark:bg-slate-700 animate-pulse rounded-md" />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {Array.from({ length: 4 }).map((_, i) => (
                        <div
                          key={i}
                          className="h-16 bg-slate-200 dark:bg-slate-700 animate-pulse rounded-md"
                        />
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-2.5">
                    {Array.from({ length: config.defaultPickQuantity }).map(
                      (_, i) => (
                        <SkeletonBall key={i} size="md" />
                      ),
                    )}
                  </div>
                )
              ) : data && data.dezenas && data.dezenas.length > 0 ? (
                <div>
                  {config.isDuplaSena && data.dezenas.length >= 12 ? (
                    <div className="space-y-4">
                      <div>
                        <span className="text-xs font-bold text-slate-400 block mb-2">
                          1º Sorteio:
                        </span>
                        <div className="flex flex-wrap gap-2 sm:gap-3">
                          {data.dezenas.slice(0, 6).map((num, i) => (
                            <Ball key={`d1-${i}`} size="md" variant={ballVariant}>
                              {num}
                            </Ball>
                          ))}
                        </div>
                      </div>
                      <div>
                        <span className="text-xs font-bold text-slate-400 block mb-2">
                          2º Sorteio:
                        </span>
                        <div className="flex flex-wrap gap-2 sm:gap-3">
                          {data.dezenas.slice(6, 12).map((num, i) => (
                            <Ball key={`d2-${i}`} size="md" variant="rose">
                              {num}
                            </Ball>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : config.isFederal ? (
                    <div className="space-y-3">
                      {/* 1º Prêmio com destaque */}
                      <div className="p-4 rounded-md bg-gradient-to-r from-sky-500/10 via-sky-500/5 to-transparent border border-sky-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-md bg-sky-600 text-white flex items-center justify-center font-black text-sm shrink-0 shadow-sm">
                            1º
                          </div>
                          <div>
                            <span className="text-xs font-bold text-sky-800 dark:text-sky-300 uppercase tracking-wider block">
                              1º Prêmio Principal
                            </span>
                            <span className="text-xs text-slate-500 dark:text-slate-400">
                              {data.premiacoes?.[0]?.valorPremio
                                ? `Prêmio: ${formatCurrency(data.premiacoes[0].valorPremio)} (bilhete inteiro)`
                                : 'Bilhete inteiro'}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-slate-400 font-semibold hidden sm:inline">
                            Bilhete:
                          </span>
                          <span className="font-mono text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-widest bg-white dark:bg-slate-800 px-4 py-1.5 rounded-md border border-slate-200 dark:border-slate-700 shadow-inner">
                            {data.dezenas[0]}
                          </span>
                        </div>
                      </div>

                      {/* 2º ao 5º Prêmios */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {data.dezenas.slice(1, 5).map((bilhete, idx) => {
                          const prizeIdx = idx + 1;
                          const prizeVal = data.premiacoes?.[prizeIdx]?.valorPremio;
                          return (
                            <div
                              key={idx}
                              className="p-3.5 rounded-md bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-center justify-between"
                            >
                              <div className="flex items-center gap-2.5">
                                <div className="w-7 h-7 rounded-md bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 flex items-center justify-center font-bold text-xs shrink-0">
                                  {prizeIdx + 1}º
                                </div>
                                <div>
                                  <span className="text-xs font-bold text-slate-700 dark:text-slate-200 block">
                                    {prizeIdx + 1}º Prêmio
                                  </span>
                                  {prizeVal ? (
                                    <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                                      {formatCurrency(prizeVal)}
                                    </span>
                                  ) : null}
                                </div>
                              </div>
                              <span className="font-mono text-lg font-bold text-slate-900 dark:text-white tracking-widest bg-white dark:bg-slate-900 px-3 py-1 rounded-md border border-slate-200 dark:border-slate-800">
                                {bilhete}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-wrap gap-2 sm:gap-3">
                      {data.dezenas.map((num, i) => (
                        <Ball
                          key={`ball-${i}`}
                          size={data.dezenas.length > 20 ? 'sm' : 'md'}
                          variant={ballVariant}
                        >
                          {num}
                        </Ball>
                      ))}
                    </div>
                  )}

                  {/* Trevos (+Milionária) */}
                  {config.hasTrevos && data.trevos && data.trevos.length > 0 && (
                    <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center gap-3">
                      <span className="text-xs font-bold text-amber-600 dark:text-amber-400">
                        Trevos Sorteados:
                      </span>
                      <div className="flex gap-2">
                        {data.trevos.map((t, i) => (
                          <TrevoBall key={`tr-${i}`} size="md">
                            {t}
                          </TrevoBall>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Mês de Sorte */}
                  {config.hasMesSorte && data.mesSorte && (
                    <div className="mt-4 p-3 rounded-md bg-amber-500/10 border border-amber-500/20 text-amber-800 dark:text-amber-300 text-sm font-semibold flex items-center gap-2">
                      <span>
                        Mês da Sorte Sorteado: <strong>{data.mesSorte}</strong>
                      </span>
                    </div>
                  )}

                  {/* Time do Coração */}
                  {config.hasTimeCoracao && data.timeCoracao && (
                    <div className="mt-4 p-3 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-800 dark:text-emerald-300 text-sm font-semibold flex items-center gap-2">
                      <Trophy className="w-4 h-4 text-emerald-500" />
                      <span>
                        Time do Coração: <strong>{data.timeCoracao}</strong>
                      </span>
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-sm text-slate-400 italic">
                  Dados do sorteio ainda não carregados.
                </p>
              )}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
            <span>Fonte: Loterias Caixa (API Pública)</span>
            <span className="font-semibold text-emerald-600 dark:text-emerald-400">
              Dados Oficiais
            </span>
          </div>
        </div>

        {/* Coluna 3: Próximo Concurso & Premiação */}
        <div className="p-6 sm:p-8 rounded-lg bg-gradient-to-br from-slate-900 to-slate-950 text-white border border-slate-800 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400 mb-2">
              {config.isFederal ? (
                <>
                  <Trophy className="w-4 h-4 text-sky-400" />
                  <span className="text-sky-400">Premiação Principal</span>
                </>
              ) : (
                <>
                  <TrendingUp className="w-4 h-4" />
                  <span>Estimativa de Prêmio</span>
                </>
              )}
            </div>
            <h4 className="text-sm text-slate-400">
              {config.isFederal ? 'Próxima Extração' : 'Próximo Concurso'}{' '}
              {data?.proximoConcurso ? `#${data.proximoConcurso}` : ''}
            </h4>

            <div className="my-6">
              <div className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                {formatCurrency(
                  config.isFederal
                    ? data?.premiacoes?.[0]?.valorPremio || 500000
                    : data?.valorEstimadoProximoConcurso,
                )}
              </div>
              <p className="mt-1 text-xs text-slate-400">
                {config.isFederal
                  ? 'Prêmio fixo por série (bilhete inteiro). Não acumula.'
                  : data?.acumulou
                  ? '🔥 Prêmio acumulado para o próximo sorteio!'
                  : 'Prêmio estimado inicial'}
              </p>
            </div>

            {data?.dataProximoConcurso && (
              <div className="p-4 rounded-md bg-white/5 border border-white/10 flex items-center gap-3">
                <Calendar
                  className={`w-5 h-5 shrink-0 ${
                    config.isFederal ? 'text-sky-400' : 'text-emerald-400'
                  }`}
                />
                <div>
                  <span className="text-xs text-slate-400 block">
                    {config.isFederal
                      ? 'Data Prevista da Extração:'
                      : 'Data Prevista do Sorteio:'}
                  </span>
                  <span className="text-sm font-bold text-white">
                    {data.dataProximoConcurso}
                  </span>
                </div>
              </div>
            )}
          </div>

          <div className="mt-6 pt-4 border-t border-white/10">
            {config.isFederal ? (
              <a
                href="#como-funciona"
                className="w-full py-3 px-4 rounded-md text-center font-bold text-sm bg-sky-500 hover:bg-sky-400 text-slate-950 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-sky-500/20"
              >
                <Ticket className="w-4 h-4" />
                <span>Entenda o Bilhete da Federal</span>
              </a>
            ) : (
              <a
                href="#gerador"
                className="w-full py-3 px-4 rounded-md text-center font-bold text-sm bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20"
              >
                <span>Gerar Palpite para este Sorteio</span>
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Faixas de Premiação (Tabela de Ganhadores) */}
      {data?.premiacoes && data.premiacoes.length > 0 && (
        <div className="p-6 sm:p-8 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Users className="w-5 h-5 text-emerald-500" />
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              {config.isFederal
                ? 'Premiação da Última Extração'
                : 'Premiação do Último Concurso'}
            </h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-700 dark:text-slate-300">
              <thead className="text-xs uppercase bg-slate-50 dark:bg-slate-800/60 text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-700">
                <tr>
                  <th className="py-3 px-4">Faixa</th>
                  <th className="py-3 px-4">
                    {config.isFederal ? 'Bilhete Premiado' : 'Acertos / Descrição'}
                  </th>
                  <th className="py-3 px-4">Ganhadores</th>
                  <th className="py-3 px-4 text-right">Prêmio Individual</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {data.premiacoes.map((premio, idx) => (
                  <tr
                    key={idx}
                    className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors"
                  >
                    <td className="py-3 px-4 font-bold text-slate-500">
                      {config.isFederal
                        ? `${idx + 1}º Prêmio`
                        : `${premio.faixa}ª Faixa`}
                    </td>
                    <td className="py-3 px-4 font-semibold text-slate-900 dark:text-white">
                      {config.isFederal ? (
                        <span className="font-mono text-base font-bold text-sky-700 dark:text-sky-300">
                          {data.dezenas?.[idx] || premio.descricao}
                        </span>
                      ) : (
                        premio.descricao
                      )}
                    </td>
                    <td className="py-3 px-4">
                      {premio.ganhadores > 0 ? (
                        <span className="font-bold text-emerald-600 dark:text-emerald-400">
                          {premio.ganhadores.toLocaleString('pt-BR')}{' '}
                          {config.isFederal ? 'bilhete(s)' : 'aposta(s)'}
                        </span>
                      ) : (
                        <span className="text-slate-400 italic">
                          Não houve ganhadores
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-right font-mono font-bold text-slate-900 dark:text-white">
                      {premio.valorPremio > 0
                        ? formatCurrency(premio.valorPremio)
                        : '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Componente Interativo de Geração de Números (ou Guia do Bilhete para Federal) */}
      {config.isFederal ? (
        <section
          id="como-funciona"
          className="p-6 sm:p-8 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md my-8 transition-colors space-y-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
            <div>
              <div className="flex items-center gap-2">
                <Ticket className="w-5 h-5 text-sky-600 dark:text-sky-400" />
                <Title2>Como Funciona o Bilhete da Loteria Federal</Title2>
              </div>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Entenda por que a Loteria Federal não possui gerador de palpites,
                não utiliza marcação de dezenas e não acumula.
              </p>
            </div>

            <Badge variant="blue" className="self-start sm:self-auto py-1 px-3">
              Bilhetes Pré-Numerados
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-md bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 space-y-2">
              <div className="text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
                1. Bilhetes Impressos
              </div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                Sem volante de dezenas
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Você não escolhe ou marca dezenas como nas outras loterias. Você
                adquire um bilhete já emitido com número de 5 dígitos (ex:
                041092) nas casas lotéricas ou pelo site da Caixa.
              </p>
            </div>

            <div className="p-4 rounded-md bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 space-y-2">
              <div className="text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
                2. Frações e Décimos
              </div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                Cartela inteira ou frações
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Cada bilhete é dividido em 10 frações (décimos). Você pode
                comprar uma fração avulsa ou o bilhete completo. A premiação é
                paga proporcionalmente à quantidade de frações que você possuir.
              </p>
            </div>

            <div className="p-4 rounded-md bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 space-y-2">
              <div className="text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
                3. Faixas Pré-Fixadas
              </div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                Não há valor acumulado
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                A premiação da Federal é definida por séries com valores fixos
                (R$ 500 mil no 1º prêmio em sorteios regulares). A modalidade não
                acumula montantes de um concurso para o outro.
              </p>
            </div>

            <div className="p-4 rounded-md bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 space-y-2">
              <div className="text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
                4. Prêmios Derivados
              </div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                Milhar, Centena e Dezenas
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Além dos 5 prêmios principais, você ganha se acertar a milhar, a
                centena e a dezena final do 1º prêmio, bem como as aproximações
                anterior e posterior ao bilhete vencedor.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-md bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800/80 flex items-start gap-3">
            <Info className="w-5 h-5 text-sky-600 dark:text-sky-400 shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              <strong>Como conferir seu bilhete da Federal:</strong> Localize o
              número de 5 algarismos impresso na sua fração e compare com os 5
              prêmios principais sorteados acima. Verifique também se os dígitos
              finais coincidem com a milhar, centena ou dezena do 1º prêmio.
            </div>
          </div>
        </section>
      ) : (
        <NumberGenerator config={config} latestData={data} />
      )}

      {/* Regras e Como Jogar */}
      <div className="p-6 sm:p-8 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm text-sm text-slate-700 dark:text-slate-300">
        <div className="flex items-center gap-2 mb-3">
          <HelpCircle className="w-5 h-5 text-emerald-500" />
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            Como Jogar e Regras Oficiais da {config.fullName}
          </h3>
        </div>
        <p className="leading-relaxed">{config.howToPlay}</p>
        <div className="mt-4 p-4 rounded-md bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 flex items-start gap-3 text-xs text-slate-500 dark:text-slate-400">
          <Info className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
          <p>
            As apostas oficiais devem ser realizadas exclusivamente nas Casas
            Lotéricas credenciadas pela Caixa Econômica Federal ou através do
            portal de loterias online oficial da Caixa. O LuckSena não registra
            apostas reais.
          </p>
        </div>
      </div>
    </FadeIn>
  );
};
