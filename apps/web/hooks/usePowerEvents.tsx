import { useEffect, useState } from 'react';
import type { NDKKind } from '../types/ndk';
import type { Power } from '../types/power';
import { useMassacre } from './useMassacre';
import { useSubscription } from '@lawallet/react';
import type { Event } from 'nostr-tools';

interface UsePowerEventsReturns {
  events: Event[];
  powerActions: Power[];
}

const MASSACRE_SETUP_ID = process.env.NEXT_PUBLIC_MASSACRE_SETUP_ID!;

export const usePowerEvents = (walias: string): UsePowerEventsReturns => {
  const [powerEventsDeduplicated, setPowerEventsDeduplicated] = useState<Event[]>([]);
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

  // BUG: Duplicated events
  // TODO: deduplicate events
  const { events: _powerEvents } = useSubscription({
    filters: [filters],
    enabled: !!setupId,
    options: {
      closeOnEose: false,
    },
  });

  useEffect(() => {
    const deduplicated = Object.values(Object.fromEntries(_powerEvents.map((event) => [event.id, event as Event])));
    setPowerEventsDeduplicated(deduplicated.sort((a, b) => b.created_at - a.created_at));
  }, [_powerEvents]);

  return {
    events: powerEventsDeduplicated as Event[],
    powerActions: (powerEventsDeduplicated as Event[]).map((event) => {
      const { amount, walias, comment } = JSON.parse(event.content) as Power;

      return {
        id: event.id,
        amount,
        walias,
        createdAt: event.created_at,
        comment: comment,
      };
    }),
  };
};
