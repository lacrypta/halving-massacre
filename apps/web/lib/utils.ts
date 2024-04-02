import { validateEvent, type Event } from 'nostr-tools';
import type { ZapReceiptWithCommitment } from '../types/zap';

import { decode as decodeBolt11 } from 'bolt11';

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

export function calculateMedian(valuesObj: { [key: string]: number }): number {
  // Extract values from the object
  const values = Object.values(valuesObj);

  // Sort the values in ascending order
  values.sort((a, b) => a - b);

  const middleIndex = Math.floor(values.length / 2);

  // Check if the total number of values is odd or even
  if (values.length % 2 === 0) {
    // If even, the median is the average of the two middle numbers
    return (values[middleIndex - 1] + values[middleIndex]) / 2;
  } else {
    // If odd, the median is the middle number
    return values[middleIndex];
  }
}
