import { useEffect } from 'react';
import type { NDKKind } from '../types/ndk';
import { useMassacre } from './useMassacre';
import { useSubscription } from '@lawallet/react';
import type { Event } from 'nostr-tools';

interface UseTicketReturns {
  ticketEvents: Event[];
}

export const useTickets = (walias: string): UseTicketReturns => {
  const { setupId, publisherPubkey } = useMassacre();
  const { events: ticketEvents, subscription } = useSubscription({
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

  // Unsubscribe subscription on unmount
  useEffect(() => {
    return () => {
      if (subscription) {
        subscription.stop();
      }
    };
  }, [subscription]);

  return {
    ticketEvents: ticketEvents as Event[],
  };
};
