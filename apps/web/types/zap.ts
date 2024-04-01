import type { Event, EventTemplate } from 'nostr-tools';

export interface Zap {
  author: string; // Walias
  amount: number; // Millisats
  comment?: string; // From zap
  createdAt: number; // Timestamp
}

export interface ZapReceiptWithCommitment {
  zapReceipt: Event;
  zapRequest: Event;
  commitment: EventTemplate;
  millisatoshis: number;
}
