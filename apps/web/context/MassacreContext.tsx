import { useSubscription } from '@lawallet/react';
import type { Event } from 'nostr-tools';
import { createContext, useEffect, useState } from 'react';
import type { MassacreStatusEventContent } from '../types/massacre';
import type { NDKKind } from '../types/ndk';

const PUBLISHER_PUBKEY = process.env.NEXT_PUBLIC_PUBLISHER_PUBKEY!;
export interface MassacreContextType extends MassacreStatusEventContent {
  playerCount: number;
  setupId: string;
  publisherPubkey: string;
}

export interface MassacreSetup {
  initialPool: string;
  finalBlock: number;
  ticketPrice: number;
  minBet: number;
  setup?: MassacreSetup;
}

export const MassacreContext = createContext({} as MassacreContextType);

export function MassacreProvider({ setupId, children }: { setupId: string } & React.PropsWithChildren) {
  const [setup, setSetup] = useState<MassacreSetup>();
  const [status, setStatus] = useState<MassacreStatusEventContent>({
    currentBlock: 0,
    currentPool: 2200000000,
    top100Players: {},
    playerCount: 0,
    nextFreeze: 0,
    nextMassacre: 0,
    status: 'SETUP',
    roundLength: 0,
    freezeDuration: 0,
  });
  const { events: setupEvents, subscription: setupSubscription } = useSubscription({
    filters: [
      {
        ids: [setupId],
        kinds: [1112 as NDKKind],
        authors: [PUBLISHER_PUBKEY],
      },
    ],
    enabled: !!setupId,
    options: {
      closeOnEose: true,
    },
  });

  const { events: stateEvents, subscription: stateSubscription } = useSubscription({
    filters: [
      {
        kinds: [31111 as NDKKind],
        authors: [PUBLISHER_PUBKEY],
        '#d': [`state:${setupId}`],
      },
    ],
    enabled: !!setupId,
    options: {
      closeOnEose: false,
    },
  });

  // Setup Events (Should be one)
  useEffect(() => {
    if (setupEvents.length === 0) {
      return;
    }

    const setupEvent = setupEvents.sort((a, b) => b.created_at! - a.created_at!)[0] as Event;
    setSetup(JSON.parse(setupEvent.content));
  }, [setupEvents]);

  // Status Events (Updatable - Pick the last one)
  useEffect(() => {
    if (stateEvents.length === 0) {
      return;
    }

    const stateEvent = stateEvents.sort((a, b) => b.created_at! - a.created_at!)[0] as Event;
    const status = JSON.parse(stateEvent.content) as MassacreStatusEventContent;
    console.info('!!!!!!! status !!!!!!!');
    console.dir(stateEvent);
    console.dir(status);
    setStatus(status);
  }, [stateEvents]);

  // Unsubscribe setup subscription on unmount
  useEffect(() => {
    return () => {
      if (setupSubscription) {
        setupSubscription.stop();
      }
    };
  }, [setupSubscription]);

  // Unsubscribe state subscription on unmount
  useEffect(() => {
    return () => {
      if (stateSubscription) {
        stateSubscription.stop();
      }
    };
  }, [stateSubscription]);

  const value = {
    setupId,
    setup,
    publisherPubkey: PUBLISHER_PUBKEY,
    ...status,
  };

  return <MassacreContext.Provider value={value}>{children}</MassacreContext.Provider>;
}
