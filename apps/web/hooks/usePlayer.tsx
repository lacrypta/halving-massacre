import { useContext } from 'react';
import { PlayerContext } from '../context/PlayerContext';

interface UsePlayerReturns {
  walias: string;
  hasTicket: boolean;
  isAlive: boolean;
  power: number;
  totalZaps: number;
  amountZapped: number;
}

export const usePlayer = (): UsePlayerReturns => {
  const { walias, hasTicket, isAlive, power, totalZaps, amountZapped } = useContext(PlayerContext);

  return {
    walias,
    hasTicket,
    isAlive,
    power,
    totalZaps,
    amountZapped,
  };
};
