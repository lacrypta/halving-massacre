export type MassacreStatus = 'SETUP' | 'INITIAL' | 'NORMAL' | 'FREEZE' | 'FINAL';

export interface MassacreStatusEventContent {
  currentBlock: number;
  players: { [walias: string]: number };
  nextFreeze: number;
  nextMassacre: number;
  status: MassacreStatus;
  roundLength: number;
  freezeDuration: number;
}
