import { useContext } from 'react';
import { PlayerContext } from '../context/PlayerContext';

interface UsePlayerReturns {
  hasTicket: boolean;
  isAlive: boolean;
  power: number;
  totalZaps: number;
  amountZapped: number;
}

export const usePlayer = (): UsePlayerReturns => {
  const { hasTicket, isAlive, power, totalZaps, amountZapped } = useContext(PlayerContext);

  return {
    hasTicket,
    isAlive,
    power,
    totalZaps,
    amountZapped,
  };
};
