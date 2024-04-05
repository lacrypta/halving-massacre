import type { Power } from '../types/power';

export const zapEvents: Power[] = [
  {
    walias: 'agustin@lacrypta.ar',
    amount: 1000000, // millisats
    comment: 'Disfrutá este tiro',
    createdAt: new Date().getTime() - 25000,
  },
  {
    walias: 'agustin@lawallet.ar',
    amount: 100000, // millisats
    comment: 'Otro',
    createdAt: new Date().getTime() - 15000,
  },
  {
    walias: 'agustin@lawallet.ar',
    amount: 900000000, // millisats
    comment: 'Muchísimo mas largo. Probando que pasa si mete más caracteres',
    createdAt: new Date().getTime() - 5000,
  },
  {
    walias: 'agustin@lawallet.ar',
    amount: 9000000000, // millisats
    createdAt: new Date().getTime() - 5000,
  },
];
