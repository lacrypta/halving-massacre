import type { NDKKind } from '../types/ndk';
import { useMassacre } from './useMassacre';
import { useSubscription } from '@lawallet/react';
import type { Event } from 'nostr-tools';

interface UseTicketReturns {
  hasTicket: boolean;
  ticketEvent?: Event;
}

export const useTicket = (walias: string): UseTicketReturns => {
  const { setupId, publisherPubkey } = useMassacre();
  const { events: ticketEvents } = useSubscription({
    filters: [
      {
        kinds: [1112 as NDKKind],
        // '#L': 'halving-massacre',
        '#l': ['ticket'],
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
    hasTicket: !!ticketEvents?.[0],
    ticketEvent: ticketEvents?.[0] as Event,
  };
};
