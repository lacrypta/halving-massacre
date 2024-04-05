export type MassacreStatus = 'SETUP' | 'INITIAL' | 'NORMAL' | 'FREEZE' | 'FINAL';

export interface MassacreStatusEventContent {
  currentBlock: number;
  topPlayers: { [walias: string]: number };
  playerCount: number;
  nextFreeze: number;
  nextMassacre: number;
  status: MassacreStatus;
  roundLength: number;
  freezeDuration: number;
}
