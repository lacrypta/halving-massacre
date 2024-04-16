import type { PlayersPower } from './power';

export type MassacreStatus = 'SETUP' | 'CLOSED' | 'INITIAL' | 'NORMAL' | 'FREEZE' | 'FINAL';

export interface MassacreStatusEventContent {
  currentBlock: number;
  players?: PlayersPower;
  status: MassacreStatus;
  nextMassacre: number;
  nextFreeze: number;
  currentPool: number;
  top100Players: { [walias: string]: number };
  playerCount: number;
  buckets: {
    max: number;
    min: number;
  }[];
}

export interface MassacreRound {
  index?: number;
  height: number;
  survivors: number;
  freezeHeight: number;
  nextMassacre: number | null;
}
