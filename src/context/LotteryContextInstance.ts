import { createContext } from 'react';
import type { LotteryApiData, LotteryType } from '../types/lottery';

export interface LotteryContextType {
  results: Record<LotteryType, LotteryApiData | null>;
  loading: Record<LotteryType, boolean>;
  isInitialLoading: boolean;
  lastUpdated: Date | null;
  getLotteryData: (type: LotteryType) => LotteryApiData | null;
  isLotteryLoading: (type: LotteryType) => boolean;
  refreshLottery: (type: LotteryType) => Promise<void>;
  refreshAll: () => Promise<void>;
}

export const LotteryContext = createContext<LotteryContextType | undefined>(
  undefined,
);
