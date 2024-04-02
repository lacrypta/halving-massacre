import { createContext } from 'react';

export interface MassacreContextType {
  totalPlayers: number;
  totalAmount: number;
  medianPower: number;
  setupId: string;
}

export const MassacreContext = createContext({} as MassacreContextType);

export function MassacreProvider({ setupId, children }: { setupId: string } & React.PropsWithChildren) {
  const value = {
    totalPlayers: 100,
    totalAmount: 10000,
    medianPower: 500,
    setupId,
  };

  return <MassacreContext.Provider value={value}>{children}</MassacreContext.Provider>;
}
