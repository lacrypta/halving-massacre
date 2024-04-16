import { createContext, useEffect, useMemo, useState } from 'react';

import { PUBLISHER_PUBKEY } from './MassacreContext';

import { useMassacre } from '../hooks/useMassacre';
import { useSubscription } from '@lawallet/react';

import type { NDKKind } from '../types/ndk';
import type { MassacreRound } from '../types/massacre';
import { getCurrentRound } from '../lib/utils';

interface RoundsContextType {
  rounds: MassacreRound[];
  currentRound: MassacreRound | null;
}

export const RoundsContext = createContext({} as RoundsContextType);

// const roundsMock: MassacreRound[] = [
//   {
//     height: 1000,
//     freezeHeight: 123,
//     nextMassacre: 123,
//     survivors: 123,
//   },
//   {
//     height: 2000,
//     freezeHeight: 123,
//     nextMassacre: 123,
//     survivors: 123,
//   },
//   {
//     height: 3000,
//     freezeHeight: 123,
//     nextMassacre: 123,
//     survivors: 123,
//   },
//   {
//     height: 4000,
//     freezeHeight: 123,
//     nextMassacre: 123,
//     survivors: 123,
//   },
// ];

export function RoundsProvider({ children }: React.PropsWithChildren) {
  const { setupId, currentBlock } = useMassacre();
  const [rounds, setRounds] = useState<MassacreRound[]>([]);

  // Start subscription
  const { events: startEvents, subscription: startSubscription } = useSubscription({
    filters: [
      {
        kinds: [1112 as NDKKind],
        authors: [PUBLISHER_PUBKEY],
        '#e': [setupId],
        '#l': ['start'],
      },
    ],
    enabled: false && !!setupId,
    options: {
      closeOnEose: false,
    },
  });

  // Set rounds on start event
  useEffect(() => {
    if (startEvents.length < 1) {
      return;
    }

    const _rounds = JSON.parse(startEvents[0]?.content as string) as MassacreRound[];

    _rounds.sort((a, b) => a.height - b.height);
    setRounds(_rounds);
  }, [startEvents]);

  // Unsubscribe start subscription on unmount
  useEffect(() => {
    return () => {
      if (startSubscription) {
        startSubscription.stop();
      }
    };
  }, [startSubscription]);

  // Get current round
  const currentRound = useMemo(() => {
    return getCurrentRound(rounds, currentBlock);
  }, [rounds, currentBlock]);

  return (
    <RoundsContext.Provider
      value={{
        rounds,
        currentRound,
      }}
    >
      {children}
    </RoundsContext.Provider>
  );
}
