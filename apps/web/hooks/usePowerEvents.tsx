import type { NDKKind } from '../types/ndk';
import { useMassacre } from './useMassacre';
import { useSubscription } from '@lawallet/react';
import type { Event } from 'nostr-tools';

interface UsePowerEventsReturns {
  events: Event[];
}

const MASSACRE_SETUP_ID = process.env.NEXT_PUBLIC_MASSACRE_SETUP_ID!;

export const usePowerEvents = (walias: string): UsePowerEventsReturns => {
  const { setupId, publisherPubkey } = useMassacre();
  const { events: powerEvents } = useSubscription({
    filters: [
      {
        kinds: [1112 as NDKKind],
        '#l': ['power-receipt'],
        '#e': [MASSACRE_SETUP_ID],
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
