import type { PlayersPower } from './power';

export type RoundStatus = 'FINISHED' | 'ACTUAL' | 'PENDING';

export interface Round {
  round: number;
  block: number;
  status: RoundStatus;
}

export interface UserRound {
  index: number;
  name: string;
  alive: boolean;
  powerIncrease: number;
  accumulatedPower: number;
  finished: boolean;
}

export interface RoundEventContent {
  block: {
    id: string;
    header: string;
    height: number;
  };
  players: PlayersPower;
  deadPlayers: PlayersPower;
}
