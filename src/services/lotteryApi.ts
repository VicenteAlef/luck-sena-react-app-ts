import type { LotteryApiData, LotteryType } from '../types/lottery';
import { LOTTERIES_CONFIG } from '../utils/lotteriesConfig';

const API_BASE_URL = 'https://loteriascaixa-api.herokuapp.com/api';
const CACHE_PREFIX = 'lucksena_cache_';
const CACHE_TTL_MS = 10 * 60 * 1000; // 10 minutos de cache

interface CacheEntry<T> {
  timestamp: number;
  data: T;
}

export function formatCurrency(value?: number): string {
  if (value === undefined || value === null || isNaN(value)) {
    return 'Aguardando estimativa';
  }
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    maximumFractionDigits: 2,
  });
}

export async function fetchLatestResult(
  lottery: LotteryType,
  forceRefresh = false,
): Promise<LotteryApiData> {
  const cacheKey = `${CACHE_PREFIX}${lottery}`;

  if (!forceRefresh) {
    try {
      const cached = localStorage.getItem(cacheKey);
      if (cached) {
        const entry: CacheEntry<LotteryApiData> = JSON.parse(cached);
        const age = Date.now() - entry.timestamp;
        if (age < CACHE_TTL_MS && entry.data && entry.data.concurso) {
          return entry.data;
        }
      }
    } catch {
      // Falha ao ler cache, prosseguir com a requisição
    }
  }

  const endpoint = `${API_BASE_URL}/${lottery}/latest`;
  const response = await fetch(endpoint);

  if (!response.ok) {
    throw new Error(`Erro ao obter dados de ${lottery}: HTTP ${response.status}`);
  }

  const data: LotteryApiData = await response.json();

  try {
    const entry: CacheEntry<LotteryApiData> = {
      timestamp: Date.now(),
      data,
    };
    localStorage.setItem(cacheKey, JSON.stringify(entry));
  } catch {
    // Cache write error ignorable (e.g. quota exceeded)
  }

  return data;
}

export async function fetchAllLotteries(
  forceRefresh = false,
): Promise<Record<LotteryType, LotteryApiData | null>> {
  const keys = Object.keys(LOTTERIES_CONFIG) as LotteryType[];
  const results: Partial<Record<LotteryType, LotteryApiData | null>> = {};

  const promises = keys.map(async (key) => {
    try {
      const data = await fetchLatestResult(key, forceRefresh);
      results[key] = data;
    } catch (err) {
      console.warn(`[LotteryApi] Falha ao carregar ${key}:`, err);
      // Tentar usar cache antigo se requisição falhar
      try {
        const cached = localStorage.getItem(`${CACHE_PREFIX}${key}`);
        if (cached) {
          const entry: CacheEntry<LotteryApiData> = JSON.parse(cached);
          results[key] = entry.data;
          return;
        }
      } catch {
        // Sem cache disponível
      }
      results[key] = null;
    }
  });

  await Promise.all(promises);
  return results as Record<LotteryType, LotteryApiData | null>;
}
