import { parseContent, useSubscription } from '@lawallet/react';
import type { Event } from 'nostr-tools';
import { createContext, useEffect, useMemo, useState } from 'react';
import { useMassacre } from '../hooks/useMassacre';
import { useTicket } from '../hooks/useTicket';
import type { NDKKind } from '../types/ndk';
import { PUBLISHER_PUBKEY } from './MassacreContext';

export interface PlayerContextType {
  walias: string; // temporal
  player: PlayerInfo;
  totalZaps: number;
  amountZapped: number;
  isAlive: boolean;
  hasTicket: boolean;
  ticketEvent?: Event;
}

type Round = {
  number: number;
  maxZap: number;
  zapped: number;
  zapCount: number;
};

type PlayerInfo = {
  walias: string;
  power: number;
  deathRound: number | null;
  rounds: Round[];
};

const defaultPlayerInfo: PlayerInfo = {
  walias: '',
  power: 0,
  deathRound: null,
  rounds: [],
};

export const PlayerContext = createContext({} as PlayerContextType);

export function PlayerProvider({ walias, children }: React.PropsWithChildren & { walias: string }) {
  // TODO: Needs to listen for updatable profile event
  const { setupId } = useMassacre();
  const { hasTicket, ticketEvent } = useTicket(walias);
  const [playerInfo, setPlayerInfo] = useState<PlayerInfo>(defaultPlayerInfo);

  const { events: profileEvents, subscription: profileSubscription } = useSubscription({
    filters: [
      {
        kinds: [31111 as NDKKind],
        authors: [PUBLISHER_PUBKEY],
        '#d': [`profile:${setupId}:${walias}`],
      },
    ],
    enabled: !!setupId && !!walias,
    options: {
      closeOnEose: false,
    },
  });

  useEffect(() => {
    if (profileEvents.length > 0) {
      const lastEvent = profileEvents.sort((a, b) => b.created_at! - a.created_at!)[0] as Event;
      const parsedPlayerInfo = parseContent(lastEvent.content) as PlayerInfo;
      setPlayerInfo(parsedPlayerInfo);
    }

    return () => {
      if (profileSubscription) {
        profileSubscription.stop();
      }
    };
  }, [profileSubscription]);

  const value: PlayerContextType = useMemo(() => {
    const { zapped: amountZapped, zapCount: totalZaps } = playerInfo.rounds.reduce(
      (a, b) => {
        return { zapped: a.zapped + b.zapped, zapCount: a.zapCount + b.zapCount };
      },
      { zapped: 0, zapCount: 0 },
    );

    return {
      walias,
      player: playerInfo,
      totalZaps,
      amountZapped,
      isAlive: !playerInfo ? true : Boolean(playerInfo.deathRound === null),
      hasTicket,
      ticketEvent,
    };
  }, [playerInfo, hasTicket, ticketEvent]);

  return <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>;
}
