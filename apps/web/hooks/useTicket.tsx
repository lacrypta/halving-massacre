import type { NDKKind } from '../types/ndk';
import { useMassacre } from './useMassacre';
import { useSubscription } from '@lawallet/react';
import type { Event } from 'nostr-tools';

interface UseTicketReturns {
  hasTicket: boolean;
  ticketEvent?: Event;
}

const MASSACRE_SETUP_ID = process.env.NEXT_PUBLIC_MASSACRE_SETUP_ID!;

export const useTicket = (walias: string): UseTicketReturns => {
  const { setupId, publisherPubkey } = useMassacre();
  const { events: ticketEvents } = useSubscription({
    filters: [
      {
        kinds: [1112 as NDKKind],
        '#l': ['ticket'],
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
    hasTicket: !!ticketEvents?.[0],
    ticketEvent: ticketEvents?.[0] as Event,
  };
};
