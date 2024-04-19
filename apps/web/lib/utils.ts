import { validateEvent, type Event, type Relay, relayInit } from 'nostr-tools';
import type { ZapReceiptWithCommitment } from '../types/zap';

import { decode as decodeBolt11 } from 'bolt11';
import type { MassacreRound } from '../types/massacre';
import type { Round } from '../types/round';
import type { PlayersPower } from '../types/power';

export function calculateFinalPercentages(percentagePlayer1: number, percentagePlayer2: number) {
  let sumPercentages = percentagePlayer1 + percentagePlayer2;
  let tmpP1 = (percentagePlayer1 / sumPercentages) * 100;
  let tmpP2 = (percentagePlayer2 / sumPercentages) * 100;

  return {
    player1: tmpP1.toFixed(2),
    player2: tmpP2.toFixed(2),
  };
}

export function removeObjectKeys(
  obj1: { [key: string]: number },
  obj2: { [key: string]: number },
): { [key: string]: number } {
  // Create a copy of obj1 to avoid modifying the original object
  const result = { ...obj1 };

  // Iterate over the keys of obj2
  Object.keys(obj2).forEach((key) => {
    // If the key exists in result (copy of obj1), delete it

    if (Object.hasOwn(result, key)) {
      delete result[key];
    }
  });

  // Return the modified copy of obj1
  return result;
}

export function normalizeWalias(walias: string): string {
  return walias.toLowerCase().trim();
}

export const validateEmail = (email: string): RegExpMatchArray | null => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  );
};

export const parseZapReceiptWithCommitment = (zapReceipt: Event): ZapReceiptWithCommitment => {
  if (!validateEvent(zapReceipt)) {
    throw new Error('Malformed zapReceipt');
  }

  const zapRequest: Event | false = JSON.parse(zapReceipt.tags.find((tag) => tag[0] === 'description')?.[1] || 'false');
  if (!zapRequest) {
    throw new Error('Zap Request not found on Zap Receipt. This is probably a relay error!');
  }

  if (!validateEvent(zapRequest)) {
    throw new Error('Malformed zapRequest');
  }

  const bolt11 = zapReceipt.tags.find((tag) => tag[0] === 'bolt11')?.[1] as string;

  if (!bolt11) {
    throw new Error('Malformed Zap Receipt. No bolt11 detected');
  }

  const millisatoshis = parseInt(decodeBolt11(bolt11).millisatoshis!);

  const commitment: Event | false = JSON.parse(zapRequest.tags.find((tag) => tag[0] === 'commitment')?.[1] as string);

  if (!commitment) {
    throw new Error('Commitment not found on Zap Request');
  }

  return {
    zapReceipt,
    zapRequest,
    commitment,
    millisatoshis,
  };
};

export async function publishEvent(event: Event, relayList: string[]) {
  const relays: Relay[] = relayList.map((url) => relayInit(url));

  await Promise.all(
    relays.map(async (relay) => {
      await relay.connect();
      relay.publish(event);
    }),
  );
}

export const formatAmount = (_amount: number): String => {
  const amount = _amount / 1000;
  return amount > 1000000
    ? (amount / 1000000).toFixed(1) + 'M'
    : amount > 9999
      ? (amount / 1000).toFixed(1) + 'K'
      : amount.toFixed(0);
};

/**
 * Gets current round or returns null if no round is found
 * @param rounds Should be sorted by height asc
 * @param currentBlock
 * @returns
 */
export function getCurrentRound(rounds: MassacreRound[], currentBlock: number): MassacreRound | null {
  // Find current round
  for (let index = 0; index < rounds.length; index++) {
    if (currentBlock < rounds[index]!.height) {
      return { ...rounds[index]!, index };
    }
  }

  return null;
}

export function generateRoundsList(rounds: MassacreRound[], currentBlock: number): Round[] {
  const currentRound = getCurrentRound(rounds, currentBlock);

  return rounds.map((round, k) => {
    const finished = currentBlock >= round.height;
    return {
      round: k,
      block: round.height,
      status: k === currentRound?.index ? 'ACTUAL' : finished ? 'FINISHED' : 'PENDING',
    };
  });
}

export function getTopPlayers(players: PlayersPower, count: number = 100): PlayersPower {
  // Sort players
  const sortedPlayers = Object.fromEntries(Object.entries(players).sort((a, b) => b[1] - a[1]));

  // Convert the object into an array of its entries
  const entries = Object.entries(sortedPlayers);

  // Slice the first 100 entries
  const firstEntries = entries.slice(0, count);

  // Convert the array back into an object
  const firstPlayers: PlayersPower = {};
  for (const [key, value] of firstEntries) {
    firstPlayers[key] = value;
  }

  return firstPlayers;
}

/**
 * Estimate the chances of survival given a bucketization and a power input.
 *
 * @param buckets - A list of the buckets.
 * @param power - The power input to estimate for.
 * @returns The estimated probability (mostly in line with simulations).
 */
export function estimateSurvivalChance(buckets: { min: number; max: number }[], power: number): number {
  if (buckets[0]!.max < power) {
    return 1;
  } else if (power <= buckets[buckets.length - 1]!.min) {
    return 0;
  }
  const { max, min, idx }: { max: number; min: number; idx: number } = buckets
    .map(({ max, min }: { max: number; min: number }, idx: number): { max: number; min: number; idx: number } | null =>
      min < power && power <= max ? { max, min, idx } : null,
    )
    .filter(
      (x: { max: number; min: number; idx: number } | null): x is { max: number; min: number; idx: number } =>
        null !== x,
    )[0]!;

  return (buckets.length - idx + (power - min) / (max - min) - 1) / buckets.length;
}

export function smoothLimits(value: number): number {
  if (value < 2) {
    return 2;
  }
  if (value > 50) {
    return value - Math.min(100 - 50) * 0.05;
  }
  return value;
}
