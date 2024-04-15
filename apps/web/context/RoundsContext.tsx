import { createContext, useEffect, useMemo, useState } from 'react';

import { PUBLISHER_PUBKEY } from './MassacreContext';

import { useMassacre } from '../hooks/useMassacre';
import { useSubscription } from '@lawallet/react';

import type { NDKKind } from '../types/ndk';
import type { MassacreRound } from '../types/massacre';

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
    setRounds(JSON.parse(startEvents[0]?.content as string) as MassacreRound[]);
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

/**
 * Gets current round or returns null if no round is found
 * @param rounds
 * @param currentBlock
 * @returns
 */
function getCurrentRound(rounds: MassacreRound[], currentBlock: number): MassacreRound | null {
  // Sort by height ascending
  rounds.sort((a, b) => a.height - b.height);
  // Find current round
  for (let index = 0; index < rounds.length; index++) {
    if (currentBlock < rounds[index]!.height) {
      return { ...rounds[index]!, index };
    }
  }

  return null;
}
