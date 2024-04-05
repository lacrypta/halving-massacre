import type { Event, EventTemplate } from 'nostr-tools';

export interface ZapReceiptWithCommitment {
  zapReceipt: Event;
  zapRequest: Event;
  commitment: EventTemplate;
  millisatoshis: number;
}
