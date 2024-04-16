import type { PlayersPower } from './power';

export type MassacreStatus = 'SETUP' | 'CLOSED' | 'INITIAL' | 'NORMAL' | 'FREEZE' | 'FINAL';

export interface MassacreStatusEventContent {
  currentBlock: number;
  top100Players?: PlayersPower;
  players?: PlayersPower;
  currentPool: number;
  playerCount: number;
  nextFreeze: number;
  nextMassacre: number;
  status: MassacreStatus;
  roundLength: number;
  freezeDuration: number;
}
