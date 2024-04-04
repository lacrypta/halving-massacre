import { createContext } from 'react';
import { useTicket } from '../hooks/useTicket';
import type { Event } from 'nostr-tools';
import { usePowerEvents } from '../hooks/usePowerEvents';

export interface PlayerContextType {
  power: number;
  totalZaps: number;
  amountZapped: number;
  isAlive: boolean;
  walias: string;
  hasTicket: boolean;
  ticketEvent?: Event;
  zapEvents?: Event[];
}

export const PlayerContext = createContext({} as PlayerContextType);

export function PlayerProvider({ walias, children }: React.PropsWithChildren & { walias: string }) {
  const { hasTicket, ticketEvent } = useTicket(walias);
  const { events: powerEvents } = usePowerEvents(walias);
  const value = {
    power: 1000,
    isAlive: true,
    hasTicket,
    totalZaps: 4,
    amountZapped: 700,
    ticketEvent,
    powerEvents,
    walias,
  };

  console.info('value:');
  console.dir(value);

  return <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>;
}