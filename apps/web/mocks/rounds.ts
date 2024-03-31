import type { UserRound } from '../types/round';

export const userRounds: UserRound[] = [
  {
    index: 0,
    name: 'Ronda 1',
    alive: true, // Survived
    finished: true, // Done
    accumulatedPower: 1000000,
    powerIncrease: 1000000,
  },
  {
    index: 1,
    name: 'Ronda 2',
    alive: true, // Survived
    finished: true, // Done
    accumulatedPower: 1000000,
    powerIncrease: 1000000,
  },
  {
    index: 2,
    name: 'Ronda 3',
    alive: true, // Survived
    finished: true, // Done
    accumulatedPower: 1000000,
    powerIncrease: 1000000,
  },
  {
    index: 3,
    name: 'Ronda 4',
    alive: true, // Alive
    finished: false, // In progress
    accumulatedPower: 1000000,
    powerIncrease: 1000000,
  },
  {
    index: 4,
    name: 'Ronda 5',
    alive: false, // Massacrated
    finished: true, // Done. Last round for this user
    accumulatedPower: 1000000,
    powerIncrease: 0,
  },
  {
    index: 5,
    name: 'Ronda Final',
    alive: false, // Massacrated
    finished: false, // In progress but dead (should be hidden for the user)
    accumulatedPower: 1000000,
    powerIncrease: 0,
  },
];
