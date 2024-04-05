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
  const filters = {
    kinds: [1112 as NDKKind],
    '#l': ['power-receipt'],
    '#e': [MASSACRE_SETUP_ID],
    authors: [publisherPubkey],
  } as any;

  if (walias) {
    filters['#i'] = [walias];
  }

  const { events: powerEvents } = useSubscription({
    filters: [filters],
    enabled: !!setupId,
    options: {
      closeOnEose: false,
    },
  });

  return {
    events: powerEvents as Event[],
  };
};
