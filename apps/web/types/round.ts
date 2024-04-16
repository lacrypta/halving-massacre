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
