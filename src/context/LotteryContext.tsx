import React, {
  useEffect,
  useState,
  useCallback,
} from 'react';
import type { LotteryApiData, LotteryType } from '../types/lottery';
import { LOTTERIES_CONFIG } from '../utils/lotteriesConfig';
import { fetchAllLotteries, fetchLatestResult } from '../services/lotteryApi';
import { LotteryContext } from './LotteryContextInstance';

const initialKeys = Object.keys(LOTTERIES_CONFIG) as LotteryType[];

const initialResults = initialKeys.reduce(
  (acc, key) => ({ ...acc, [key]: null }),
  {} as Record<LotteryType, LotteryApiData | null>,
);

const initialLoading = initialKeys.reduce(
  (acc, key) => ({ ...acc, [key]: true }),
  {} as Record<LotteryType, boolean>,
);

export const LotteryProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [results, setResults] =
    useState<Record<LotteryType, LotteryApiData | null>>(initialResults);
  const [loading, setLoading] =
    useState<Record<LotteryType, boolean>>(initialLoading);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  // Carregamento automático de todos os jogos assim que o site é acessado
  const loadAllResults = useCallback(async (force = false) => {
    try {
      const data = await fetchAllLotteries(force);
      setResults(data);
      setLastUpdated(new Date());
    } catch (err) {
      console.error('[LotteryProvider] Erro ao carregar loterias:', err);
    } finally {
      setIsInitialLoading(false);
      setLoading(
        initialKeys.reduce(
          (acc, key) => ({ ...acc, [key]: false }),
          {} as Record<LotteryType, boolean>,
        ),
      );
    }
  }, []);

  useEffect(() => {
    loadAllResults();
  }, [loadAllResults]);

  const refreshLottery = useCallback(async (type: LotteryType) => {
    setLoading((prev) => ({ ...prev, [type]: true }));
    try {
      const data = await fetchLatestResult(type, true);
      setResults((prev) => ({ ...prev, [type]: data }));
    } catch (err) {
      console.error(`[LotteryProvider] Erro ao atualizar ${type}:`, err);
    } finally {
      setLoading((prev) => ({ ...prev, [type]: false }));
    }
  }, []);

  const refreshAll = useCallback(async () => {
    setLoading(
      initialKeys.reduce(
        (acc, key) => ({ ...acc, [key]: true }),
        {} as Record<LotteryType, boolean>,
      ),
    );
    await loadAllResults(true);
  }, [loadAllResults]);

  const getLotteryData = useCallback(
    (type: LotteryType): LotteryApiData | null => {
      return results[type] || null;
    },
    [results],
  );

  const isLotteryLoading = useCallback(
    (type: LotteryType): boolean => {
      return loading[type] ?? false;
    },
    [loading],
  );

  return (
    <LotteryContext.Provider
      value={{
        results,
        loading,
        isInitialLoading,
        lastUpdated,
        getLotteryData,
        isLotteryLoading,
        refreshLottery,
        refreshAll,
      }}
    >
      {children}
    </LotteryContext.Provider>
  );
};
