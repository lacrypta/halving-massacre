import { createContext, useEffect, useMemo, useState } from 'react';

import { PUBLISHER_PUBKEY } from './MassacreContext';

import { parseContent, useNostrContext, useSubscription } from '@lawallet/react';
import { useMassacre } from '../hooks/useMassacre';

import { getCurrentRound } from '../lib/utils';
import type { MassacreRound } from '../types/massacre';
import type { NDKKind } from '../types/ndk';
import type { RoundEventContent } from '../types/round';

interface RoundsContextType {
  rounds: MassacreRound[];
  currentRound: MassacreRound | null;
  getMassacreByRoundIndex: (roundIndex: number) => Promise<RoundEventContent | null>;
}

export const RoundsContext = createContext({} as RoundsContextType);

// const roundsMock: MassacreRound[] = [
//   {
//     height: 839650,
//     survivors: 139,
//     freezeHeight: 839648,
//     nextMassacre: 1,
//   },
//   {
//     height: 839750,
//     survivors: 69,
//     freezeHeight: 839748,
//     nextMassacre: 2,
//   },
//   {
//     height: 839850,
//     survivors: 34,
//     freezeHeight: 839848,
//     nextMassacre: 3,
//   },
//   {
//     height: 839950,
//     survivors: 17,
//     freezeHeight: 839848,
//     nextMassacre: 4,
//   },
//   {
//     height: 839974,
//     survivors: 8,
//     freezeHeight: 839972,
//     nextMassacre: 5,
//   },
//   {
//     height: 839984,
//     survivors: 4,
//     freezeHeight: 839982,
//     nextMassacre: 6,
//   },
//   {
//     height: 839994,
//     survivors: 2,
//     freezeHeight: 839992,
//     nextMassacre: 7,
//   },
//   {
//     height: 840000,
//     survivors: 1,
//     freezeHeight: 839998,
//     nextMassacre: null,
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
    enabled: !!setupId,
    options: {
      closeOnEose: false,
    },
  });

  const { ndk } = useNostrContext();

  const getMassacreByRoundIndex = async (roundIndex: number): Promise<RoundEventContent | null> => {
    if (currentBlock < rounds[roundIndex]!.height) return null;

    const roundEvent = await ndk.fetchEvent({
      authors: [PUBLISHER_PUBKEY],
      kinds: [1112 as NDKKind],
      '#e': [setupId],
      '#t': [`round:${roundIndex}`],
    });

    if (!roundEvent) return null;

    return parseContent(roundEvent.content) as RoundEventContent;
  };

  // Set rounds on start event
  useEffect(() => {
    if (startEvents.length < 1) {
      return;
    }

    const _rounds = JSON.parse(startEvents[0]?.content as string).massacreSchedule as MassacreRound[];

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
        getMassacreByRoundIndex,
      }}
    >
      {children}
    </RoundsContext.Provider>
  );
}
