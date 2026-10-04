import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Title } from '../components/Commons';
import FadeIn from '../components/FadeIn';
import { LotteryCard } from '../components/LotteryCard';
import { LOTTERIES_LIST, LOTTERIES_CONFIG } from '../utils/lotteriesConfig';
import { useLottery } from '../context/useLottery';
import type { LotteryType } from '../types/lottery';
import { NumberGenerator } from '../components/NumberGenerator';
import {
  Brain,
  TrendingUp,
  RefreshCw,
  Search,
  ShieldCheck,
  Zap,
  ArrowRight,
} from 'lucide-react';
import { formatCurrency } from '../services/lotteryApi';

interface JackpotInfo {
  type: LotteryType;
  prize: number;
  concurso: number;
  data?: string;
}

export const Home: React.FC = () => {
  const {
    results,
    loading,
    isInitialLoading,
    refreshAll,
    refreshLottery,
    lastUpdated,
  } = useLottery();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<
    'all' | 'milionarias' | 'populares' | 'diarias'
  >('all');
  const [quickLottery, setQuickLottery] = useState<LotteryType>('megasena');

  useEffect(() => {
    document.title =
      'LuckSena - Resultados das Loterias Caixa & Gerador de Palpites';
    window.scrollTo(0, 0);
  }, []);

  // Encontra a loteria com maior prêmio acumulado no momento
  const highestJackpot = useMemo<JackpotInfo | null>(() => {
    let topLottery: JackpotInfo | null = null;

    (Object.entries(results) as [LotteryType, typeof results[LotteryType]][]).forEach(
      ([type, val]) => {
        if (type === 'federal') return; // Modalidade Federal tem prêmios fixos e não acumula
        const prize = val?.valorEstimadoProximoConcurso || 0;
        if (!topLottery || prize > topLottery.prize) {
          topLottery = {
            type,
            prize,
            concurso: val?.concurso || 0,
            data: val?.dataProximoConcurso,
          };
        }
      },
    );

    return topLottery;
  }, [results]);

  // Filtra as loterias com base na busca e na categoria
  const filteredLotteries = useMemo(() => {
    return LOTTERIES_LIST.filter((lottery) => {
      const matchesSearch =
        lottery.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lottery.fullName.toLowerCase().includes(searchQuery.toLowerCase());

      if (!matchesSearch) return false;

      if (selectedCategory === 'all') return true;
      if (selectedCategory === 'populares') {
        return ['megasena', 'lotofacil', 'quina', 'lotomania'].includes(
          lottery.id,
        );
      }
      if (selectedCategory === 'milionarias') {
        return ['megasena', 'maismilionaria', 'timemania', 'duplasena'].includes(
          lottery.id,
        );
      }
      if (selectedCategory === 'diarias') {
        return ['quina', 'lotofacil'].includes(lottery.id);
      }
      return true;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="space-y-12">
      {/* Hero Banner Moderno */}
      <FadeIn direction="up" delay={50}>
        <div className="relative overflow-hidden rounded-lg bg-gradient-to-b from-emerald-700 via-emerald-800 to-emerald-900 border border-emerald-500/20 shadow-xl p-6 sm:p-12 text-white">
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-emerald-500/20 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-teal-500/10 blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-6">
              Resultados das Loterias em Tempo Real
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight sm:leading-tight">
              Maximize suas chances com o{' '}
              <span className="carter-one-regular text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
                LuckSena
              </span>
            </h1>

            <p className="mt-4 text-base sm:text-xl text-slate-300 leading-relaxed font-normal">
              Acompanhe resultados oficiais atualizados de todas as Loterias
              Caixa assim que você entra no site e gere seus palpites
              matematicamente distribuídos para tentar a sorte grande.
            </p>

            {/* Destaque do Maior Prêmio */}
            {highestJackpot && highestJackpot.prize > 0 && (
              <div className="mt-6 p-4 sm:p-5 rounded-md bg-white/10 backdrop-blur-md border border-white/15 inline-flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-md bg-emerald-500 text-slate-950 font-black">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs uppercase tracking-wider text-emerald-300 font-bold block">
                      Maior Prêmio Acumulado no Momento
                    </span>
                    <span className="text-xl sm:text-2xl font-black text-white">
                      {formatCurrency(highestJackpot.prize)}
                    </span>
                  </div>
                </div>

                <Link
                  to={`/${LOTTERIES_CONFIG[highestJackpot.type].slug}`}
                  className="px-4 py-2 text-xs font-bold rounded-md bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-all flex items-center gap-1.5 shadow-md self-stretch sm:self-auto justify-center"
                >
                  <span>Jogar {LOTTERIES_CONFIG[highestJackpot.type].name}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            )}

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#resultados"
                className="px-6 py-3 rounded-md font-bold text-sm bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-md shadow-emerald-500/20 transition-all"
              >
                Ver Todos os Resultados
              </a>
              <a
                href="#gerador-rapido"
                className="px-6 py-3 rounded-md font-bold text-sm bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-white transition-all"
              >
                Gerador de Palpites
              </a>
            </div>
          </div>
        </div>
      </FadeIn>

      {/* Seção de Resultados Oficiais */}
      <section id="resultados" className="scroll-mt-24 space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-emerald-500" />
              <Title>Resultados das Loterias Caixa</Title>
            </div>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Carregados automaticamente assim que o site é acessado.
              {lastUpdated && (
                <span className="ml-1 text-xs text-slate-400 font-medium">
                  (Última atualização às {lastUpdated.toLocaleTimeString('pt-BR')})
                </span>
              )}
            </p>
          </div>

          <button
            type="button"
            onClick={refreshAll}
            disabled={isInitialLoading}
            className="self-start md:self-auto px-4 py-2.5 rounded-md border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-bold transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <RefreshCw
              className={`w-4 h-4 ${isInitialLoading ? 'animate-spin' : ''}`}
            />
            <span>{isInitialLoading ? 'Carregando...' : 'Sincronizar Todos'}</span>
          </button>
        </div>

        {/* Barra de Filtros e Busca */}
        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
          {/* Categorias */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            <button
              type="button"
              onClick={() => setSelectedCategory('all')}
              className={`px-3.5 py-2 rounded-md text-xs font-bold transition-colors whitespace-nowrap cursor-pointer ${
                selectedCategory === 'all'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700'
              }`}
            >
              Todas ({LOTTERIES_LIST.length})
            </button>
            <button
              type="button"
              onClick={() => setSelectedCategory('populares')}
              className={`px-3.5 py-2 rounded-md text-xs font-bold transition-colors whitespace-nowrap cursor-pointer ${
                selectedCategory === 'populares'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700'
              }`}
            >
              Mais Populares
            </button>
            <button
              type="button"
              onClick={() => setSelectedCategory('milionarias')}
              className={`px-3.5 py-2 rounded-md text-xs font-bold transition-colors whitespace-nowrap cursor-pointer ${
                selectedCategory === 'milionarias'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700'
              }`}
            >
              Super Milionárias
            </button>
            <button
              type="button"
              onClick={() => setSelectedCategory('diarias')}
              className={`px-3.5 py-2 rounded-md text-xs font-bold transition-colors whitespace-nowrap cursor-pointer ${
                selectedCategory === 'diarias'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700'
              }`}
            >
              Diárias
            </button>
          </div>

          {/* Campo de Busca Rápida */}
          <div className="relative min-w-[240px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar por loteria..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-md text-xs sm:text-sm border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        {/* Grid de Cards de Loterias */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLotteries.map((lottery) => (
            <LotteryCard
              key={lottery.id}
              config={lottery}
              data={results[lottery.id]}
              loading={loading[lottery.id]}
              onRefresh={() => refreshLottery(lottery.id)}
            />
          ))}
        </div>

        {filteredLotteries.length === 0 && (
          <div className="p-12 text-center rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <p className="text-slate-500 dark:text-slate-400">
              Nenhuma loteria encontrada para a busca "{searchQuery}".
            </p>
          </div>
        )}
      </section>

      {/* Seção Gerador Rápido Integrado */}
      <section id="gerador-rapido" className="scroll-mt-24 space-y-6">
        <div className="p-6 sm:p-10 rounded-lg bg-gradient-to-br from-slate-900 to-slate-950 text-white border border-slate-800 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                Ferramenta Interativa
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
                Gere seu Palpite da Sorte Agora
              </h2>
              <p className="mt-1 text-sm text-slate-400">
                Selecione a loteria desejada e crie combinações personalizadas.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <label htmlFor="select-quick-lottery" className="text-xs text-slate-400 font-semibold sr-only">
                Loteria:
              </label>
              <select
                id="select-quick-lottery"
                value={quickLottery}
                onChange={(e) => setQuickLottery(e.target.value as LotteryType)}
                className="px-4 py-2.5 rounded-md border border-slate-700 bg-slate-800 text-white text-sm font-bold focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              >
                {LOTTERIES_LIST.filter((l) => !l.isFederal).map((l) => (
                  <option key={l.id} value={l.id}>
                    {l.fullName}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-6">
            <NumberGenerator
              key={quickLottery}
              config={LOTTERIES_CONFIG[quickLottery]}
              latestData={results[quickLottery]}
            />
          </div>
        </div>
      </section>

      {/* Destaques / Vantagens do LuckSena */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4">
        <div className="p-6 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
            <Zap className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            Resultados Imediatos
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Acesso automático aos números sorteados, estimativas de prêmio e
            faixas de ganhadores de todas as 10 loterias oficiais da Caixa.
          </p>
        </div>

        <div className="p-6 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-md bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
            <Brain className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            Palpites Inteligentes
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Geração de jogos equilibrados conforme as regras oficiais (trevos,
            meses, times e colunas) com recurso para conferir com o último
            sorteio.
          </p>
        </div>

        <div className="p-6 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-md bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            100% Gratuito e LGPD
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Sem cadastro ou cobranças. Seus dados e preferências ficam no seu
            dispositivo, com consentimento transparente de cookies.
          </p>
        </div>
      </section>
    </div>
  );
};
