export interface UserRound {
  index: number;
  name: string;
  alive: boolean;
  powerIncrease: number;
  accumulatedPower: number;
  finished: boolean;
}
