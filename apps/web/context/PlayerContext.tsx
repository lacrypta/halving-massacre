import { createContext } from 'react';

export interface PlayerContextType {
  power: number;
  totalZaps: number;
  amountZapped: number;
  isAlive: boolean;
  walias: string;
  hasTicket: boolean;
}

export const PlayerContext = createContext({} as PlayerContextType);

export function PlayerProvider({ children }: React.PropsWithChildren & { walias: string }) {
  const value = {
    power: 200,
    isAlive: true,
    hasTicket: true,
    totalZaps: 4,
    amountZapped: 700,
    walias: 'agustin@lacrypta.ar',
  };

  return <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>;
}
