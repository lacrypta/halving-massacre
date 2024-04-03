import type { NDKKind } from '../types/ndk';
import { useMassacre } from './useMassacre';
import { useSubscription } from '@lawallet/react';
import type { Event } from 'nostr-tools';

interface UsePowerEventsReturns {
  events: Event[];
}

export const usePowerEvents = (walias: string): UsePowerEventsReturns => {
  const { setupId, publisherPubkey } = useMassacre();
  const { events: powerEvents } = useSubscription({
    filters: [
      {
        kinds: [1112 as NDKKind],
        // '#L': 'halving-massacre',
        '#l': ['power-receipt'],
        '#i': [walias],
        authors: [publisherPubkey],
      },
    ],
    enabled: !!setupId,
    options: {
      closeOnEose: false,
    },
  });

  return {
    events: powerEvents as Event[],
  };
};
