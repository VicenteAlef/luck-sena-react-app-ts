import { useContext } from 'react';
import {
  LotteryContext,
  type LotteryContextType,
} from './LotteryContextInstance';

export const useLottery = (): LotteryContextType => {
  const context = useContext(LotteryContext);
  if (!context) {
    throw new Error('useLottery deve ser utilizado dentro de um LotteryProvider');
  }
  return context;
};
