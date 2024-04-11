import { useContext } from 'react';
import { PlayerContext, type PlayerContextType } from '../context/PlayerContext';

export const usePlayer = (): PlayerContextType => {
  const { walias, player, hasTicket, ticketEvent, isAlive, totalZaps, amountZapped } = useContext(PlayerContext);

  return {
    walias,
    player,
    hasTicket,
    ticketEvent,
    isAlive,
    totalZaps,
    amountZapped,
  };
};
