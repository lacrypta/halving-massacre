import type { NDKKind } from '../types/ndk';
import { useMassacre } from './useMassacre';
import { useSubscription } from '@lawallet/react';
import type { Event } from 'nostr-tools';

interface UseTicketReturns {
  ticketEvents: Event[];
}

export const useTickets = (walias: string): UseTicketReturns => {
  const { setupId, publisherPubkey } = useMassacre();
  const { events: ticketEvents } = useSubscription({
    filters: [
      {
        kinds: [1112 as NDKKind],
        '#l': ['ticket'],
        authors: [publisherPubkey],
      },
    ],
    enabled: !!setupId,
    options: {
      closeOnEose: false,
    },
  });

  return {
    ticketEvents: ticketEvents as Event[],
  };
};
