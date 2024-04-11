import { useContext } from 'react';
import { PlayerContext, type PlayerContextType } from '../context/PlayerContext';

export const usePlayer = (): PlayerContextType => {
  const { player, hasTicket, ticketEvent, isAlive, totalZaps, amountZapped } = useContext(PlayerContext);

  return {
    player,
    hasTicket,
    ticketEvent,
    isAlive,
    totalZaps,
    amountZapped,
  };
};
