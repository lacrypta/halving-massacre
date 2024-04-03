'use server';

import { NextResponse } from 'next/server';
import { finishEvent, getPublicKey, type Event } from 'nostr-tools';

import { parseZapReceiptWithCommitment, publishEvent } from '../../../../lib/utils';

import relayList from '../../../../config/relays.json';

// Load environment variables
const NOSTR_PRIVATE_KEY = process.env.NOSTR_PRIVATE_KEY!;
const NOSTR_PUBLIC_KEY = getPublicKey(NOSTR_PRIVATE_KEY);
const TICKET_PRICE = parseInt(process.env.NEXT_PUBLIC_TICKET_PRICE!);
const URLX_PUBKEY = process.env.NEXT_PUBLIC_URLX_PUBKEY!;

// Response interfaces
export interface SuccessResponse {
  success: true;
  ticketEvent: Event;
}

export interface ErrorResponse {
  success: false;
  error: string;
}

export async function POST(request: Request): Promise<NextResponse<SuccessResponse | ErrorResponse>> {
  try {
    // Get walias from request body
    const rawZapReceipt = await request.json();

    // Parse zapReceipt that includes commitment
    const zap = parseZapReceiptWithCommitment(rawZapReceipt);

    // zapReceipt must be signed by URLx  Module
    if (zap.zapReceipt.pubkey !== URLX_PUBKEY) {
      return NextResponse.json({ success: false, error: 'zapReceipt should be emitted by URLx' }, { status: 400 });
    }

    // embedded zapRequest must be signed by this module
    if (zap.zapRequest.pubkey !== NOSTR_PUBLIC_KEY) {
      return NextResponse.json(
        { success: false, error: 'zapRequest should be emitted by NOSTR_PUBLIC_KEY' },
        { status: 400 },
      );
    }

    // Invoice amount must be equal to TICKET_PRICE
    if (zap.millisatoshis !== TICKET_PRICE * 1000) {
      return NextResponse.json({ success: false, error: 'Invalid Amount' }, { status: 400 });
    }

    // Sign the ticket event
    const ticketEvent = finishEvent(zap.commitment, NOSTR_PRIVATE_KEY);

    // Publish
    console.info('Publishing ticket event...');
    console.dir('ticketEvent:');
    console.dir(ticketEvent);
    await publishEvent(ticketEvent, relayList);

    // Return success response
    return NextResponse.json({ success: true, ticketEvent: ticketEvent });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
